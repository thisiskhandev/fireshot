import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

import { loadUserStart } from "./store/auth/auth.actions";

import { Navbar } from "./component/nav";
import { Footer } from "./component/Footer";

import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserStart());
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div>
          <Routes />
          <Footer />
        </div>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
