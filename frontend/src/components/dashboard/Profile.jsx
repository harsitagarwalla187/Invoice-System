const Profile = () => {

     const handleSubmit = (e) => {

     }

     return (
          <form onSubmit={handleSubmit}>
               <div>
                    <label className="block mb-1 text-neutral">Name</label>
                    <input
                         type="text"
                         name="name"
                         placeholder="Company Name..."
                         className="w-full px-4 py-2 border border-gray-300 rounded-md text-neutral"
                         required
                    />
               </div>
               <div>
                    <label className="block mb-1 text-neutral">Address</label>
                    <input
                         type="text"
                         name="address"
                         placeholder="Company Address..."
                         className="w-full px-4 py-2 border border-gray-300 rounded-md text-neutral"
                         required
                    />
               </div>
               <div>
                    <label className="block mb-1 text-neutral">Email</label>
                    <input
                         type="email"
                         name="email"
                         placeholder="company@gmail.com"
                         className="w-full px-4 py-2 border bg-gray-200 border-gray-300 rounded-md text-neutral"
                         required
                         disabled
                    />
               </div>
               <div>
                    <label className="block mb-1 text-neutral">Phone Number</label>
                    <input
                         type="tel"
                         name="phone"
                         placeholder="Phone Number"
                         pattern="[0-9]{10}"
                         maxLength={10}
                         className="w-full px-4 py-2 border border-gray-300 rounded-md text-neutral"
                         required
                    />
               </div>

          </form>
     )
}

export default Profile