import express from "express";
import connectMongoAtlas from "./src/config/dbConnect.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port,() => {
    console.log('Servidor On' + port);
})

connectMongoAtlas();

app.use('/user', userRoutes )


app.get('/', (req, res) => {
    res.send('Api ok!');
})