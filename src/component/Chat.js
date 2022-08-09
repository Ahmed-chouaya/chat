import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Profile from './Profile';
import ChatDash from './ChatDash';
import ChatDes from './ChatDes';

function Chat() {
    const [dropdown, setDropdown] = useState(false)
    const [user, setUser] = useState()
    const [chat, setChat] = useState("")
    
    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data())
            }
        })
    }, [user])

    const handleDropdown = () => {
        setDropdown(prev => !prev)
    }

    const selectUser = (user) => {
        setChat(user)
    }

  return (
    <div className='chat'>
        <ChatDash selectUser={selectUser} />
        <div className='nav'>
            <nav className='chat-nav'>
                <img className='logo-chat' src="/logoName.png" alt="" />
                <div className='profile'>
                    <img onClick={handleDropdown} className='profile-image' src={user?.avatar || `/21-avatar.svg`} alt="" />
                </div>
            </nav>
            <ChatDes user={chat}/>
        {dropdown && <Profile  />}
        </div>
    </div>
  )
}

export default Chat