import React, { useEffect, useState, useRef } from 'react';
// import Input from './components/Input'
function wordFinder(word,para){

  let i = 0;
  let j = word.length-1;
  while(j<para.length){

    if(para[i]===word[0] && para[j]===word[word.length-1]){
      // do something
      if(word === para.slice(i,j+1))
        return true;
    }


    i++;
    j++;
  }

  return false;

}



function App() {
  const [todos, setTodos] = useState([]);
  const [filterTodos,setfilterTodos] = useState([]);
  const inputRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    const localData = localStorage.getItem('todos');
    if (!localData) {
      localStorage.setItem('todos', JSON.stringify([]));
      return;
    }
    const parsedTodos = JSON.parse(localData);
    setTodos(parsedTodos);
    setfilterTodos(parsedTodos)
  }, []);

  function deleteTodo(id) {
    const newTodos = todos.filter(item => item.id !== id);
    setfilterTodos(newTodos)
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  function toggleDone(id) {
    const newTodos = todos.map(item => {
      if (item.id !== id) {
        return item;
      } else {
        const newItem = { ...item, status: !item.status };
        return newItem;
      }
    });
    setfilterTodos(newTodos)
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  function addTodo() {
    const newItem = {
      title: inputRef.current.value,
      id: Date.now(),
      status: false
    };
    if(inputRef.current.value==='') return;
    inputRef.current.value = '';
    const updatedTodos = [...todos, newItem];
    setfilterTodos(updatedTodos)
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  function findTodo(){
    if(filterRef.current.value === ''){
      reset();
      return;
    }
    const val = filterRef.current.value;
    const newTodos = filterTodos.filter(item=>(wordFinder(val,item.title))) //item.title === val
    setTodos(newTodos)

  }
  function reset(){
    const localData = localStorage.getItem('todos');
    if (!localData) {
      localStorage.setItem('todos', JSON.stringify([]));
      return;
    }
    const parsedTodos = JSON.parse(localData);
    setfilterTodos(parsedTodos)
    setTodos(parsedTodos);
  }

  function keyPress(){
      if (event.key === 'Enter') {
      addTodo()
    }
  }


  return (
<div className = 'w-1/2'>
  <h1 className="text-4xl font-bold ml-8 mb-2 text-blue-600">
  Todo App
</h1>
      {/*<input type="text" ref={inputRef} placeholder = "add new todo"/>*/}
          <div className="relative w-64">
  <input ref = {inputRef} type="text" className="w-full text-black ml-8 mb-2 mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="enter new todo..." onKeyDown={keyPress}/>
  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
    {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
    </svg>*/}
  </div>
</div>

      {/*<Input ref = {inputRef} placeholder = "add new todo" />*/}
      <button className = "ml-8 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={addTodo}>Add</button> <br/>
      {/*<input type="text" ref = {filterRef} onChange= {()=>{findTodo()}} placeholder = "find todos"/>*/}
                <div className="relative w-64">
  <input ref = {filterRef} onChange= {()=>{findTodo()}} type="text" className=" ml-8 mb-2 text-black mt-2 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="filter todos..."/>
  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
    {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
    </svg>*/}
  </div>
</div>
      {/*<button className = " ml-8 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={()=>{findTodo()}}>Find</button> <br/>*/}
      {/*<button className = "px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-8 mt-2 focus:ring-opacity-50" onClick = {()=>{reset()}}>reset</button>*/}
      {todos.map(item => (
        <ul className = " animate__animated animate__pulse space-y-2 border border-gray-700 p-4 rounded-lg bg-gray-800 mt-2 mb-2" key={item.id}>
          <li className="flex items-center space-x-2 ml-8 "
            onClick={() => {
              toggleDone(item.id);
            }}
            style={{ textDecoration: item.status === true ? 'line-through' : 'none' }}
          >  

            <span className="text-white ">{item.title}</span>
          </li>


          {/*<button className = "px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={() => deleteTodo(item.id)}>delete</button>*/}
          <button className="px-3 ml-8 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={() => deleteTodo(item.id)}>
  Delete
</button>

        </ul>
      ))}
    </div>
  );
}

export default App;
