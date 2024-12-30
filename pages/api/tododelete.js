import { MongoClient,ObjectId } from "mongodb";

async function handler(req,res){

 if(req.method === 'DELETE'){
    const dataTodos = req.body;
    const connectionDB =  await   MongoClient.connect('mongodb://localhost:27017/');
    const db = connectionDB.db('nextjstest');
    const meetupCollections = db.collection('todotracker');
    const result = await meetupCollections.findOneAndDelete({_id: new ObjectId(dataTodos.id)});
    console.log(result);
    connectionDB.close();
    res.status(200).json({message: 'todos deletion success!'})

   }
}

export default handler;