import express from "express";
import { addDoctor , adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailibility } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);

adminRouter.post('/login' , loginAdmin)
adminRouter.post('/all-doctors' , authAdmin , allDoctors)
adminRouter.post('/change-availibility' , authAdmin , changeAvailibility)
adminRouter.get('/appointments', authAdmin , appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin , appointmentCancel)
adminRouter.post('/dashboard', authAdmin , adminDashboard)

export default adminRouter;
