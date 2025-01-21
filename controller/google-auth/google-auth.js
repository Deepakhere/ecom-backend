import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import UserAuthModel from "../../models/user-google-auth-schema/index.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserAuthModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserAuthModel.findOne({ googleId: profile.id });

        if (user) {
          console.log("Existing user logged in:", user);
          return done(null, user);
        } else {
          const newUser = new UserAuthModel({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            profilePicture: profile.photos?.[0]?.value,
            createdAt: new Date(),
            lastLogin: new Date(),
          });

          // Save new user
          user = await newUser.save();
          console.log("New user created:", user);
          return done(null, user);
        }
      } catch (error) {
        console.error("Error in Google authentication:", error);
        return done(error, null);
      }
    }
  )
);

const googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res, next);
};

const googleCallback = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "https://deepakhere.github.io/Ecom/pages/login.html",
    successRedirect: "https://deepakhere.github.io/Ecom/index.html",
    session: true,
  })(req, res, next);
};

const authStatus = (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user,
  });
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

export { googleAuth, googleCallback, authStatus, isAuthenticated };
