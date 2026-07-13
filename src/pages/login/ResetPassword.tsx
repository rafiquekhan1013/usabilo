import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserResetPasswordMutation } from "../../services/auth.service";
import { useState, useEffect } from "react";

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [userResetPassword] = useUserResetPasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ password: "", cpassword: "" });

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsError(false);
    setError("");
    e.preventDefault();
    if (data.password !== data.cpassword) {
      setIsError(true);
      setError("Passwords do not match.");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    try {
      await userResetPassword({ token, password }).unwrap();
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err: unknown) {
      setIsError(true);
      setError((err as { data?: { message?: string } })?.data?.message ?? "Invalid link.");
    }
  };

  if (!token) return null;

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Reset</h1>
        <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Create a new password.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New password</label>
            <input id="password" type="password" name="password" placeholder="Password" maxLength={256} required onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
          </div>
          <div>
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
            <input id="cpassword" type="password" name="cpassword" placeholder="Confirm password" maxLength={256} required onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
          </div>
          <button type="submit" className="w-full px-5 py-3 text-sm font-semibold rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition-colors">Save</button>
        </form>
        {isSuccess && <div className="mt-4 p-4 rounded-lg bg-orange-50 border border-orange-200"><p className="text-sm text-orange-800">Password reset. You can log in with your new password.</p></div>}
        {isError && <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200"><p className="text-sm text-amber-800">{error}</p></div>}
      </div>
      <p className="text-center mt-6 text-sm"><Link to="/" className="text-orange-600 font-medium hover:text-orange-700">Back to Home</Link></p>
    </section>
  );
}
