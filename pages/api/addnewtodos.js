import { MongoClient } from "mongodb";

export default async function handler(req,res){

  if(req.method === 'POST'){
    const data = req.body;
    const connectingToDb = await MongoClient.connect('mongodb://localhost:27017/');
    const dbConnect = connectingToDb.db('nextjstest');
    const getcollection = dbConnect.collection('todotracker');

    const insertingData = await getcollection.insertOne(data);
    console.log(insertingData);
    connectingToDb.close();
    res.status(201).json({message:'todo insertion successful'})
  }

}