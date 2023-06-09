import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import './Details.css'

function Details() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input,setInput] = useState('')

  const fetchApi = async () => {
    setLoading(true);
    let fetchData = await fetch("https://jsonplaceholder.typicode.com/users");
    fetchData = await fetchData.json();
    setLoading(false);
    console.log("User Data ", fetchData);
    setData(fetchData);
  };

  useEffect(() => {
    fetchApi();
    
  }, []);



  const handleInput = (e)=>{
    const term = e.target.value
      setInput (term)
      console.log(e.target.value)  
      }
        
       

  return (
    <div className="main">
      <h1>UserNames</h1>

      <input type="text" value={input}  onChange={handleInput} />

      {loading ? <Spinner /> : ""}

      {data && data.filter((item)=>{
             const userName =  item.name.toLowerCase()
             const searchTerm = input.toLowerCase()
           return (
            userName.startsWith(searchTerm)||
            userName.includes(input)
            ||userName.includes(input)||userName.startsWith(searchTerm)
            )
     
      })
      .map((item) => (
        <div   className="content" key={item.name}>
            
          <h4>{item.id}</h4>  

          <h2>{item.name}</h2>
           
        </div>
      ))}
    </div>
  );
}

export default Details;
