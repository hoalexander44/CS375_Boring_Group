const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require("bcrypt");
const { Pool, Client } = require('pg');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


const saltRounds = 10;
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


app.post('/add', function (req, res) {
    let query =
        `INSERT INTO "shop"."item"
("title", "description", "cost", "user_id")
VALUES
($1,$2,$3,$4) RETURNING "id"`;
    let queryParams = [req.body.title, req.body.description, req.body.cost, req.body.userId];
    handleAddMutateRequest('/add', req.body, res, query, queryParams, 201)
});


// when item is added, the item id is returned as well
// returned item id is used for image uploading
function handleAddMutateRequest(endpoint, reqBody, res, query, queryParams, successStatusCode) {
    console.log(`Handling ${endpoint} request with payload ${JSON.stringify(reqBody)}`);
    pool.query(query, queryParams, (err, db_res) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: "Failed to update database." });
        } else {
            if (db_res.rowCount === 0) {
                res.status(400).send({ error: "No rows were updated" })
            } else {
                console.log("SUCCESS MUTATE");
                console.log("DATABASE RETURNED: " + db_res.rows[0].id);
                res.json({ insert_id: db_res.rows[0].id });
            }
        }
    })
}


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

    console.log(`Handling /deleteFavorite request with query ${JSON.stringify(req.body)}`);
    let delFaveQuery = `DELETE FROM "shop"."userFavorites" WHERE "userFavorites"."item_id" = $1`;
    let delFaveQueryParams = [req.body.itemId];


    pool.query(delFaveQuery, delFaveQueryParams, (err, db_res) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: "Failed to update database." });
            return;
        } else {
            console.log("SUCCESS MUTATE");
            let queryParams = [req.body.itemId];


            handleDbMutateRequest('/delete', req.body, res, query, queryParams, 204);
        }
    })


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
    
});


app.post('/addFavorite', function(req,res){
    console.log(`Handling /addFavorite request with query ${JSON.stringify(req.body)}`);
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


//register
//register
app.post("/user", function (req, res) {

    console.log("reached1");
    let input = true;
    let username = req.body.username;
    let plaintextPassword = req.body.password;
    let email = req.body.email;

    console.log(plaintextPassword);
    if (username !== undefined & plaintextPassword !== undefined & email !== undefined) {
        console.log("reached2");
        if (((typeof username) == "string") &
            ((typeof plaintextPassword) == "string") &
            username.length >= 1 &
            username.length <= 20 &
            email.length >= 1 &
            email.length <= 20 &
            plaintextPassword.length >= 5 &
            plaintextPassword.length <= 36

        ) {
            console.log("reached2");
            pool.query(
                `SELECT username FROM "shop"."user"`
            ).then(function (response) {
                console.log(response.rows);
                for (let i = 0; i < response.rows.length; i++) {
                    console.log(response.rows[i]["username"]);
                    if (response.rows[i]["username"] == username) {
                        console.log("account already exists");
                        input = false;
                        //console.log("CAN INPUT inside??: " + input);
                        console.log("reached3");
                        res.status(401).send();
                        return;
                    }
                }
                //console.log("CAN INPUT outside??: " + input);
                if (input) {
                    console.log("reached4");
                    bcrypt
                        .hash(plaintextPassword, saltRounds)
                        .then(function (hashedPassword) {
                            pool.query(
                                'INSERT INTO "shop"."user" (username, password, email) VALUES ($1, $2, $3)',
                                [username, hashedPassword, email]
                            )
                                .then(function (response) {
                                    // account successfully created
                                    res.status(200).send();
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.status(500).send(); // server error
                                });
                        })
                        .catch(function (error) {
                            console.log(error);
                            res.status(500).send(); // server error
                        });
                }
            });

        }
        else {
            console.log("go away");
            res.status(401).send();
        }
    }
    else {
        console.log("go away");
        res.status(401).send();
    }

});


app.post("/auth", function (req, res) {
    let username = req.body.username;
    let plaintextPassword = req.body.password;
    pool.query(`SELECT password, id FROM "shop"."user" WHERE username = $1`, [
        username,
    ])
        .then(function (response) {
            if (response.rows.length === 0) {
                // username doesn't exist
                return res.status(401).send();
            }
            let hashedPassword = response.rows[0].password;
            bcrypt
                .compare(plaintextPassword, hashedPassword)
                .then(function (isSame) {
                    if (isSame) {
                        // password matched
                        console.log("YAY!");
                        console.log(response.rows[0].id);
                        res.status(200);
                        res.json({ userId: response.rows[0].id})
                    } else {
                        // password didn't match
                        res.status(401).send();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send(); // server error
                });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send(); // server error
        });
});


app.post("/uploadImage", upload.single('productImage'),(req, res, next) => {
    console.log(req.file);
    res.status(200).send();
})


app.get("/getImage", function (req, res) {
    console.log(req.query.itemId);
    if (req.query.itemId !== undefined) {
        let path = './uploads/' + req.query.itemId;

        // validation to see if image exists
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(err);
                console.log("file does not exist");
                res.status(400).send();
                return;
            }

            // returns byte data of image for client render
            fs.readFile(path, function (err, data) {
                let byteData = Buffer.from(data).toString('base64');
                let sendData = { imageBytes: byteData };
                res.json(sendData);
            })
        })
    }
    else {
        res.status(400).send();
    }
})


app.listen(PORT, HOSTNAME, () => {
    console.log(`Listening at: http://${HOSTNAME}:${PORT}`);
});
