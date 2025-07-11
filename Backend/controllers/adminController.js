import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


// API for adding new doctor --->>>
const addDoctor = async (req , res) => {
  try {

   const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
   const imageFile = req.file

   // check received data from frontend is it came here or not
   // console.log({ name, email, password, speciality, degree, experience, about, fees, address } , imageFile)

   // checking for all data to add a doctor ----

   if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({success:false , message:"Missing details"})
   }

   // validating email format
   if (!validator.isEmail(email)) {
      return res.json({success:false , message:"please enter a valid email"})
   }

   // validating strong password 
   if (password.length < 8) {
     return res.json({success:false , message:"please enter a strong password"})
   }

   // hasing doctor password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password , salt)

   // uploading image file to cloudinary by taking path of image from multer
   const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type : "image"})
   const imageUrl = imageUpload.secure_url

   // storing all data in database
   const doctorData = {
    name,
    email,
    image : imageUrl,
    password : hashedPassword,
    speciality,
    degree,
    experience,
    about,
    fees,
    address: JSON.parse(address),
    date:Date.now()
   }

   const neweDoctor = new doctorModel(doctorData)
   await neweDoctor.save()

   res.json({success : true , message : "Doctor added"})


  } catch (error) {
    console.log(error)
    res.json({success:false , message:error.message})
  }
};

// API for the admin Login --->>>
const loginAdmin = async (req , res) => {
    try {
       
        const {email , password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // matched so create a token
            const token = jwt.sign(email+password , process.env.JWT_SECRET)
            res.json({success:true , token})
        }
        else {
            res.json({success:false , message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req , res) => {
   try {
     
     const doctors = await doctorModel.find({}).select('-password')
     res.json({success : true , doctors})

   } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
   }
}

// API to get all appointments list
const appointmentsAdmin = async (req , res) => {
  try {
     
     const appointments = await appointmentModel.find({})
     res.json({success : true , appointments})

  } catch (error) {
     console.log(error)
     res.json({success:false , message:error.message})
  }
}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // Check if appointment exists
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Mark appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {};
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (time) => time !== slotTime
      );

      // Remove date if no slots left
      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate];
      }

      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data to admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    // Calculate total earnings only from completed and non-cancelled appointments
    const totalEarnings = appointments
      .filter((app) => app.iscompleted && !app.cancelled)
      .reduce((sum, app) => sum + (app.amount || 0), 0);

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      earning: totalEarnings, 
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { addDoctor , loginAdmin ,allDoctors , appointmentsAdmin, appointmentCancel, adminDashboard};
