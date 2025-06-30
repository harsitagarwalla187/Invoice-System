import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (isLogin) {
      // LOGIN
      try {
        const res = await axios.post("http://localhost:8080/api/auth/login", {
          email,
          password,
        });

        // Save token
        sessionStorage.setItem("accessToken", res.data.token);
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        alert("Login failed.");
      }
    } else {
      // REGISTER
      const name = form.name.value;

      console.log(name);
      

      try {
        await axios.post("http://localhost:8080/api/auth/register", {
          name,
          email,
          password,
        });

        // Auto-switch to login mode after register
        setIsLogin(true);
        alert("Registration successful. Please login.");
      } catch (err) {
        console.error(err);
        alert("Registration failed.");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4">
      <button
        onClick={() => navigate("/")}
        className="btn shadow-xl rounded-xl px-4 py-2 m-4 bg-white text-neutral"
      >
        &larr; Back
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-md ${isLogin ? "bg-base-300 text-white" : "bg-gray-200 text-gray-800"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-md ${!isLogin ? "bg-base-300 text-white" : "bg-gray-200 text-gray-800"
              }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block mb-1 text-neutral">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-neutral"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-neutral">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-neutral"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-neutral">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-neutral"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-base-100 text-white py-2 rounded-md hover:bg-neutral transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
