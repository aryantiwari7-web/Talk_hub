import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";


function Signup() {
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [gender, setgender] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpassword] = useState("");

  const navigate = useNavigate();

  const handle = async () => {
    try {
       await axios.post(`${serverUrl}/api/vi/user/register`, {
        fullname,
        username,
        gender,
        password,
        confpassword,
      });

      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const handle1=async ()=>{
    navigate("/signin");
  }

  return (
    <div>
      <div>Create Account</div>

      <div>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter Full Name"
          onChange={(e) => setfullname(e.target.value)}
        />
      </div>

      <div>
        <label>User Name</label>
        <input
          type="text"
          placeholder="Enter User Name"
          onChange={(e) => setusername(e.target.value)}
        />
      </div>

      <div>
        <label>Gender</label>
        <input
          type="text"
          placeholder="Select Gender"
          onChange={(e) => setgender(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setconfpassword(e.target.value)}
        />
      </div>

      <button onClick={handle}>Create</button>

      <button onClick={handle1}>already have an account?</button>
    </div>
  );
}

export default Signup;