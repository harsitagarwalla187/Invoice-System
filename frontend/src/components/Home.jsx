import { useNavigate } from "react-router-dom"

const Home = () => {
     const navigate = useNavigate();

     return (
          <div className="h-screen flex items-center justify-center flex-col gap-5">
               <h1 className="text-7xl font-bold text-center">Welcome to Invoice System</h1>
               <p className="text-xl text-center w-4xl text-wrap text-gray-600">
                    Create, manage, and export invoices effortlessly. Streamline your billing process and keep track of your customers, products, and transactions — all in one place.
               </p>
               <button
                    onClick={() => navigate("/LoginRegister")}
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
               >
                    Login/Register
               </button>
          </div>
     )
}

export default Home