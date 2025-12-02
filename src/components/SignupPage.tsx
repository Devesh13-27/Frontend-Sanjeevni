import { useState } from 'react';
import logoImage from 'figma:asset/8e191f727b2ef8023e7e4984e9036f679c3d3038.png';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#309898]/10 via-white to-[#FF8000]/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#309898]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FF8000]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#309898] to-[#FF8000]"></div>
          
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <img src={logoImage} alt="Vytara Logo" className="h-24 w-24 object-contain" />
            </div>
            
            <h1 className="text-center text-[#309898] mb-2">Vytara</h1>
            <p className="text-center text-gray-600 mb-6">Create Your Account</p>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#309898] focus:outline-none transition-colors"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#309898] focus:outline-none transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#309898] focus:outline-none transition-colors"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#309898] focus:outline-none transition-colors"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF8000] to-[#FF8000]/90 text-white py-3 rounded-xl hover:shadow-lg transition-all"
              >
                Sign Up
              </button>

              <div className="text-center mt-4">
                <p className="text-gray-600 mb-2">Already have an account?</p>
                <a href="/login" className="text-[#309898] hover:underline font-medium">
                  Login here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
