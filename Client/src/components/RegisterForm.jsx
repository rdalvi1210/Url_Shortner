import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

const RegisterForm = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await registerUser(name, password, email);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-6 border border-[#EADAF4]"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#4B145B]">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label
            className="block text-[#4B145B] text-sm font-semibold mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className="shadow-sm appearance-none border border-[#EADAF4] rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#EADAF4] focus:border-[#4B145B]"
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-[#4B145B] text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow-sm appearance-none border border-[#EADAF4] rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#EADAF4] focus:border-[#4B145B]"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="block text-[#4B145B] text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow-sm appearance-none border border-[#EADAF4] rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#EADAF4] focus:border-[#4B145B]"
            id="password"
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            className={`w-full bg-[#4B145B] hover:bg-[#3A0D47] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        {/* Switch to Login */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => state(true)}
              className="text-[#4B145B] hover:underline cursor-pointer font-medium"
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
