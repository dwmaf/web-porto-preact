import { useState, useRef } from "preact/hooks";
import supabase from "../../supabaseClient";
import { Eye, EyeOff } from "feather-icons-react";
import "../app.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      localStorage.setItem('isPwaAdmin', 'true'); // Set status admin

      window.location.href = '/dashboard';
      console.log("User logged in:", user);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <body className="min-h-screen flex items-center justify-center bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="bg-slate-950 p-8 rounded-2xl max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-center text-blue-custom mb-6">
            Welcome Sir. Tricksyer
          </h2>
          <hr className="w-full border-t-1 border-teal-600 opacity-50 mb-6" />
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className=" text-sm text-teal-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 text-teal-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          
          <div className="mb-6">
            <label htmlFor="password" className=" text-sm text-teal-300 mb-2">
              Password
            </label>
            <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 text-teal-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
                type="button" // Penting agar tidak submit form
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-teal-300"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>          
          <button
            type="submit"
            className="w-full py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-900 outline-none cursor-pointer"
          >
            Login
          </button>
        </form>
      </body>
    </>
  );
}
