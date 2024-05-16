import express from "express";
import connectMongoAtlas from "./src/config/dbConnect.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port,() => {
    console.log('Servidor On');
})

connectMongoAtlas();

app.get('/', (req, res) => {
    res.send('Api ok!');
})