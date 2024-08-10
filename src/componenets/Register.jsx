import { useRef, useState, useEffect } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { text } from "body-parser";
import e from "express";


const Register = () => {
    const USER_REGX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; // Corrected the regular expression
    const CLASS_REGX3 = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; // Corrected the regular expression
    const PASS_REGX2 = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const userRef = useRef(); // Correct reference
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [className, setClassName] = useState('');
    const [validClassName, setValidClassName] = useState(false);
    const [classFocus, setClassFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdfocus, setPwdFocus] = useState(false);

    const [matchpwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const history = useNavigate()

    useEffect(() => {
        userRef.current.focus(); // Set focus to username input on component mount
    }, []);

    useEffect(() => {
        const result = USER_REGX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = CLASS_REGX3.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PASS_REGX2.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchpwd;
        setValidMatch(match);
    }, [pwd, matchpwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchpwd]);

    const handleSubmit = async (e)=>{ 
        e.preventDefault()

        try{

            await axios.post("http://localhost:5000/",{
                    user,pwd
            })
            .then(res=>{
                if(res.data="exists"){
                    history("/home")
                }
            })
        }
        catch(e){
            console.log(e)
        }
        // useEffect(()=>{
        //     navigate('/home')
        // })
        // Perform any validation or API call here before navigating
    }

    return (
        <> 
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl">
            <p ref={errRef} className={errMsg ? "errmsg" : "hidden"} aria-live="assertive">{errMsg}</p>
            <h1 className=" text-black font-bold m-[30px] p-[10px] ">Register</h1>
            <form action="POST" className=" min-w-6 min-h-19 flex flex-col justify-center items-center text-gray-600 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
               
                <label className="font-bold m-[30px] mb-[0px]" htmlFor="username">Username:
                    <span className={validName ? "valid" : "hidden"}>
                        <FontAwesomeIcon icon = {faCheck}/>
                    </span>
                    <span className={!validName || !user ? "invalid" : "hidden"}><FontAwesomeIcon icon = {faTimes}/></span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    placeholder="Username"
                    className="border border-gray-600 rounded"
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "hidden" }>
                <FontAwesomeIcon icon = {faInfoCircle}/>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

             
                <label className="font-bold m-[30px] mb-[0px]" htmlFor="password">Password:
                    <span className={validPwd ? "valid" : "hidden"}><FontAwesomeIcon icon = {faCheck}/></span>
                    <span className={validPwd || !pwd ? "hidden" : "invalid"}><FontAwesomeIcon icon = {faTimes}/></span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    placeholder="Password"
                    className="border border-gray-600 rounded"
                />
                <p id="pwdnote" className={pwdfocus && !validPwd ? "instructions" : "hidden"}>
                <FontAwesomeIcon icon = {faInfoCircle}/>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number, and a special character.<br />
                    Allowed special characters: !@#$%
                </p>

                
                <label className="font-bold m-[30px] mb-[0px]" htmlFor="confirm_pwd">Confirm Password:
                    <span className={validMatch && matchpwd ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon = {faInfoCircle}/><FontAwesomeIcon icon = {faCheck}/></span>
                    <span className={validMatch || !matchpwd ? "hidden" : "invalid"}><FontAwesomeIcon icon = {faTimes}/></span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    placeholder="Password"
                    className="border border-gray-600 rounded"
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "hidden"}>
                    Must match the first password input field.
                </p>

                {/* <label className="font-bold m-[30px] mb-[0px]" htmlFor="confirm_pwd">Department:
                    <span className={validMatch && matchpwd ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon = {faInfoCircle}/><FontAwesomeIcon icon = {faCheck}/></span>
                    <span className={validMatch || !matchpwd ? "hidden" : "invalid"}><FontAwesomeIcon icon = {faTimes}/></span>
                </label>
                <input
                    type="text"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    placeholder="Password"
                    className="border border-gray-600 rounded"
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "hidden" }>
                <FontAwesomeIcon icon = {faInfoCircle}/>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <label className="font-bold m-[30px] mb-[0px]" htmlFor="confirm_pwd">Section:
                    <span className={validClassName ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon = {faInfoCircle}/><FontAwesomeIcon icon = {faCheck}/></span>
                    <span className={validClassName ? "hidden" : "invalid"}><FontAwesomeIcon icon = {faTimes}/></span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    placeholder="Password"
                    className="border border-gray-600 rounded"
                />
                 <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "hidden" }>
                <FontAwesomeIcon icon = {faInfoCircle}/>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p> */}

                <input type="submit" onClick={handleSubmit(e)}
                  className="bg-black text-white font-bold py-2 px-4 my-5 rounded hover:cursor-pointer hover:bg-green-400 hover:text-black" disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Sign Up
                </input>
            </form>
        </div>
        {/* <Routes>
            <Route path='/' element={<Home />} />
        </Routes> */}
     </>
    );
}

export default Register;
