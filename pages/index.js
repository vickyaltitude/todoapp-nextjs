import TodoPage from "@/Components/Todos/Todo";


function HomePage(props){

   async function handleNewToDo(newToDo){

    const newTodos = {
        todo: newToDo,
        completed: false
    }
          
         const insertingNewTodo = await fetch('/api/addnewtodos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodos)
         })
         const response = await insertingNewTodo.json();
         console.log(response)
    }

    return (
         <TodoPage onAddToDo={handleNewToDo}  todoLists={props.todos}/>
    )

}


 export async function getServerSideProps(){

    const getData = await fetch('http://localhost:3000/api/gettodos');
    const parsedData = await getData.json();
    console.log(parsedData)

     return {
        props: {
            todos: parsedData.data
        }
     }
} 


export default HomePage