import React from 'react'

function Messages({handleSubmit, text, setText}) {
  return (
    <div className='message'>
        <form className='message-form' onSubmit={handleSubmit}>
            <textarea placeholder='Enter message' className='message-input' name="text" rows="2" cols="10" wrap="soft" id='message' value={text} onChange={(e) => setText(e.target.value)} />
            <label htmlFor="message" alt=""></label>
            <input className='image-input' type="file" accept='image/*' id='img' />
            <label className='image-label' htmlFor="img"><img src="/img.png" alt="" /></label>
            <button style={{border:"none"}}>
            <img className='send-img' src="/send.png" alt="" />
            </button>
        </form>
    </div>
  )
}

export default Messages