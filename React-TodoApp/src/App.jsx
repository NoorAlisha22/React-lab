import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className='wrapper' >
      <h1>React ToDo App</h1>
      <div className='innerdiv'>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e)=>{if (e.key==='Enter') addTodo()}}
          placeholder="Add a task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul >
        {todos.map(todo => (
          <li
            key={todo.id}
          >
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)} >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;