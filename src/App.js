import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import User from './components/User/User';
import './App.css';

const App = () => {

  const[users, setUsers] = useState([]);
  const[mail, setMail] = useState('');
  const[userFound, setUserFound] = useState(false);
  const[searchedUser, setSearchedUser] = useState({});

  useEffect(() => {
    Axios.get('https://reqres.in/api/users?page=1')
    .then(res => {
      setUsers(res.data.data);
    })
    .catch(error => console.log(error))
  }, [])

  const onChange = (e) => {
    setMail(e.target.value);
    console.log(mail);
  }

  const searchUser = (e) => {
    e.preventDefault();
    if(!mail.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
      alert("PLEASE ENTER A VALID EMAIL!");
      return;
    }
    else{
      for(var i = 0; i < users.length; i++){
        if(users[i].email === mail){
          setUserFound(true);
          setSearchedUser(users[i]);
          return;
        }
      }
      if(userFound === false)
        alert("USER NOT FOUND!");
    }
  }

  return(
    <div className="main-container">
      <h1 id="header">Lybrate Assignment</h1>
      <div className="searchbar">
        <input type="email" id="search" name="mail" onChange={onChange} placeholder="Enter user email..."/>
        <span className="searchbar__button" onClick={searchUser}>Search</span>
      </div>
      {userFound && 
        <div className="user-container">
          <h1 className="user-container__header">Search Results</h1>
          <div className="user-container__tiles">
            <User user={searchedUser} />
          </div>
        </div>
      }
      <div className="user-container">
        <h1 className="user-container__header">Users</h1>
        <div className="user-container__tiles">
          {
            users.map( item => (
              <User key={item.id} user={item} />
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default App;