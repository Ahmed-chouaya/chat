import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';

function ChatDash({selectUser}) {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));

        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            })
            setUsers(users)
        })
        return () => unsub()
    }, [])

  return (
    <div className='users-dash'>
      <header className='users-header'>
        <img className='search-icon' src="/search.png" alt="" />
        <input className='search-users' type="search" placeholder='Search' />
      </header>
      {users.map(user => 
      <div className='user' onClick={() => selectUser(user)}>
        <div className='users-online'>
          <img className='user-image' src={user?.avatar || "/21-avatar.svg"} alt="" />
        </div>
          <div className={user.isOnline ? `online-dot`: 'offline-dot'}></div>
        <div>
          <h1 className='users-name'>{user.name}</h1>
        </div>
      </div> )}
    </div>
  )
}

export default ChatDash