import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebaseConfig';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    function handleGithub() {
        signInWithPopup(auth, githubProvider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setError(null)
            props.setSnackBarLogin(true)
            setTimeout(() => {
                props.setSnackBarLogin(false)
            }, 3000)
            return user
        })
        .then(user => {
            getDoc(doc(db, "users", user.uid))
            .then((docSnap) => {
                if (docSnap.data()) {
                    updateDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        isOnline: true,
                    });
                    navigate("/chat")
                }else {
                    setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        isOnline: true,
                        createdAt: Timestamp.fromDate(new Date()),
                    });
                }
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GithubAuthProvider.credentialFromError(error);
            setError(errorCode.replace("auth/", "").replace(/-/g, " "))
        });
    }

    function handleGoogle() {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setError(null)
            props.setSnackBarLogin(true)
            setTimeout(() => {
                props.setSnackBarLogin(false)
            }, 3000)
            return user
        })
        .then(user => {
            getDoc(doc(db, "users", user.uid))
            .then((docSnap) => {
                if (docSnap.data()) {
                    updateDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        isOnline: true,
                    });
                    navigate("/chat")
                }else {
                    setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        avatar: user.photoURL,
                        name: user.displayName,
                        email: user.email,
                        isOnline: true,
                        createdAt: Timestamp.fromDate(new Date()),
                    });
                }
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            setError(errorCode.replace("auth/", "").replace(/-/g, " "))
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setError(null)
            props.setSnackBarLogin(true)
            setTimeout(() => {
                props.setSnackBarLogin(false)
            }, 3000)
            return user;
        })
        .then(user => {
            updateDoc(doc(db, "users", user.uid), {
                isOnline: true
            });
            setEmail("")
            setPassword("")
            navigate("/chat")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode.replace("auth/", "").replace(/-/g, " "))
        });
    }
  return (
    <div className='login'>
        <div className='login-dashborad'>
            <div className='logo-div'>
                <img className='logo' src="/logoName.png" alt="" />
            </div>
            <div className='login-forum'>
                <h1 className='welcome'>Wellcome Back</h1>
                <h2 className='welcome-details'>Wellcome back! Please enter your details.</h2>
                <form onSubmit={handleSubmit}>
                    <div className="email-input">
                        <input onChange={(e) => setEmail(e.target.value)} className='email' id='email' placeholder='  ' type="email" required/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="email-input">
                        <input onChange={(e) => setPassword(e.target.value)} className='email' id='password' placeholder='  ' type="password" required/>
                        <label htmlFor="password">password</label>
                    </div>
                    {error && <div className='error' ><p>{error}</p></div>}
                    <div className='login-remember'>
                        <div className='remember-me'>
                            <input id="remember" type="checkbox" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <h3 className='forgot-password'>Forgot password</h3>
                    </div>
                <button className='sign-in'>Sign in</button>
                </form>
                <div className='brand-icons'>
                    <img onClick={handleGoogle} className='icons' src="/google.png" alt="" />
                    <img onClick={handleGithub} className='icons' src="/github.png" alt="" />
                </div>
                <div className='dont-have-account'>
                    <h3 className='go-sign-up'>Don't have an account? <Link style={{textDecoration: "none", color:"#423fde"}} to={"/"}>Sign up</Link></h3>
                </div>
            </div>
        </div>
        <div className='poster'>
            <img className='poster-image' src="/chatPoster.png" alt="" />
        </div>
    </div>
  )
}

export default Login