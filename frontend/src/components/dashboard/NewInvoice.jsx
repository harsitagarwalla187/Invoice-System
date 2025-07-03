import { useEffect, useState } from "react";
import api from "../../api/axios"

const NewInvoice = () => {
     const [customers, setCustomers] = useState([]);
     const [products, setProducts] = useState([]);
     const [selectedCustomerId, setSelectedCustomerId] = useState("");
     const [selectedProducts, setSelectedProducts] = useState([]);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const token = sessionStorage.getItem("accessToken");

                    const customerRes = await api.get("/api/customers", {
                         headers: { Authorization: `Bearer ${token}` }
                    });
                    setCustomers(customerRes.data);

                    const productRes = await api.get("/api/products", {
                         headers: { Authorization: `Bearer ${token}` }
                    });
                    setProducts(productRes.data);
               } catch (err) {
                    console.error("Failed to fetch customers/products", err);
               }
          };

          fetchData();
     }, []);

     const handleAddProduct = () => {
          setSelectedProducts([...selectedProducts, { productId: "", quantity: 1 }]);
     };

     const handleRemoveProduct = (index) => {
          const updated = selectedProducts.filter((_, i) => i !== index);
          setSelectedProducts(updated);
     };

     const handleProductChange = (index, field, value) => {
          const updated = [...selectedProducts];
          updated[index][field] = value;
          setSelectedProducts(updated);
     };

     const calculateLineTotal = (productId, quantity) => {
          const product = products.find(p => p.id === Number(productId));
          return product ? product.price * quantity : 0;
     };

     const grandTotal = selectedProducts.reduce(
          (sum, item) => sum + calculateLineTotal(item.productId, item.quantity),
          0
     );

     const handleSubmit = async () => {
          try {
               const token = sessionStorage.getItem("accessToken");

               const payload = {
                    customerId: selectedCustomerId,
                    items: selectedProducts.map(item => ({
                         productId: Number(item.productId),
                         quantity: item.quantity
                    }))
               };
               console.log("Invoice created successfully:", payload);

               await api.post("/api/invoices", payload, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                         "Content-Type": "application/json"
                    }
               });
               alert("Invoice created successfully!");
          } catch (error) {
               console.error("Failed to create invoice:", error);
               alert("Error creating invoice.");
          }
     };


     return (
          <div className="p-6 max-w-4xl mx-auto">
               <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>

               <div className="mb-6">
                    <label className="block font-semibold mb-2">Select Customer:</label>
                    <select
                         className="w-full border p-2 rounded bg-grey-200"
                         value={selectedCustomerId}
                         onChange={(e) => setSelectedCustomerId(e.target.value)}
                    >
                         <option value="">-- Select Customer --</option>
                         {customers.map((cust) => (
                              <option key={cust.id} value={cust.id}>{cust.name}</option>
                         ))}
                    </select>
               </div>

               <div>
                    <h2 className="text-lg font-semibold mb-2">Add Products</h2>

                    {selectedProducts.map((item, index) => (
                         <div key={index} className="flex gap-3 items-center mb-3">
                              <select
                                   className="border p-2 rounded"
                                   value={item.productId}
                                   onChange={(e) => handleProductChange(index, "productId", e.target.value)}
                              >
                                   <option value="">-- Select Product --</option>
                                   {products.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                                   ))}
                              </select>

                              <input
                                   type="number"
                                   className="border p-2 w-24 rounded"
                                   placeholder="Qty"
                                   value={item.quantity}
                                   min={1}
                                   onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
                              />

                              <span className="font-semibold">
                                   ₹{calculateLineTotal(item.productId, item.quantity).toFixed(2)}
                              </span>

                              <button
                                   type="button"
                                   onClick={() => handleRemoveProduct(index)}
                                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                              >
                                   Remove
                              </button>
                         </div>
                    ))}

                    <button
                         onClick={handleAddProduct}
                         type="button"
                         className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                         + Add Product
                    </button>

                    <div className="text-right font-bold text-xl mt-6">
                         Grand Total: ₹{grandTotal.toFixed(2)}
                    </div>

                    <div className="text-right mt-6">
                         <button
                              onClick={handleSubmit}
                              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                         >
                              Submit Invoice
                         </button>
                    </div>

               </div>
          </div>
     );
};

export default NewInvoice;