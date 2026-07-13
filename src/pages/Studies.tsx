import PopupModal from "../components/PopupModal";
import { useAuth } from "../hooks/useAuth";

export default function Studies() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {!isAuthenticated && <PopupModal />}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Active Studies</h1>
      </header>
    </div>
  );
}
