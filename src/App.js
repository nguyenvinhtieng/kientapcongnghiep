
import { useState } from 'react';
import Swal from 'sweetalert2'
import './App.css';

function App() {
  const [input, setInput] = useState(''); // input 
  const [todos, setTodos] = useState([])  // todo list
  const [status, setStatus] = useState('Add') // Add || Update
  const [itemSelected, setItemSelected] = useState(null) // support for delete and edit
  
  const submitAction = () => {
    if(!input) return;
    switch (status) {
      case 'Add':
        addTodo();
        break;
      case 'Update':
        updateTodo();
        break;
      default:
        break;
    }
  }
  const addTodo = () => {
    if(!input) return;
    const newTodo = {
      id: Math.random(),
      title: input,
      isCompleted: false
    }
    setTodos([...todos, newTodo])
    setInput('')
  }
  const updateTodo = () => {
    if(!input) return;
    const newTodos = todos.map((todo, index) => {
      if(index === itemSelected){
        return {
          ...todo,
          title: input
        }
      }
      return todo
    }
    )
    setTodos(newTodos)
    setInput('')
    setStatus('Add')
  }
  const deleteTodo = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodos = todos.filter((todo, idx) => idx !== index)
        setTodos(newTodos)
      }
    })
  }

  const editTodo = (index) => {
    const todo = todos[index]
    setInput(todo.title)
    setStatus('Update')
    setItemSelected(index)
  }

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, idx) => {
      if(idx === index){
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  return (
    <div className='container'>
      <div className='todo-app'>
        <h1 className='heading'>TodoApp</h1>
        <div className="todo-app__input">
          <input 
            autoComplete="off" 
            type="text" 
            placeholder="Enter your todo.." 
            value={input} 
            onChange={(e)=>setInput(e.target.value)} 
          />
          <button className={!input && `disabled`} onClick={submitAction}>{status}</button>
        </div>
        <ul className='todo-app__list'>
          {todos.length > 0 && todos.map((todo, index) => (
            <li className={todo.isCompleted ? `todo-app__item complete` : 'todo-app__item'} key={todo.id}>
              <input type="checkbox" checked={todo.isCompleted} onChange={()=> toggleTodo(index)}/>
              <span>{todo.title}</span>
              <button 
                className='delete' 
                onClick={()=>deleteTodo(index)}>
                  <ion-icon name="trash-bin-outline"></ion-icon>
              </button>
              <button 
                className='edit' 
                onClick={()=>editTodo(index)}>
                <ion-icon name="create-outline"></ion-icon>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
