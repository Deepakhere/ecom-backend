import AddressModel from "../../models/address-schema/address-schema.js";
import userCustomAuthSchema from "../../models/user-custom-auth-schema/custom-auth-schema.js";

const getAddressDetails = async (req, res) => {

  try {
    const storeUser = req.session.userData;
    console.log(req.session.userData);
    if (!storeUser) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await userCustomAuthSchema.findById(storeUser.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = await AddressModel.find({ user_id: storeUser.id });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error("Error fetching address data:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default getAddressDetails;
