import passport from "passport";
import { Strategy as InstagramStrategy } from "passport-instagram";

passport.use(
  new InstagramStrategy(
    {
      clientID: "YOUR_INSTAGRAM_CLIENT_ID",
      clientSecret: "YOUR_INSTAGRAM_CLIENT_SECRET",
      callbackURL: "/auth/instagram/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

app.get("/auth/instagram", passport.authenticate("instagram"));

app.get(
  "/auth/instagram/callback",
  passport.authenticate("instagram", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
