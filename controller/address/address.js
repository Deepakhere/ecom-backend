import AddressModel from "../../models/address-schema/address-schema.js";

const addAddress = async (req, res) => {
  try {
    const {
      name,
      mobile,
      pincode,
      address,
      city,
      state,
      locality,
      addressType,
    } = req.body;

    if (!req.session.userData) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.session.userData;
    const newAddress = new AddressModel({
      user_id: id,
      name: name,
      number: mobile,
      pincode: pincode,
      address: address,
      city: city,
      state: state,
      locality: locality,
      addressType: addressType,
    });
    await newAddress.save();
    res.json({ isSuccess: true, message: "Address added successfully" });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ isSuccess: false, error: "Error adding address" });
  }
};

export default addAddress;
