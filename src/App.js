import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import User from './components/User/User';
import './App.css';

const App = () => {

  //users array holds all the users returned from API hit.
  const[users, setUsers] = useState([]);

  //mail contains the input field text
  const[mail, setMail] = useState('');

  //userFound contains the state whether user is found or not
  const[userFound, setUserFound] = useState(false);

  //searchedUser contains the user found in search results
  const[searchedUser, setSearchedUser] = useState({});

  //All the user data will be fetched when the component is loaded using the useEffect hook
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

  //function to search the user in the users array
  const searchUser = (e) => {
    e.preventDefault();

    //regex matching for email validation
    if(!mail.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
      alert("PLEASE ENTER A VALID EMAIL!");
      return;
    }
    else{

      //looping through the users array to find email match
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