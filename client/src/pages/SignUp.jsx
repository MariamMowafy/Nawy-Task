import React from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {


  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    setLoading(true);
    const res = await fetch("/server/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log("Form submitted:", data);
    if(data.status=="Request Failed"){
      setLoading(false);
      setError(data.message);
      return;
    }
    console.log(data.status)
    setLoading(false);
    setError(null);
    navigate("/sign-in");
  } catch (error) {
    setLoading(false);
    setError("An error occurred while submitting the form.");
    console.error("Error submitting form:", error);
  }
}
  
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form className="w-full p-4 bg-white shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Username"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full"
          id="password"
          onChange={handleChange}

        />
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-blue-600 transition duration-200" onClick={handleSubmit}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className=" flex gap-2 mt-5 flex-col items-center justify-center">
        <div className="flex items-center gap-2">
        <p>Have an account?</p>
        <span className="text-blue-500 cursor-pointer hover:underline">
          <Link to="/sign-in">Sign In</Link>
        </span>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
