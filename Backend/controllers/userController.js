import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user-profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // from authUser middleware

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user-profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body; // userId from middleware
    const imageFile = req.file; // see console log of imageFile we can see object inside it path is there from multer

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    let parsedAddress = {};
    if (address) {
      try {
        parsedAddress = JSON.parse(address);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid address format" });
      }
    }

    // update the fields in db which are already saved
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const  docData  = await doctorModel.findById(docId).select("-password");

    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // if doctor is not available
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // if doctor available , check is it available at selected slot
    let slots_booked = docData.slots_booked; // (slots_booked is an obj , it contains slotDate as key and in value array of times of that data)

    // checking for slot availibility ,
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        // selected time ya date chya array madhe aahe ka te check
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime); // pushed our selected time in array of times available on this date
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // const slots_booked = {
    //   "2025-06-04": ["09:00 AM", "10:00 AM"],
    //   "2025-06-05": ["10:00 AM"],
    // };

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save(); // Await to ensure it's saved before responding

    // Save updated slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
    
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };
