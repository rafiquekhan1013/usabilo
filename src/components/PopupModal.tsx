import { useState } from "react";
import SignupComponent from "./SignupComponent";
import LoginComponent from "./LoginComponent";

interface PopupModalProps {
  code?: string;
}

export default function PopupModal({ code }: PopupModalProps) {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto p-8">
        {isSignup ? (
          <SignupComponent code={code} />
        ) : (
          <LoginComponent />
        )}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-orange-600 font-semibold hover:text-orange-500 ml-1"
                onClick={() => setIsSignup(false)}
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-orange-600 font-semibold hover:text-orange-500 ml-1"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
