import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/authAction";
import { Link } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const {email, password} = login;

    const handleInput = (e) => {
        setLogin({
            ...login,
            [e.target.name]:e.target.value,
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
            if (!email || !password) {
                setErrorMessage("Please enter email and password!")
                return;
            }
            
          const response = await dispatch(userLogin(login))
          const { userId, token } = response.payload;

          // Save userId and token to localStorage
          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);
        }catch(error) {
            setErrorMessage("Invalid Email and Password!")
        }
        console.log(login)
    }
   
    return (
      <div className=" bg-[#F2F7FF] min-h-screen flex items-center justify-center">
         <div className="bg-white p-8 rounded-2xl shadow-md w-full md:max-w-3xl">
            <img src="/img/Incare 1.png" className="mx-auto w-56"/><br/>
                <h2 className="text-3xl font-bold mb-4 text-center text-[#435EBE]">Login</h2>
        <div className="text-center">
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
          <form className="space-y-4">
            <div className="block text-md font-medium text-gray-700">
            <label>Email:</label> <br/>
            <input type="text" 
             className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="email" 
            placeholder="enter your email" 
            value={email} 
            onChange={handleInput}
            />
            </div>

            <div className="block text-md font-medium text-gray-700">
            <label>Password:</label><br/>
            <input 
            type="password" 
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="password" 
            placeholder="enter your password" 
            value={password} 
            onChange={handleInput} 
            /> <br />
            </div>
            <button onClick={handleLogin} 
            className="w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#435EBE] hover:bg-[#3d55ab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button><br />
            <p className=" text-center">Don't have an account?
            <Link to="/register" style={{cursor:'pointer', color:'#435EBE'}}><u><b> Sign Up</b></u></Link>
            </p>
         </form>
        </div>
      </div>
    )
};

export default Login;