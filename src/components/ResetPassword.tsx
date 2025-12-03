import React, { useState } from "react";
import { Lock, Eye } from "lucide-react";
import logoImage from 'figma:asset/8e191f727b2ef8023e7e4984e9036f679c3d3038.png';
import { useNavigate } from "react-router-dom";
import { supabase } from "../createClient";

export function ResetPassword() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if(!password || !confirmPassword){
            alert("Please enter the Passwords");
            setLoading(false);
            return;
        }

        if(password != confirmPassword){
            alert("Passwords do not Match");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.updateUser({ password: password })

        if(!error){
            alert("The Password has been Updated");
        } else {
            alert("An Error on Our Side");
            console.error(error);
        }
        setLoading(false);
    }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#309898]/20 via-white to-[#FF8000]/20 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border-4 border-[#309898]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Vytara Logo" className="w-24 h-24" />
        </div>
        
        <h1 className="text-center text-[#309898] text-3xl font-bold mb-8">
          Reset Password
        </h1>

        <form className="space-y-6" onSubmit={handleReset}>
          {/* New Password Field */}
          <div>
            <label className="block text-[#309898] mb-2 font-medium">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none transition"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer hover:text-[#309898] transition" onClick={() => setShowPassword(!showPassword)}/>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[#309898] mb-2 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none transition"
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer hover:text-[#309898] transition" onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#309898] to-[#FF8000] text-white py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105 font-semibold mt-6"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="text-center mt-6">
            <button
              type="button"
              className="text-[#309898] hover:underline text-sm"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}