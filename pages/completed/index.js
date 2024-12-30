import { MongoClient } from "mongodb";
import CompletedTodosPage from "@/Components/Todos/TodayCompleted";



function CompletedPage(props){
  return (
     <CompletedTodosPage completedTodos={props.todos} />
  )
}

export async function getStaticProps(){
    
    const connectionDB =  await   MongoClient.connect('mongodb://localhost:27017/');
    const db = connectionDB.db('nextjstest');
    const meetupCollections = db.collection('todotracker');
    const result = await meetupCollections.find({completed: true}).toArray();
    const handleData = result.map(item => ({...item,_id: item._id.toString()}));
    return {
       props: {
        todos: handleData
       }
    }
}


export default CompletedPage