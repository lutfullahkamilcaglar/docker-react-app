import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Todo from './Todo';
import { db } from './firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const style = {
  background: `h-screen w-screen p-4 bg-black`,
  container: `bg-slate-100 max-w-[400px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-4 w-full text-xl`,
  button: `border p-3 ml-1 bg-gray-600 text-slate-100`,
  count: `text-center p-1`,
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a value!!');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };


  return (
    <div className={style.background}>
    <div className={style.container}> 
      <h3 className={style.heading}>Todo App</h3>
      <form onSubmit={createTodo} className={style.form}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={style.input}
          type='text'
          placeholder='Add Todo'
        />
        <button className={style.button}>
          <IoIosAddCircleOutline size={30} />
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      {todos.length < 1 ? null : (
        <p className={style.count}>{`${todos.length} to do in the list`}</p>
      )}
    </div>
  </div>
);
}

export default App;
