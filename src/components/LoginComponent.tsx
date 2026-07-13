import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUserLoginMutation } from "../services/auth.service";
import { storageService } from "../services/storage.service";
import { generateFingerprint } from "../utils/fingerprint";

export default function LoginComponent() {
  const location = useLocation();
  const [userLogin] = useUserLoginMutation();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsError(false);
    setError("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const siteName = import.meta.env.VITE_SITE_NAME;
      const fingerprint = await generateFingerprint().catch(() => undefined);
      const resp = await userLogin({
        email,
        password,
        ...(siteName && { siteName }),
        ...(fingerprint && { fingerprint }),
      }).unwrap();
      const baSlug =
        (resp.data as { clientBa?: { slug?: string } })?.clientBa?.slug ??
        "studies";
      const accessToken = resp.Authorization;
      if (accessToken) storageService.setAccessToken(accessToken);
      if (baSlug !== "studies") storageService.setBaSlug(baSlug);

      if (location.pathname === "/login") {
        setTimeout(() => navigate(`/${baSlug}`), 3000);
      } else if (location.pathname === "/studies") {
        window.location.href = `${window.location.origin}/${baSlug}`;
      } else {
        if(location.pathname === "/survey") {
          window.location.reload();
        }else{
          window.location.href = `${window.location.origin}/${baSlug}`;
        }
        
      }
    } catch (e: unknown) {
      const err = e as { data?: { message?: string } };
      setError(err?.data?.message ?? "Login failed. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Log In</h1>
          <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Login to explore</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              maxLength={256}
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              maxLength={256}
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value="Log In"
              className="w-full px-5 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            />
          </div>
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-orange-600 hover:text-orange-500"
            >
              Forgot password?
            </Link>
          </div>
        </form>
        {isError && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
