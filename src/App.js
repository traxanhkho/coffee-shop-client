import "./styles/App.css";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Coffee from "./components/Coffee";
import Food from "./components/Food";
import Frostino from "./components/Frostino";
import Pastries from "./components/Pastries";
import Basket from "./pages/Basket";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentReceived from "./pages/PaymentReceived";
import AdminRouter from "./components/AdminRouter";
import { useEffect, useState } from "react";
// import Secure from './Secure'
import Dashboard from "./components/AdminDashboard";
import NotAuthorized from "./components/Unauthorized";
// import AdminRouter from "./components/AdminRouter";
import useStore from "./store";
import Products from "./pages/Dashboard/Products";
import ProductCreate from "./pages/Dashboard/Products/ProductCreate";
import axios from "axios";
import ProductEdit from "./pages/Dashboard/Products/ProductEdit";
import Orders from "./pages/Dashboard/Orders";
import OrderEdit from "./pages/Dashboard/Orders/OrderEdit";
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ user, redirectPath = "/not-auth", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  const getUserByAccessToken = useStore((store) => store.getUserByAccessToken);
  const authenticatedUser = useStore((store) => store.authenticatedUser);
  const setAuthenticatedUser = useStore((store) => store.setAuthenticatedUser);
  const logoutUrl = useStore((store) => store.logoutUrl);

  const getUser = async (access_token) => {
    const user = await getUserByAccessToken(access_token);
    setAuthenticatedUser(user.data);
  };

  useEffect(() => {
    if (authenticatedUser) return;

    const access_token = sessionStorage.getItem("access_token");

    if (access_token) {
      getUser(access_token);
    }
  }, [authenticatedUser]);

  const handleLogout = async () => {
    sessionStorage.removeItem("access_token");
    setAuthenticatedUser(null);

    try {
      axios.defaults.withCredentials = true;

      const logout = await axios.post(logoutUrl);
      console.log("Logout message: ", logout);
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <div className="App">
      <Header
        handleLogout={handleLogout}
        authenticatedUser={authenticatedUser}
      />

      <Routes>
        <Route
          path="/signup"
          element={
            authenticatedUser ? (
              <Navigate to="/" />
            ) : (
              <Signup setAuthenticatedUser={setAuthenticatedUser} />
            )
          }
        />
        <Route
          path="/login"
          element={
            authenticatedUser ? (
              <Navigate to="/" />
            ) : (
              <Login setAuthenticatedUser={setAuthenticatedUser} />
            )
          }
        />

        <Route path="/" exact element={<Home />}></Route>
        <Route path="/coffee" exact element={<Coffee />}></Route>
        <Route path="/food" exact element={<Food />}></Route>
        <Route path="/pastries" exact element={<Pastries />}></Route>
        <Route path="/frostino" exact element={<Frostino />}></Route>
        <Route
          path="/cart"
          element={<Basket authenticatedUser={authenticatedUser} />}
        ></Route>

        <Route path="/paymentReceived" element={<PaymentReceived />}></Route>

        {/* admin route start*/}

        <Route element={<ProtectedRoute user={authenticatedUser} />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* produc router start */}
          <Route
            path="/dashboard/products/create"
            element={<ProductCreate user={authenticatedUser} />}
          />
          <Route
            path="/dashboard/products/:productId/edit"
            element={<ProductEdit />}
          />
          <Route path="/dashboard/products" element={<Products />} />

          {/* product router end */}

          {/* order router start */}

          <Route
            path="/dashboard/orders/:orderId/edit"
            element={<OrderEdit />}
          />  

          <Route path="/dashboard/orders" element={<Orders />} />

          {/* order router end */}
        </Route>

        <Route path="/not-auth" element={<NotAuthorized />}></Route>

        <Route
          path="*"
          element={
            <p className="text-center text-3xl">There's nothing here: 404!</p>
          }
        />

        {/* admin routes end*/}
      </Routes>
      <a className="back-to-top-link" href="#top-of-the-page">
        Back to top
      </a>
      <Footer />
    </div>
  );
}

export default App;
