import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, InputGroup, Navbar, Nav } from 'react-bootstrap';
import { FaTrash, FaEdit, FaSave, FaCheck } from 'react-icons/fa';
import Link from 'next/link';

const TodoPage = ({onAddToDo,todoLists}) => {

    const [todos, setTodos] = useState(todoLists);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);

 
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    onAddToDo(newTodo)
    setNewTodo('');
  };

 
  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

 
  const handleSaveEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingText('');
  };


  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };


  const handleMarkAsCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

   
    const newCompletedTodos = todos.filter((todo) => todo.completed);
    setCompletedTodos(newCompletedTodos);
  };

  return (
    <>
    
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand as={Link} href="#">Todo App</Navbar.Brand>
        <Nav className="ml-auto">
          <Link style={{color:'whitesmoke'}} href="/todos" passHref>
                  Todo List
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link style={{color:'whitesmoke'}} href="/completed" passHref>
                Completed Todos
          </Link>
        </Nav>
      </Navbar>

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="text-center mb-4">Todo List</h1>

          
            <Form onSubmit={handleAddTodo} className="todo-form">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter your todo"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Add Todo
              </Button>
            </Form>

          
            <ListGroup className="mt-4">
         
              {todos.map((todo) => (
                <>
                  
                <ListGroup.Item
               style={{
                maxWidth: '900px', 
                wordWrap: 'break-word',  
                overflowWrap: 'break-word',  
                whiteSpace: 'normal',  
              }}
                  key={todo._id}
                  className={`d-flex justify-content-between align-items-center ${
                    todo.completed ? 'bg-light text-muted' : ''
                  }`}
                >
                     <Form.Check
                   type="radio"
                   checked={todo.completed}
                   onChange={() => handleMarkAsCompleted(todo._id)}
                 />
                  <div className="d-flex align-items-center">
                    {editingTodoId === todo._id ? (
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <Button variant="outline-success" onClick={() => handleSaveEdit(todo._id)}>
                          <FaSave />
                        </Button>
                      </InputGroup>
                    ) : (
                      <span>{todo.todo}</span>
                    )}
                  </div>

                  <div className="todo-actions">
                   

                    {editingTodoId !== todo._id && (
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => startEditing(todo._id, todo.todo)}
                      >
                        <FaEdit />
                      </Button>
                    )}

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteTodo(todo._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </ListGroup.Item>
                </>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TodoPage;
