import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvoiceList = () => {
     const [invoices, setInvoices] = useState([]);
     const navigate = useNavigate();

     useEffect(() => {
          const fetchInvoices = async () => {
               try {
                    const token = sessionStorage.getItem("accessToken");
                    const response = await axios.get("http://localhost:8080/api/invoices", {
                         headers: {
                              Authorization: `Bearer ${token}`
                         }
                    });

                    setInvoices(response.data);
               } catch (error) {
                    console.error("Failed to fetch invoices:", error);
               }
          };

          fetchInvoices();
     }, []);

     const handleAddInvoice = () => {
          navigate("/dashboard/newinvoice");
     };

     const handleDownloadPDF = async (invoiceId) => {
          const token = sessionStorage.getItem("accessToken");

          try {
               const response = await axios.get(`http://localhost:8080/api/invoices/${invoiceId}/pdf`, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob", // Important!
               });

               const url = window.URL.createObjectURL(new Blob([response.data]));
               const link = document.createElement("a");
               link.href = url;
               link.setAttribute("download", `invoice_${invoiceId}.pdf`);
               document.body.appendChild(link);
               link.click();
               link.remove();
          } catch (error) {
               console.error("PDF download failed:", error);
          }
     };


     return (
          <div className="p-6">
               {/* Header with Back and Add buttons */}
               <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                         <button
                              onClick={() => navigate(-1)}
                              className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                         >
                              ← Back
                         </button>
                         <h2 className="text-2xl font-bold">Invoices</h2>
                    </div>

                    <button
                         onClick={handleAddInvoice}
                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                         + Add Invoice
                    </button>
               </div>

               {/* Invoice Table */}
               <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg text-neutral">
                         <thead className="bg-gray-200">
                              <tr>
                                   <th className="text-left py-2 px-4">Invoice ID</th>
                                   <th className="text-left py-2 px-4">Customer Name</th>
                                   <th className="text-left py-2 px-4">Date</th>
                                   <th className="text-left py-2 px-4">Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {invoices.map((invoice) => (
                                   <tr key={invoice.id} className="border-t">
                                        <td className="py-2 px-4">#{invoice.id}</td>
                                        <td className="py-2 px-4">{invoice.customer.name}</td>
                                        <td className="py-2 px-4">{invoice.date}</td>
                                        <td className="py-2 px-4">
                                             <button
                                                  onClick={() => handleDownloadPDF(invoice.id)}
                                                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                             >
                                                  Download PDF
                                             </button>

                                        </td>
                                   </tr>
                              ))}
                              {invoices.length === 0 && (
                                   <tr>
                                        <td colSpan="4" className="text-center py-4 text-gray-500">
                                             No invoices found.
                                        </td>
                                   </tr>
                              )}
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default InvoiceList;
