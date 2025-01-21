import express from "express";

import addAddress from "../controller/address/address.js";
import paymentController from "../controller/payment/index.js";
import { signup, login } from "../controller/custom-auth/index.js";
import {
  googleAuth,
  googleCallback,
  authStatus,
  isAuthenticated,
} from "../controller/google-auth/google-auth.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello, From Server!");
});

// Custom auth routes
routes.post("/signup", signup);
routes.post("/login", login);

// Google auth routes
routes.get("/auth/google", googleAuth);
routes.get("/auth/status", authStatus);
routes.get("/auth/google/callback", googleCallback);

// Address routes
routes.post("/save-address", addAddress);

// payment routes
routes.post("/create-payment-intent", paymentController);

// Check if user is logged in
routes.get("/isLoggedIn", (req, res) => {
  // console.log("check", req.session.userData);
  if (req.session.userData) {
    return res.json({
      isValid: true,
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

routes.get("/about", (req, res) => {
  res.send("This is the about page");
});

routes.get("/contact", (req, res) => {
  res.send("This is the contact page");
});

export default routes;
