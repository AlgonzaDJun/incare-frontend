import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOTP, userRegister } from "../../redux/actions/authAction";
import { Link } from "react-router-dom";

function Register() {
    const dispatch = useDispatch();
    const [register, setRegister] = useState({
        username: "",
        fullname: "",
        email: "",
        no_hp: "",
        password: "",
        otp: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const { username, fullname, email, no_hp, password, otp } = register;
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleInput = (e) => {
        setRegister ({
            ...register,
            [e.target.name]: e.target.value,
        })
    }

    const handleTogglePassword = () => {
      setPasswordVisible(!passwordVisible)
    }

    const handleRegist = async (e) => {
      e.preventDefault();
  
      if (!username || !fullname || !email || !no_hp || !password || !otp) {
          setErrorMessage("Please complete the Sign Up form!");
          return;
      }
      try {
          dispatch(userRegister(register));
          console.log("Registration successful!");
      } catch (error) {
          // Handle the registration failure, for example, show an error message
          console.error("Registration failed:", error.message);
          setErrorMessage("Registration failed. Please try again.");
      }
  };

    const handleSendOTP = async () => {
      try {
        sendOTP(email);
      
        setEmailSent(true);
        setErrorMessage("")
      } catch (error) {
        console.error("Error sending OTP email:", error);
        setErrorMessage("Failed to send OTP email. Please try again.");
      }
    }

    return (
      <div className=" bg-[#F2F7FF] min-h-screen flex items-center justify-center p-8">
         <div className="bg-white p-8 rounded-2xl shadow-md w-full md:max-w-3xl">
         <img src="/img/Incare 1.png" className="mx-auto w-56"/><br/>
                <h2 className="text-3xl font-bold mb-4 text-center text-[#435EBE]">Sign Up</h2>
           <div className="text-center">
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
           </div>
         <form className="space-y-4">
           <div className="block text-md font-medium text-gray-700">
           <label>Username</label> <br />
            <input type="text"
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            name="username" 
            placeholder="enter an username" 
            value={username} 
            onChange={handleInput}
            />
           </div>
           
           <div className="block text-md font-medium text-gray-700">
           <label>Fullname</label> <br />
            <input type="text" 
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="fullname" 
            placeholder="enter your fullname" 
            value={fullname} 
            onChange={handleInput}
            />
           </div>

           <div className="block text-md font-medium text-gray-700">
            <label>Email</label> <br />
            <input type="text" 
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="email" 
            placeholder="enter your email" 
            value={email} 
            onChange={handleInput}
            />
            {email && (
             <p onClick={handleSendOTP} className="mt-2 text-[#435EBE] cursor-pointer text-sm ">
             Send OTP
             </p>
            )}
            {emailSent && (
             <p className="text-gray-600">
              Please check your email for the OTP code and enter it below.
             </p>
             )}
          </div>

          <div className="block text-md font-medium text-gray-700">  
            <label>Nomor handphone</label> <br />
            <input type="text" 
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="no_hp" 
            placeholder="enter your contact" 
            value={no_hp} 
            onChange={handleInput}
            />
          </div>


          <div className="block text-md font-medium text-gray-700">
            <label>Password</label> <br />
            <input type={passwordVisible ? "text" : "password"}
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="password" 
            placeholder="enter your password" 
            value={password} 
            onChange={handleInput}
            />
            <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
            ></span>
            {/* kasih vektor mata dalam span */}
          </div> 

          <div className="block text-md font-medium text-gray-700">
            <label>OTP</label> <br />
            <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="otp"
            placeholder="enter OTP Received Via Email"
            value={otp}
            onChange={handleInput}
             />
          </div>

            <button onClick={handleRegist}
            className="w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#435EBE] hover:bg-[#3d55ab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
            <p className=" text-center">Already have an account?
            <Link to="/" style={{cursor:'pointer', color:'#435EBE'}}><u><b> Login</b></u></Link>
            </p>
         </form>
        </div>
       </div> 
    )
}
export default Register;