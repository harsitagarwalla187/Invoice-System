import { useNavigate } from "react-router-dom";

const Body = () => {
     const navigate = useNavigate();

     return (
          <div className="grid grid-cols-3 gap-10 px-[10rem] py-[8rem]">
               <button
                    className="bg-gray-300 text-neutral font-bold text-xl p-4 text-center rounded shadow"
                    onClick={() => navigate("/dashboard/customer")}
               >
                    Customer
               </button>

               <button
                    className="bg-gray-300 text-neutral font-bold text-xl p-4 text-center rounded shadow"
                    onClick={() => navigate("/dashboard/product")}
               >
                    Product
               </button>

               <button
                    className="bg-gray-300 text-neutral font-bold text-xl p-4 text-center rounded shadow"
                    onClick={() => navigate("/dashboard/invoicelist")}
               >
                    InvoiceList
               </button>

               <button
                    className="bg-gray-300 text-neutral font-bold text-xl p-4 text-center rounded shadow"
                    onClick={() => navigate("/dashboard/newinvoice")}
               >
                    NewInvoice
               </button>
          </div>
     );
};

export default Body;
