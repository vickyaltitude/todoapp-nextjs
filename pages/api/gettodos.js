import { MongoClient } from "mongodb";

async function handler(req,res){

 if(req.method === 'GET'){
       
    const connectionDB =  await   MongoClient.connect('mongodb://localhost:27017/');
    const db = connectionDB.db('nextjstest');
    const meetupCollections = db.collection('todotracker');
    const result = await meetupCollections.find().toArray();
    console.log(result);
    connectionDB.close();
    res.status(200).json({message: 'Meetup Data Fetched!',data: result})

   }
}

export default handler;