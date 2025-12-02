import logoImage from 'figma:asset/8e191f727b2ef8023e7e4984e9036f679c3d3038.png';
import { supabase } from '../createClient';
import React, { useState } from "react";

// const [users, setUsers] = useState<any[]>([]);
//   console.log(users)
//   async function fetchUsers(){
//     const {data} = await supabase
//       .from('Auth')
//       .select('*')
//       setUsers(data || [])
//   }

export function LoginSignupModal() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email, 
      password, password,
    });

    setLoading(false);

    if (error){
      alert("Login Failed " + error.message);
    } else {
      alert("Login Successful");
    }

    alert("Login Successful")
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#309898]/20 via-white to-[#FF8000]/20 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border-4 border-[#309898]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Vytara Logo" className="w-24 h-24" />
        </div>
        
        <h1 className="text-center text-[#309898] mb-2">Vytara</h1>
        <p className="text-center text-gray-600 mb-6">Your Personal Health Companion</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-[#309898] mb-2">Email</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none transition"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#309898] mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none transition"
              placeholder="Enter your Phone"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#309898] to-[#FF8000] text-white py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            {loading ? "Checking..." : "Login"}
          </button>

          <div className="flex justify-between text-sm mt-4">
            <button type="button" className="text-[#FF8000] hover:underline">
              Forgot Password?
            </button>
            <button
              type="button"
              className="text-[#309898] hover:underline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}