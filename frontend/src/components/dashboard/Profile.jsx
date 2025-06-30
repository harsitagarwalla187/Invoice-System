import { useState } from "react";

const Profile = () => {
     const [formData, setFormData] = useState({
          name: "Company Name",
          address: "Company Address",
          email: "company@gmail.com",
          phone: "9876543210",
     });

     const [isEditing, setIsEditing] = useState(false);

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleEditToggle = () => {
          setIsEditing(true); // allow fields to be editable
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          console.log("Updated data:", formData);

          // Optional: make API call to save data
          // await axios.post('/api/update-profile', formData);

          setIsEditing(false); // turn off edit mode after save
     };

     return (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
               <div>
                    <label className="block mb-1 text-neutral">Name</label>
                    <input
                         type="text"
                         name="name"
                         value={formData.name}
                         onChange={handleChange}
                         disabled={!isEditing}
                         className={`w-full px-4 py-2 border rounded-md text-neutral ${isEditing ? "bg-white" : "bg-gray-200"
                              }`}
                    />
               </div>

               <div>
                    <label className="block mb-1 text-neutral">Address</label>
                    <input
                         type="text"
                         name="address"
                         value={formData.address}
                         onChange={handleChange}
                         disabled={!isEditing}
                         className={`w-full px-4 py-2 border rounded-md text-neutral ${isEditing ? "bg-white" : "bg-gray-200"
                              }`}
                    />
               </div>

               <div>
                    <label className="block mb-1 text-neutral">Email</label>
                    <input
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         disabled={!isEditing}
                         className={`w-full px-4 py-2 border rounded-md text-neutral ${isEditing ? "bg-white" : "bg-gray-200"
                              }`}
                    />
               </div>

               <div>
                    <label className="block mb-1 text-neutral">Phone Number</label>
                    <input
                         type="tel"
                         name="phone"
                         value={formData.phone}
                         onChange={handleChange}
                         disabled={!isEditing}
                         pattern="[0-9]{10}"
                         maxLength={10}
                         className={`w-full px-4 py-2 border rounded-md text-neutral ${isEditing ? "bg-white" : "bg-gray-200"
                              }`}
                    />
               </div>

               <div className="mt-4 flex gap-2">
                    {!isEditing ? (
                         <button
                              type="button"
                              onClick={handleEditToggle}
                              className="bg-blue-600 text-white px-4 py-2 rounded"
                         >
                              Edit
                         </button>
                    ) : (
                         <button
                              type="submit"
                              className="bg-green-600 text-white px-4 py-2 rounded"
                         >
                              Save
                         </button>
                    )}
               </div>
          </form>
     );
};

export default Profile;