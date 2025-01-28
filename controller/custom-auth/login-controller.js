import UserModel from "../../models/user-custom-auth-schema/index.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user) {
    if (user.password === password) {
      req.session.userData = {
        id: user._id,
        email: user.email,
      };

      console.log("Session Data Set:", req.session.userData);
      res.json({ isSuccess: true, message: "Login Successful", user });
    } else {
      res.json({ isSuccess: false, message: "Password Incorrect" });
    }
  } else {
    res.json({
      isSuccess: false,
      message: "User not found",
    });
  }
};

export default login;
