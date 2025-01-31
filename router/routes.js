import express from "express";

import addAddress from "../controller/address/address.js";
import paymentController from "../controller/payment/index.js";
import { signup, login } from "../controller/custom-auth/index.js";
import {
  googleAuth,
  googleCallback,
  authStatus,
} from "../controller/google-auth/google-auth.js";
import getAddressDetails from "../controller/address/address-details.js";

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
routes.get("/get-address", getAddressDetails);

// payment routes
routes.post("/create-payment-intent", paymentController);

// Check if user is logged in
routes.get("/is-logged-in", (req, res) => {
  console.log("Session Check:", {
    session: req.session,
    sessionID: req.sessionID,
  });

  if (req.sessionID) {
    return res.json({
      isValid: true,
      user: req.session.userData,
    });
  } else {
    res.status(401).json({
      isValid: false,
      error: "Not authenticated",
    });
  }
});

routes.get("/about", (req, res) => {
  res.send("This is the about page");
});

routes.get("/contact", (req, res) => {
  res.send("This is the contact page");
});

export default routes;
