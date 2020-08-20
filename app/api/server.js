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

// TODO remove this
function setUp() {
    pool.query(`INSERT INTO "shop"."user" ("username", "password", "email", "favorite_item_ids") VALUES
    ('user1', 'pass1', 'email1', '[]');`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${res.rowCount} rows updated.`);
        }
    });
}
setUp();

app.get('/', function(req, res) {
    res.send('hello!');
});

app.post('/add', function(req, res) {
    console.log(`Handling /add request with payload ${JSON.stringify(req.body)}`);
    let query =
`INSERT INTO "shop"."item"
("name", "description", "price", "seller_id")
VALUES
($1,$2,$3,$4)`;
    pool.query(query, [req.body.title, req.body.description, req.body.cost, req.body.sellerId], (err, db_res) => {
        if (err) {
            console.log(err.stack);
            res.status(500).send({error: err});
        } else {
            res.status(201).send();
        }
    })
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Listening at: http://${HOSTNAME}:${PORT}`);
});
