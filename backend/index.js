import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
await client.connect();
console.log("Database Connected");
const db = client.db('luminate');

app.get('/marketing-cards', async (req, res) => {
    const collection = db.collection('marketing');
    const gettech = await collection.find({}).toArray(); 
    res.status(200).json(gettech);
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})