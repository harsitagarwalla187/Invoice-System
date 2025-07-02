import { useEffect, useState } from "react";
import api from "../../api/axios";

const Profile = () => {
     const [formData, setFormData] = useState({
          name: "",
          address: "",
          email: "",
          contact: "",
     });

     const [originalData, setOriginalData] = useState({});
     const [isEditing, setIsEditing] = useState(false);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchProfile = async () => {
               try {
                    const res = await api.get("/api/company/profile", {
                         headers: {
                              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                         },
                    });
                    console.log(res.data);

                    setFormData(res.data);
                    setOriginalData(res.data);
                    setLoading(false);
               } catch (error) {
                    console.error("Failed to fetch profile:", error);
               }
          };

          fetchProfile();
     }, []);

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleEditToggle = () => {
          console.log("Editing mode toggled");

          setIsEditing(true);
     };

     const handleCancel = () => {
          setFormData(originalData);
          setIsEditing(false);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          console.log("Submitting profile update", formData);

          try {
               const res = await api.put("/api/company/profile", formData, {
                    headers: {
                         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    },
               });
               setFormData(res.data);
               setOriginalData(res.data); 
               setIsEditing(false);
          } catch (error) {
               console.error("Failed to update profile:", error);
          }
     };

     if (loading) return <p className="p-4">Loading profile...</p>;

     return (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-lg mx-auto">
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
                         disabled
                         className="w-full px-4 py-2 border rounded-md bg-gray-200 text-neutral"
                    />
               </div>

               <div>
                    <label className="block mb-1 text-neutral">Phone Number</label>
                    <input
                         type="tel"
                         name="contact"
                         value={formData.contact}
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
                         <>

                              <button
                                   type="button"
                                   onClick={handleCancel}
                                   className="bg-red-500 text-white px-4 py-2 rounded"
                              >
                                   Cancel
                              </button>
                              <button
                                   type="submit"
                                   className="bg-green-600 text-white px-4 py-2 rounded"
                              >
                                   Save
                              </button>
                         </>
                    )}
               </div>
          </form>
     );
};

export default Profile;
