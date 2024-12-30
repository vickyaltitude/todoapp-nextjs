import { MongoClient,ObjectId } from "mongodb";

async function handler(req,res){

 if(req.method === 'PATCH'){
    const dataTodos = req.body;
    const connectionDB =  await   MongoClient.connect('mongodb://localhost:27017/');
    const db = connectionDB.db('nextjstest');
    const meetupCollections = db.collection('todotracker');
    const result = await meetupCollections.findOneAndUpdate({_id: new ObjectId(dataTodos.id)},{$set:{completed : dataTodos.todoupdated}});
    console.log(result);
    connectionDB.close();
    res.status(200).json({message: 'todo completed success!'})

   }
}

export default handler;