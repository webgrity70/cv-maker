import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { auth } from "./firebase/firebase";

const Login = () =>{
    const [userEmail,setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const [emsg,setEmsg] = useState('');
    const [isloggedin, setIsloggedIn] = useState(false);
    const [loggedInDetails, setLoggedInDetails] = useState('');



    const login = async (e) =>{
        e.preventDefault();
        try{
            const user = await signInWithEmailAndPassword(auth,userEmail,userPass);
            if(user){
                console.log(auth.currentUser.email);
                //setEmsg(auth.currentUser.email);
            }
        }catch(error){
            console.log(error);
            setEmsg(error.message);
        }
    }
    return(
        <>
        <form className="formContainer" onSubmit={login} style={formContainer}>
            <div className="row">
                <div className="col-12" style={{marginBottom: '15px'}}>
                    <div className="text-center" style={{marginBottom: '10px'}}>{emsg}</div>
                    <h1 className="text-center">Login</h1>
                </div>
                <div className="col-12" style={{marginBottom: '15px'}}>
                    <input type="email" className="form-control" placeholder="Enter Email" onChange={(event)=>{setUserEmail(event.target.value)}} />
                </div>
                <div className="col-12" style={{marginBottom: '15px'}}>
                    <input type="password" className="form-control" placeholder="Enter Password"  onChange={(event)=>{setUserPass(event.target.value)}} />
                </div>
                <div className="col-12 text-center">
                    <button className="btn">Sig In</button>
                    <p style={{marginTop: '20px'}}>Not have account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </form>
        </>
    )
}

const formContainer = {
    maxWidth: "480px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px"
};

export default Login;