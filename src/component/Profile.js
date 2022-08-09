import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../firebaseConfig'
import { useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';

function Profile(props) {
    const [hovered, setHovered] = useState(false)
    const [img, setImg] = useState("")
    const [user, setUser] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data())
            }
        })

        if(img) {
            const uploadImg = async () => {
                const imgRef = ref(
                    storage, 
                    `avatar/${new Date().getTime()} - ${img.name}`
                    );

            try {
                if (user.avatarPath) {
                    await deleteObject(ref(storage, user.avatarPath));
                }
                const snap = await uploadBytes(imgRef, img);
                const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                    avatar: url,
                    avatarPath: snap.ref.fullPath,
                });

                setImg("");
                } catch(err) {
                    console.log(err.message)
                }
            };
            uploadImg()
        }
    }, [img])

    function mouseOut() {
        setTimeout(() => {
            setHovered(false)
        },500)
    }

    
    const handleSignOut = async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          isOnline: false,
        });
        await signOut(auth);
        navigate("/login");
      };

  return (
    <div className='profile-dropdown'>
        <div className='avatar-container'>
            <div className='img-container'>
                <img onMouseEnter={() => setHovered(true)} onMouseLeave={() => mouseOut} className='avatar-img' src={user?.avatar || `/21-avatar.svg`} alt="" />
            </div>
            {hovered && <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => mouseOut} className='img-change'>
                <label htmlFor="camera">
                <img className='camera' src="/camera.png" alt="" />
                </label>
                <input onChange={(e) => setImg(e.target.files[0])} id='camera' type="file" accept='image/*' style={{display: "none"}} />
            </div>}
        </div>
        <div className='details'>
            <h1 className='user-email-name'>Name</h1>
            <h3>{user?.name}</h3>
            <h1 className='user-email-name'>Email</h1>
            <h3>{user?.email}</h3>
            <h1 className='user-email-name'>Joined on</h1>
            <h3>{user?.createdAt.toDate().toDateString()}</h3>
            <button onClick={handleSignOut} className='log-out'>Logout <img src="/logOut.png" alt="" /></button>
        </div>
    </div>
  )
}

export default Profile