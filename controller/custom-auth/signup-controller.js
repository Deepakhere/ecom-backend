import UserModel from "../../models/user-custom-auth-schema/index.js";

const signup = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json("Email already exists");
      } else {
        UserModel.create({
          email: email,
          password: password,
        })
          .then((result) => {
            req.session.userData = {
              id: result._id,
              email: result.email,
            };

            res.json({
              isSuccess: true,
              message: "Account created",
            });
          })
          .catch((err) => {
            console.error("Error creating account:", err);
            res.status(500).json("Error creating account");
          });
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json("Error finding user");
    });
};

export default signup;
