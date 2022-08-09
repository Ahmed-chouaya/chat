import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { auth, db } from '../firebaseConfig'
import Messages from './Messages'
import SelectUser from './SelectUser'

export default function ChatDes({user}) {
  const [text, setText] = useState("")


  const user1 = auth.currentUser.uid

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    await addDoc(collection(db, 'messages', id, 'chat'), {
        text,
        form: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date())
    });
    setText("");
}

  return (
    <div className='chat-des'>
        {user ? <Messages handleSubmit={handleSubmit} text={text} setText={setText} />
        : <SelectUser/>}
    </div>
  )
}
