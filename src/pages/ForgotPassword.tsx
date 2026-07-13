import { Link, useNavigate } from "react-router-dom";
import { useUserForgotPasswordMutation } from "../services/auth.service";
import { useState } from "react";

export default function ForgotPassword() {
  const [forgotPassword] = useUserForgotPasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsError(false);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    try {
      const siteName = import.meta.env.VITE_SITE_NAME;
      await forgotPassword({
        email,
        ...(siteName && { siteName }),
      }).unwrap();
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch {
      setIsError(true);
    }
  };

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
        <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Enter your email to receive a reset link.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" type="email" name="email" placeholder="Email" maxLength={256} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
          </div>
          <button type="submit" className="w-full px-5 py-3 text-sm font-semibold rounded-lg text-white bg-orange-500 hover:bg-orange-600 shadow-sm transition-colors">Send reset link</button>
        </form>
        {isSuccess && <div className="mt-4 p-4 rounded-lg bg-orange-50 border border-orange-200"><p className="text-sm text-orange-800">We have sent a reset password link to your email.</p></div>}
        {isError && <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200"><p className="text-sm text-amber-800">Invalid user, please try with correct entry.</p></div>}
      </div>
      <p className="text-center mt-6 text-gray-600 text-sm"><Link to="/" className="text-orange-600 font-medium hover:text-orange-700">Back to Home</Link></p>
    </section>
  );
}
