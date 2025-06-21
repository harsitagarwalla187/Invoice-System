import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {

        let email = e.target["email"]?.value;
        let password = e.target["password"]?.value;

        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          sessionStorage.setItem("accessToken", data.token);
          navigate("/dashboard")
        } else {
          alert(data.message || "Login failed.");
        }
      } else {

        let name = e.target["name"]?.value;
        let email = e.target["email"]?.value;
        let password = e.target["password"]?.value;

        const response = await fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1"
          },
          body: JSON.stringify({ name, email, password })
        })

        const data = await response.json();

        if (response.ok) {
          sessionStorage.setItem("accessToken", data.token);
          navigate("/dashboard")
        } else {
          alert(data.message || "Login failed.");
        }
      }
    } catch (error) {
      console.error("Error during login: ", error);
      alert("Something went wrong.");
    }
    // if (isLogin) {
    //   let email = e.target["email"]?.value;
    //   let password = e.target["password"]?.value;
    //   console.log(email, password);
    // } else {

    //   console.log(name, email, password);
    // }
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
