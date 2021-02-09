import React from 'react';
import './User.css';

//This component creates the user cards.
const User = ({user}) => {
    return (
        <div className="user-container__user">
            <div className="user-container__img">
                <img src={user.avatar} alt="user img" id="user-img"/>
            </div>
            <div className="user-container__data">
                <p id="user-container__name">{user.first_name} <b>{user.last_name}</b></p>
                <p id="user-container__email">{user.email}</p>
            </div>
        </div>
    )
}

export default User;
