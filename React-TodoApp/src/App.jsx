import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [completedIds, setCompletedIds] = useState([]);

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

  const toggleComplete = (id) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
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
          <li key={todo.id} className={completedIds.includes(todo.id) ? 'completed' : ''}>
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
                <span style={{textDecoration: completedIds.includes(todo.id) ? 'line-through' : 'none'}}>{todo.text}</span>
                <span className="actions">
                  <button onClick={() => toggleComplete(todo.id)}>{completedIds.includes(todo.id) ? 'Undo' : 'Completed'}</button>
                  <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)} >x</button>
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