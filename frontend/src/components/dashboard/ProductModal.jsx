import { useState } from "react";

const ProductModal = ({ isOpen, onClose, onAdd }) => {
     const [formData, setFormData] = useState({
          name: "",
          price: "",
          description: "",
     });

     const handleChange = (e) => {
          setFormData((prev) => ({
               ...prev,
               [e.target.name]: e.target.value,
          }));
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (!formData.name || !formData.price) return;

          onAdd({ ...formData, price: parseFloat(formData.price) });
          onClose();
          setFormData({ name: "", price: "", description: "" });
     };

     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 bg-black text-neutral bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                         <input
                              type="text"
                              name="name"
                              placeholder="Product Name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full border px-3 py-2 rounded"
                              required
                         />
                         <input
                              type="number"
                              name="price"
                              placeholder="Price"
                              value={formData.price}
                              onChange={handleChange}
                              className="w-full border px-3 py-2 rounded"
                              required
                         />
                         <textarea
                              name="description"
                              placeholder="Description"
                              value={formData.description}
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

export default ProductModal;
