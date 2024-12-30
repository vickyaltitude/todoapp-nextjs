import React from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const CompletedTodosPage = ({ completedTodos, handleDeleteCompletedTodo }) => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Completed Todos</h1>

          
          <ListGroup>
            {completedTodos.length === 0 ? (
              <p>No completed todos yet!</p>
            ) : (
              completedTodos.map((todo) => (
                <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                  <span>{todo.text}</span>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteCompletedTodo(todo.id)}
                  >
                    <FaTrash />
                  </Button>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CompletedTodosPage;
