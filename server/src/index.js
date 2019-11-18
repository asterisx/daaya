import express from 'express';
import {Posts} from './db';
const app = express();
const port = 3000;

app.get("/posts", (req, res) => res.json(Posts));

app.put("/post", (req, res) => {
    const newCompany = Object.assign({id: Posts.length}, req);
    Posts.push(newCompany);
    res.json(newCompany);
});

app.listen(port);
