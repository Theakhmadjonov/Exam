import bcrypt from "bcrypt";
import StaffModel from "../models/staffs.model.js";
import "dotenv/config";

const createSuperadmin = async (req, res, next) => {
  try {
    const username = process.env.USERNAME;
    const first_name = process.env.FIRST_NAME;
    const last_name = process.env.LAST_NAME;
    const role = process.env.ROLE;
    const password = process.env.PASSWORD;
    const position = process.env.POSITION;
    const phone = process.env.PHONE;
    const address = process.env.ADDRESS;
    const existingUser = await StaffModel.findOne({ username });
    if (existingUser) return;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    await StaffModel.create({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      role,
      position,
      phone,
      address,
    });
  } catch (error) {
    next(error);
  }
};

export default createSuperadmin;
