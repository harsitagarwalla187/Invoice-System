import Customer from "./Customer";
import Product from "./Product";
import InvoiceList from "./InvoiceList";
import NewInvoice from "./NewInvoice";

const Body = () => {
     return (
          <div className="grid grid-cols-3 gap-10 px-[10rem] py-[8rem]">
               <div className="bg-gray-300 text-neutral font-bold text-xl p-4 text-center rounded shadow">
                    <Customer />
               </div>

               <div className="bg-gray-300 text-neutral font-bold text-xl p-4 text-center rounded shadow">
                    <Product />
               </div>

               <div className="bg-gray-300 text-neutral font-bold text-xl p-4 text-center rounded shadow">
                    <InvoiceList />
               </div>

               <div className="bg-gray-300 text-neutral font-bold text-xl p-4 text-center rounded shadow">
                    <NewInvoice />
               </div>
          </div>
     );
};

export default Body;
