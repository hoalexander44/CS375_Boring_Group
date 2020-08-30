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
                console.log("SUCCESS MUTATE");
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
    let queryParams = [req.body.title, req.body.description, req.body.cost, req.body.itemId];
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
            console.log(db_res.rows);
            res.json(db_res.rows);
        }
    });
});

//Searches for a post in the database
app.get('/search', function(req, res){
    console.log(`Handling /search request with query ${JSON.stringify(req.query)}`);
    let query = `SELECT * FROM "shop"."item" WHERE title like $1`;

    let keyword = '%' + req.query.keyword + '%';
    pool.query(query, [keyword], (err, db_res) => {
        if (err){
            console.log(err.stack);
            res.status(500).send({error: "Failed to get from database."});
        }
        else {

            console.log(db_res.rows);
            res.json(db_res.rows);


        }
    })
    
    //handleDbMutateRequest('/search', req.body, res, query, queryParams, 204);
});


//sees if post is favorited by the user
// takes userId
// takes itemId
app.get('/isFavorite', function (req, res) {
    let query = 'SELECT * FROM "shop"."userFavorites" WHERE user_id=$1 AND item_id=$2';
    let queryParams = [req.query.userId, req.query.itemId];

    pool.query(query, queryParams, (err, db_res) => {
        if (err) {
            console.log(err.stack);
            res.status(500).send({ error: "Failed to get from database." });
        }
        else {
            if (db_res.rows.length > 0) {
                console.log("Item is favorited");
                let data = {isFavorite: true};
                res.json(data);
            }
            else {
                console.log("Item is not favorited");
                let data = { isFavorite: false };
                res.json(data);
            }
            
        }
    });
});



app.get('/getEmail', function (req, res) {
    let query = 'SELECT email FROM "shop"."user" WHERE "id" = $1'
    let queryParams = [req.query.userId];

    pool.query(query, queryParams, (err, db_res) => {
        if (err) {
            console.log(err.stack);
            res.status(500).send({ error: "Failed to get from the database." });
        }
        else {
            console.log(db_res.rows);
            res.json(db_res.rows);
        }
    });

});


app.get('/getFavorite', function(req, res){
    console.log(`Handling /getFavorite request with query ${JSON.stringify(req.query)}`);
    let query = `SELECT * FROM "shop"."userFavorites" WHERE "user_id" = $1`;
    
    let queryParams = [req.query.userId];
    
    pool.query(query, [req.query.userId], (err, db_res) => {
        if(err){
            console.log(err.stack);
            res.status(500).send({error: "Failed to get from the database."});
        }
        else {

            // Getting item information from shop item table
            //res.json(db_res.rows);
            let itemRows = [];
            if (db_res.rows.length !== 0) {
                for (let i = 0; i < db_res.rows.length; i++) {
                    console.log(`Handling /getFavorite request getting item information after gettings favorite ids`);
                    let query = `SELECT * FROM "shop"."item" WHERE "id" = $1`;
                    pool.query(query, [db_res.rows[i].item_id], (err, item_res) => {
                        if (err) {
                            console.log(err.stack);
                            res.status(500).send({ error: "Failed to get from the database." });
                        }
                        else {
                            itemRows.push(item_res.rows);
                            if (i >= (db_res.rows.length - 1)) {
                                let returnData = { "favorite_items": itemRows };
                                res.json(returnData);
                                return
                            }
                        }
                    });


                }
            }
            else {
                let returnData = { "favorite_items": [] };
                res.json(returnData);
            }
        }
    })
    
    //handleDbMutateRequest('/getFavorite', req.body, res, query, queryParams, 204);
});

app.post('/addFavorite', function(req,res){
    console.log(`Handling /addFavorite request with query ${JSON.stringify(req.body)}`);
    //console.log(req.body.userId);
    //console.log(req.body.itemId);
    let query = `INSERT INTO "shop"."userFavorites" ("user_id", "item_id") VALUES ($1, $2);`;
    let queryParams = [req.body.userId, req.body.itemId];
    
    handleDbMutateRequest('/addFavorite', req.body, res, query, queryParams, 204);
    
});

app.post('/deleteFavorite', function(req, res){
    console.log(`Handling /deleteFavorite request with query ${JSON.stringify(req.body)}`);
    let query = `DELETE FROM "shop"."userFavorites" WHERE "userFavorites"."user_id" = $1 AND "userFavorites"."item_id" = $2`;
    let queryParams = [req.body.userId, req.body.itemId];
    
    handleDbMutateRequest('/deleteFavorite', req.body, res, query, queryParams, 204);
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`Listening at: http://${HOSTNAME}:${PORT}`);
});
