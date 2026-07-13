import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GuestGuard from "./components/GuestGuard";
import AuthGuard from "./components/AuthGuard";
import Support from "./components/Support";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import Account from "./pages/account/Account";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import Survey from "./pages/survey/Survey";
import Studies from "./pages/Studies";
import { Content } from "./components/Content";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "forgot-password", element: <GuestGuard><ForgotPassword /></GuestGuard> },
      { path: "reset-password/:token", element: <GuestGuard><ResetPassword /></GuestGuard> },
      { path: "account", element: <AuthGuard><Account /></AuthGuard> },
      { path: "support", element: <Support /> },
      { path: "terms", element: <Terms /> },
      { path: "survey", element: <Survey /> },
      { path: "survey/:id", element: <Survey /> },
      { path: "studies", element: <Studies /> },
      { path: ":first/:second?/:third?", element: <Content /> },
    ],
  },
];

export default routes;
