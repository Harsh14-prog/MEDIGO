import express from 'express'
import { appointmentCancel, appointmentComplete, DoctorAppointments, doctorDashboard, doctorList , doctorProfile, loginDoctor, updateDoctorProfile , startVideoCall} from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'


const doctorRouter = express.Router()

doctorRouter.get('/list' , doctorList )
doctorRouter.post('/login' , loginDoctor)
doctorRouter.get('/appointments' , authDoctor , DoctorAppointments)
doctorRouter.post('/complete-appointment' , authDoctor , appointmentComplete)
doctorRouter.post('/cancel-appointment' , authDoctor , appointmentCancel)
doctorRouter.get('/dashboard' , authDoctor , doctorDashboard)
doctorRouter.get('/profile' , authDoctor , doctorProfile)
doctorRouter.post('/update-profile' , authDoctor , updateDoctorProfile)
doctorRouter.post('/start-call', authDoctor, startVideoCall);


export default doctorRouter ;