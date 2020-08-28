const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool, Client } = require('pg');

const PORT = 3001;
const HOSTNAME = 'localhost';

let app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool();

async function setUp() {
    // creates a user so we can test creating posts
    await pool.query(`INSERT INTO shop.user (username, password, email, favorite_item_ids) VALUES ('user1', 'pass1', 'email1', '[]') RETURNING *;`,
        (err, res) => {
        if (err) {
            console.log(`Error inserting user: ${err}`);
        } else {
            console.log(`Inserted user: ${JSON.stringify(res.rows[0])}`)
        }
    });

    await pool.query(`INSERT INTO shop.item (title, description, cost, user_id) VALUES ('title1', 'desc1', 1.00, 1) RETURNING *;`,
        (err, res) => {
        if (err) {
            console.log(`Error inserting item: ${err}`);
        } else {
            console.log(`Inserted item: ${JSON.stringify(res.rows[0])}`);
        }
    })
}
setUp().then(() => console.log("awaiting db startup inserts"));


app.get('/', function(req, res) {
    res.send('hello!');
});

function handleDbMutateRequest(endpoint, reqBody, res, query, queryParams, successStatusCode) {
    console.log(`Handling ${endpoint} request with payload ${JSON.stringify(reqBody)}`);
    pool.query(query, queryParams, (err, db_res) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: "Failed to update database."});
        } else {
            if (db_res.rowCount === 0) {
                res.status(400).send({error:"No rows were updated"})
            } else {
                res.sendStatus(successStatusCode);
            }
        }
    })
}

app.post('/add', function(req, res) {
    let query =
`INSERT INTO "shop"."item"
("title", "description", "cost", "user_id")
VALUES
($1,$2,$3,$4)`;
    let queryParams = [req.body.title, req.body.description, req.body.cost, req.body.userId];
    handleDbMutateRequest('/add', req.body, res, query, queryParams, 201)
});

//Updates the title, description, and cost of a post
app.post('/edit', function(req, res) {
    let query =
`UPDATE "shop"."item"
SET "title"=$1,
    "description"=$2,
    "cost"=$3
WHERE "id"=$4`;
    let queryParams = [req][req.body.title, req.body.description, req.body.cost, req.body.itemId];
    handleDbMutateRequest('/edit', req.body, res, query, queryParams, 204);
});

//Deletes post from the database
app.post('/delete', function(req, res) {
    let query =
`DELETE FROM "shop"."item"
WHERE "id"=$1`;
    let queryParams = [req.body.itemId];
    handleDbMutateRequest('/delete', req.body, res, query, queryParams, 204);
});

//Get posts created by the user
app.get('/getPosts', function(req, res) {
    console.log(`Handling /getPosts request with query ${JSON.stringify(req.query)}`);
    let query =
`SELECT i.id, i.title, i.description, i.cost, u.email
FROM "shop"."item" i
    JOIN "shop"."user" u
        ON i.user_id=u.id
WHERE u.id=$1`;

    pool.query(query, [req.query.userId], (err, db_res) => {
        if (err) {
            console.log(err.stack);
            res.status(500).send({error: "Failed to get from database."});
        } else {
            res.json(db_res.rows);
        }
    });
});

//Searches for a post in the database
app.get('/search', function(req, res){
    console.log(`Handling /search request with query ${JSON.stringify(req.query)}`);
    let query = `SELECT * FROM "shop"."item" WHERE description like '%keyword%'`;
    
    let queryParams = [req.body.keyword]
    
});

app.get('/getFavorite', function(req, res){
    console.log(`Handling /getFavorite request with query ${JSON.stringify(req.query)}`);
    let query = 'SELECT * FROM "shop"."userFavorites" WHERE "user"."id" = "userFavorites"."user_id"';
});

app.get('/addFavorite', function(req,res){
    console.log(`Handling /addFavorite request with query ${JSON.stringify(req.query)}`);
    let query = `INSERT INTO "shop"."userFavorites" ("user_id", "item_id") VALUES ($1, $2);`;
    let queryParams = [req.body.userId, req.body.itemId];
    
    handleDbMutateRequest('/addFavorite', req.body, res, query, queryParams, 204);
    
});

app.get('/deleteFavorite', function(req, res){
    console.log(`Handling /deleteFavorite request with query ${JSON.stringify(req.query)}`);
    let query = 'DELETE FROM "shop"."userFavorites" WHERE "user"."id" = "userFavorites"."user_id" AND "item"."id" = "userFavorites"."item_id"';
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`Listening at: http://${HOSTNAME}:${PORT}`);
});
