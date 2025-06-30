import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductModal";

const initialProducts = [
     {
          id: 1,
          name: "Laptop",
          price: 75000,
          description: "High performance laptop",
     },
     {
          id: 2,
          name: "Smartphone",
          price: 25000,
          description: "Latest Android phone",
     },
];

const Product = () => {
     const [products, setProducts] = useState(initialProducts);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const navigate = useNavigate();

     const handleDelete = (id) => {
          setProducts(products.filter((p) => p.id !== id));
     };

     const handleAddProduct = (newProduct) => {
          const id = products.length ? products[products.length - 1].id + 1 : 1;
          setProducts([...products, { ...newProduct, id }]);
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
                         <h2 className="text-2xl font-bold">Products</h2>
                    </div>

                    <button
                         onClick={() => setIsModalOpen(true)}
                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                         + Add Product
                    </button>
               </div>

               <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg text-neutral">
                         <thead className="bg-gray-200">
                              <tr>
                                   <th className="text-left py-2 px-4">Name</th>
                                   <th className="text-left py-2 px-4">Price</th>
                                   <th className="text-left py-2 px-4">Description</th>
                                   <th className="text-left py-2 px-4">Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {products.map((product) => (
                                   <tr key={product.id} className="border-t">
                                        <td className="py-2 px-4">{product.name}</td>
                                        <td className="py-2 px-4">₹{product.price}</td>
                                        <td className="py-2 px-4">{product.description}</td>
                                        <td className="py-2 px-4">
                                             <button
                                                  onClick={() => handleDelete(product.id)}
                                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                             >
                                                  Delete
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                              {products.length === 0 && (
                                   <tr>
                                        <td colSpan="4" className="text-center py-4 text-gray-500">
                                             No products found.
                                        </td>
                                   </tr>
                              )}
                         </tbody>
                    </table>
               </div>

               <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddProduct}
               />
          </div>
     );
};

export default Product;
