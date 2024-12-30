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

  async  function onSaveEditedTodo(id,editingText){
      
    const insertingNewTodo = await fetch('/api/edittodo',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id,todoupdated:editingText})
     })
     const response = await insertingNewTodo.json();
     console.log(response)


  }

  async function onMarkAsCompleted(id,status){
          
    const insertingNewTodo = await fetch('/api/markascompleted',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id,todoupdated:status})
     })
     const response = await insertingNewTodo.json();
     console.log(response)
      
  }

  async function onDeleteTodo(id){
     
    const insertingNewTodo = await fetch('/api/tododelete',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
     })
     const response = await insertingNewTodo.json();
     console.log(response)
  }

    return (
         <TodoPage onAddToDo={handleNewToDo}  todoLists={props.todos} onSaveEditedTodo={onSaveEditedTodo} onMarkAsCompleted={onMarkAsCompleted} onDeleteTodo={onDeleteTodo}/>
    )

}


/*  export async function getServerSideProps(){

    const getData = await fetch('http://localhost:3000/api/gettodos');
    const parsedData = await getData.json();
    console.log(parsedData)

     return {
        props: {
            todos: parsedData.data
        }
     }
} */ 

export async function getStaticProps(){
    

    const getData = await fetch('http://localhost:3000/api/gettodos');
    const parsedData = await getData.json();
    console.log(parsedData)
    const handleData = parsedData.data.map(item => ({...item,_id: item._id.toString()}));

    return {
       props: {
        todos: handleData,
        revalidate:1
       }
    }
}


export default HomePage