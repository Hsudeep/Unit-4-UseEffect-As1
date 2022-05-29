import React,{useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import "../App.css"
const Todo = () => {
    const [value, setValue] = useState("")
    const [todos,setTodos] = useState([])

    const dbData =()=>{
      fetch("http://localhost:3000/todos", {
        method: "POST",
        headers:{
          "content-type": "application/json",
        },
        body:JSON.stringify({
          text:value,
          done:false,
        }),
      })
      .then((r)=>r.json())
      .then((d)=>{
        setTodos([...todos, d])
        setValue("")
      });
    }
    
    useEffect(()=>{
      fetch("http://localhost:3000/todos")
      .then((r)=>r.json())
      .then((d)=>{
        
        setTodos(d)
      });
    },[]);

  return (
    <div>
        <input value={value} type="text" placeholder='Enter your todo....' onChange={(e)=>{
            setValue(e.target.value)
        }} />
        <button onClick={dbData}
        //  setTodos([...todos,{
        //    id:uuidv4(),
        //    text:value,
        //    done:true,
        //  }])
        //  setValue("")
         >ADD</button>

       <div >
         {todos.map((hata)=>(
           <div className='flex'>
             <input type={'checkbox'}></input>
          <p key={hata.id}>{hata.text}</p>
          <button>Save</button>
          </div>
         ))}
          
         
       </div>
    </div>
  )
}

export default Todo