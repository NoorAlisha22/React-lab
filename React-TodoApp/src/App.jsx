import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditText('');
    }
  };

  const startEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText } : todo));
    setEditId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
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
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveEdit(todo.id);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  autoFocus
                />
                <span className="actions">
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </span>
              </>
            ) : (
              <>
                {todo.text}
                <span className="actions">
                  <button onClick={() => deleteTodo(todo.id)} >x</button>
                  <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;