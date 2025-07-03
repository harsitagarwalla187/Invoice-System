import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerModal from "./CustomerModal";
import api from "../../api/axios"

const Customer = () => {
     const [customers, setCustomers] = useState([]);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
          const fetchCustomers = async () => {
               try {
                    const token = sessionStorage.getItem("accessToken");

                    const response = await api.get("/api/customers", {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    });


                    setCustomers(response.data);
               } catch (error) {
                    console.error("Failed to fetch customers:", error);
               }
          };

          fetchCustomers();
     }, []);

     const handleDelete = async (id) => {
          try {
               const token = sessionStorage.getItem("accessToken");

               await api.delete(`/api/customers/${id}`, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               setCustomers((prev) => prev.filter((c) => c.id !== id));
          } catch (err) {
               console.error("Delete failed", err);
          }
     };

     const handleAddCustomer = async (newCustomer) => {
          try {
               const token = sessionStorage.getItem("accessToken");

               const response = await api.post("/api/customers", newCustomer, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               const savedCustomer = response.data;
               setCustomers((prev) => [...prev, savedCustomer]);
               setIsModalOpen(false);
          } catch (error) {
               console.error("Failed to add customer:", error);
          }
     };

     return (
          <div className="p-6">
               <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                         <button
                              onClick={() => navigate(-1)}
                              className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                         >
                              ← Back
                         </button>
                         <h2 className="text-2xl font-bold">Customers</h2>
                    </div>

                    <button
                         onClick={() => setIsModalOpen(true)}
                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                         + Add Customer
                    </button>
               </div>

               <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg text-neutral">
                         <thead className="bg-gray-200">
                              <tr>
                                   <th className="text-left py-2 px-4">Name</th>
                                   <th className="text-left py-2 px-4">Email</th>
                                   <th className="text-left py-2 px-4">Contact</th>
                                   <th className="text-left py-2 px-4">Address</th>
                                   <th className="text-left py-2 px-4">Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {customers.map((customer) => (
                                   <tr key={customer.id} className="border-t">
                                        <td className="py-2 px-4">{customer.name}</td>
                                        <td className="py-2 px-4">{customer.email}</td>
                                        <td className="py-2 px-4">{customer.contact}</td>
                                        <td className="py-2 px-4">{customer.address}</td>
                                        <td className="py-2 px-4">
                                             <button
                                                  onClick={() => handleDelete(customer.id)}
                                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                             >
                                                  Delete
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                              {customers.length === 0 && (
                                   <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                             No customers found.
                                        </td>
                                   </tr>
                              )}
                         </tbody>
                    </table>
               </div>

               <CustomerModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddCustomer}
               />
          </div>
     );
};

export default Customer;
