import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserSignupMutation } from "../services/auth.service";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { storageService } from "../services/storage.service";
import { generateFingerprint } from "../utils/fingerprint";
import "react-day-picker/dist/style.css";

interface SignupComponentProps {
  code?: string;
}

const getSiteDisplayName = () => {
  const site = (import.meta.env.VITE_SITE_NAME || "").split(".")[0] || "";
  return site ? site.charAt(0).toUpperCase() + site.slice(1).toLowerCase() : "";
};

/** Parse `YYYY-MM-DD` as a local calendar date (no UTC shift). */
const parseLocalYmd = (raw: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(y, mo - 1, d);
  if (
    dt.getFullYear() !== y ||
    dt.getMonth() !== mo - 1 ||
    dt.getDate() !== d
  ) {
    return null;
  }
  return dt;
};

const formatYmd = (date: Date): string => {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const da = String(date.getDate()).padStart(2, "0");
  return `${y}-${mo}-${da}`;
};

const formatDdMmYyyy = (date: Date): string => {
  const da = String(date.getDate()).padStart(2, "0");
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${da}-${mo}-${y}`;
};

const normalizeBirthdayForApi = (rawValue: string): string | null => {
  if (!rawValue) return null;
  const parsed = parseLocalYmd(rawValue);
  return parsed ? formatYmd(parsed) : null;
};

function getSignupErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (error && typeof error === "object") {
    const o = error as Record<string, unknown>;
    if ("status" in o) {
      const data = o.data;
      if (
        data &&
        typeof data === "object" &&
        typeof (data as { message?: unknown }).message === "string"
      ) {
        const m = (data as { message: string }).message;
        if (m) return m;
      }
      if(data && typeof data === "object" && "message" in data) {
        return (data as { message: string }).message;
       }
      if (typeof o.error === "string" && o.error) return o.error;
    }
    if (typeof o.message === "string" && o.message) {
      return o.message;
    }
  }
  return "Something went wrong. Please try again.";
}

export default function SignupComponent({ code }: SignupComponentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userSignup] = useUserSignupMutation();
  const [baSlug, setBaSlug] = useState("studies");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [data, setData] = useState({ password: "", cpassword: "" });
  const [birthday, setBirthday] = useState("");
  const [isBirthdayPickerOpen, setIsBirthdayPickerOpen] = useState(false);
  const birthdayPickerRef = useRef<HTMLDivElement | null>(null);
  const [step1, setStep1] = useState<"block" | "none">("block");
  const siteDisplayName = getSiteDisplayName();

  useEffect(() => {
    setReferralCode(code ?? "");
  }, [code]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        birthdayPickerRef.current &&
        !birthdayPickerRef.current.contains(event.target as Node)
      ) {
        setIsBirthdayPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isAtLeastAge = (dob: string | null, minAge: number): boolean => {
    if (!dob) return false;
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return false;
    const now = new Date();
    if (birth.getTime() > now.getTime()) return false;
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age >= minAge;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsError(false);
    setError("");
    e.preventDefault();
    if (!birthday) {
      setIsError(true);
      setError("Please select your date of birth.");
      return;
    }
    if (!isAtLeastAge(birthday, 19)) {
      setIsError(true);
      setError("You must be at least 19 years old to sign up.");
      return;
    }
    if (data.password !== data.cpassword) {
      setIsError(true);
      setError("Passwords do not match.");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    const {
      first_name,
      last_name,
      email,
      password,
      contactNumber,
      refferByCode,
      refferBy,
      birthday: birthdayInput,
      address,
    } = formValues;
    const normalizedBirthday = normalizeBirthdayForApi(
      String(birthdayInput ?? birthday)
    );
    if (!normalizedBirthday) {
      setSubmitting(false);
      setIsError(true);
      setError("Please select a valid date of birth.");
      return;
    }
    try {
      const siteName = import.meta.env.VITE_SITE_NAME;
      if (!siteName) {
        throw new Error(
          "Missing VITE_SITE_NAME in environment. Add it to .env and restart the dev server."
        );
      }
      const fingerprint = await generateFingerprint().catch(() => undefined);
      const resp = await userSignup({
        first_name,
        last_name,
        email,
        password,
        contactNumber,
        refferByCode,
        ...(refferBy ? { refferBy } : {}),
        siteName,
        birthday: normalizedBirthday,
        address,
        ...(fingerprint && { fingerprint }),
      }).unwrap();
      const accessToken = resp.Authorization;
      const slug = (resp.data as { baSlug?: string })?.baSlug ?? "studies";
      if (accessToken) storageService.setAccessToken(accessToken);
      if (slug !== "studies") storageService.setBaSlug(slug);
      setBaSlug(slug);
      setStep1("none");
    } catch (err: unknown) {
      setSubmitting(false);
      setIsError(true);
      setError(getSignupErrorMessage(err));
    }
  };

  const handleFinalStep = () => {
    setIsSuccess(true);
    if (location.pathname === "/sign-up") {
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
  };

  const inputCls =
    "w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all";
  const btnCls =
    "w-full px-5 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-70";

  const maxBirthday = new Date();
  const displayBirthday = (() => {
    if (!birthday) return "";
    const d = parseLocalYmd(birthday);
    return d ? formatDdMmYyyy(d) : "";
  })();

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-8">
        <div style={{ display: step1 === "block" ? "block" : "none" }}>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Step 1: Create Your Profile
            </h1>
            <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto mb-4" />
            <p className="text-sm text-gray-600">
              You’re almost in. Just a few quick details to create your{" "}
              {siteDisplayName} Insights Member profile
            </p>
          </div>
        </div>
        <div style={{ display: step1 === "block" ? "none" : "block" }}>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Step 2: RealUser Informed Participation Consent
            </h1>
            <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto mb-4" />
            <p className="text-sm text-gray-600">
              Before participating in any RealUser Market Research studies, we
              need to confirm that you understand what {siteDisplayName} is —
              and what your role is as a research participant.
            </p>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="space-y-4"
            style={{ display: step1 === "block" ? "block" : "none" }}
          >
            <input
              type="text"
              className={inputCls}
              maxLength={256}
              name="first_name"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              className={inputCls}
              maxLength={256}
              name="last_name"
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              className={inputCls}
              maxLength={256}
              name="email"
              placeholder="Email (used to receive E-Transfers)"
              required
            />
            <div>
              <div className="relative" ref={birthdayPickerRef}>
                <input
                  type="text"
                  readOnly
                  value={displayBirthday}
                  placeholder="Date of Birth"
                  className={`${inputCls} cursor-pointer`}
                  onClick={() => setIsBirthdayPickerOpen((prev) => !prev)}
                  onFocus={() => setIsBirthdayPickerOpen(true)}
                  aria-label="Select date of birth"
                  autoComplete="bday"
                />
                <input type="hidden" name="birthday" value={birthday} />
                {isBirthdayPickerOpen && (
                  <div className="absolute z-50 mt-2 rounded-xl border-2 border-gray-200 bg-white p-2 shadow-lg">
                    <DayPicker
                      mode="single"
                      selected={
                        birthday
                          ? (parseLocalYmd(birthday) ?? undefined)
                          : undefined
                      }
                      onSelect={(date) => {
                        if (!date) return;
                        setBirthday(formatYmd(date));
                        setIsBirthdayPickerOpen(false);
                      }}
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={maxBirthday.getFullYear()}
                      disabled={{ after: maxBirthday }}
                    />
                  </div>
                )}
              </div>
            </div>

            <input
              type="text"
              className={inputCls}
              maxLength={500}
              name="address"
              placeholder="Address"
              required
            />
            <input
              type="tel"
              className={inputCls}
              maxLength={10}
              minLength={10}
              name="contactNumber"
              placeholder="Phone Number"
              required
            />
            <input
              type="password"
              className={inputCls}
              maxLength={256}
              name="password"
              placeholder="Password"
              minLength={6}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              className={inputCls}
              minLength={6}
              maxLength={256}
              name="cpassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              required
            />
            {error && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
                {error}
              </div>
            )}
            <input
              type="text"
              className={inputCls}
              maxLength={256}
              name="refferByCode"
              placeholder="Brand Ambassador Referral Code"
              defaultValue={referralCode}
              required
            />
            <input type="hidden" name="refferBy" value="" />
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                readOnly
                id="terms-age"
                name="terms"
                checked
                required
                className="mt-1 h-4 w-4 shrink-0 accent-orange-600"
              />
              <label htmlFor="terms-age" className="text-sm text-gray-600">
                I confirm that I am 19 years of age or older and reside in a
                permitted region.
              </label>
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                readOnly
                id="terms-policy"
                name="terms2"
                checked
                required
                className="mt-1 h-4 w-4 shrink-0 accent-orange-600"
              />
              <label htmlFor="terms-policy" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  to="/support"
                  className="text-orange-600 font-medium hover:text-orange-500"
                >
                  Terms
                </Link>
              </label>
            </div>
            <input
              type="submit"
              value={!submitting ? "Continue" : "Please wait"}
              disabled={submitting}
              className={btnCls}
            />
          </div>
          <div
            className="space-y-4"
            style={{ display: step1 === "block" ? "none" : "block" }}
          >
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600 leading-relaxed">
              <li>You are participating in market research.</li>
              <li>Participation is optional.</li>
              <li>
                Your insights help improve clarity and responsible gambling
                tools.
              </li>
              <li>
                Your personal information is not shared with operators or third
                parties.
              </li>
            </ul>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                readOnly
                id="consent"
                name="terms3"
                checked
                required
                className="mt-1 h-4 w-4 shrink-0 accent-orange-600"
              />
              <span className="text-sm text-gray-600">
                I confirm I have read and understand the RealUser Informed
                Participation Consent, and agree to participate as a{" "}
                {siteDisplayName} Insights Member
              </span>
            </label>
            <button
              type="button"
              onClick={handleFinalStep}
              className="w-full px-5 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Continue to Studies
            </button>
          </div>
        </form>
        {isSuccess && (
          <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
            <p className="text-sm text-orange-800">
              Thank you! Your submission was successful. Redirecting…
            </p>
          </div>
        )}
        {isError && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
