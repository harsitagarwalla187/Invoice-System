import React, { useState } from "react";
import axios from "axios";

const CustomerModal = ({ isOpen, onClose, onAdd }) => {
     const [formData, setFormData] = useState({
          name: "",
          email: "",
          contact: "",
          address: "",
     });

     const handleChange = (e) => {
          setFormData((prev) => ({
               ...prev,
               [e.target.name]: e.target.value,
          }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.name || !formData.email) return;

          try {
               const token = sessionStorage.getItem("accessToken");

               const response = await axios.post(
                    "http://localhost:8080/api/customers",
                    formData,
                    {
                         headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                         },
                    }
               );

               onAdd(response.data);
               onClose();
               setFormData({ name: "", email: "", contact: "", address: "" });
          } catch (error) {
               console.error("Error adding customer:", error);
               alert("Failed to save customer. Check your authentication or backend.");
          }
     };

     if (!isOpen) return null;

     return (
          <div className="fixed text-neutral inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Add New Customer</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                         <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full border px-3 py-2 rounded"
                              required
                         />
                         <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full border px-3 py-2 rounded"
                              required
                         />
                         <input
                              type="text"
                              name="contact"
                              placeholder="contact"
                              value={formData.contact}
                              onChange={handleChange}
                              className="w-full border px-3 py-2 rounded"
                         />
                         <input
                              type="text"
                              name="address"
                              placeholder="Address"
                              value={formData.address}
                              onChange={handleChange}
                              className="w-full border px-3 py-2 rounded"
                         />
                         <div className="flex justify-end gap-2 pt-4">
                              <button
                                   type="button"
                                   onClick={onClose}
                                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                              >
                                   Cancel
                              </button>
                              <button
                                   type="submit"
                                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                   Add
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default CustomerModal;
