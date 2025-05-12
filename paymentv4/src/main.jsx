import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter, Routes, Route } from "react-router";
import PaymentSuccess from "./paymentsuccess.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/payment" element={<App />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
    </Routes>
  </BrowserRouter>
);