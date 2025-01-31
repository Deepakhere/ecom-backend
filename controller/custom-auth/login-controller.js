import UserModel from "../../models/user-custom-auth-schema/index.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        isSuccess: false,
        message: "Password Incorrect",
      });
    }

    // Set session data
    req.session.userData = {
      id: user._id,
      email: user.email,
    };

    // Wait for session to be saved
    await new Promise((resolve) => req.session.save(resolve));

    res.json({
      isSuccess: true,
      message: "Login Successful",
      access_token: req.sessionID,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
    });
  }
};

export default login;
