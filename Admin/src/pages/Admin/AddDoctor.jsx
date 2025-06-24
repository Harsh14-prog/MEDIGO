import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FiUser, FiMail, FiKey, FiMapPin, FiBookOpen } from "react-icons/fi";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!docImg) return toast.error("Image not selected");

    const formData = new FormData();
    formData.append("image", docImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("fees", fees);
    formData.append("about", about);
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🩺 Add New Doctor</h2>

      {/* Profile Image Upload */}
      <div className="flex items-center gap-6 mb-8">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            className="w-24 h-24 object-cover rounded-full border shadow-sm hover:scale-105 transition"
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="upload"
          />
        </label>
        <input
          onChange={(e) => setDocImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        <p className="text-gray-500 text-sm">Upload doctor's profile photo</p>
      </div>

      {/* Sectioned Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* Left Side */}
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-medium flex items-center gap-2">
              <FiUser /> Doctor Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Dr. Sneha Patel"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium flex items-center gap-2">
              <FiMail /> Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="doctor@email.com"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium flex items-center gap-2">
              <FiKey /> Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium">Experience</span>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border px-3 py-2 rounded-md"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i}>{i + 1} Year</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium">Fees (₹)</span>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="border px-3 py-2 rounded-md"
              placeholder="500"
              required
            />
          </label>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-medium">Speciality</span>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="border px-3 py-2 rounded-md"
            >
              <option>General Physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium flex items-center gap-2">
              <FiBookOpen /> Degree / Education
            </span>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="border px-3 py-2 rounded-md"
              placeholder="MBBS, MD"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium flex items-center gap-2">
              <FiMapPin /> Address Line 1
            </span>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="border px-3 py-2 rounded-md"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium">Address Line 2</span>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="border px-3 py-2 rounded-md"
              required
            />
          </label>
        </div>
      </div>

      {/* About Textarea */}
      <div className="mt-6">
        <label className="font-medium">About Doctor</label>
        <textarea
          rows="4"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          placeholder="Share brief about experience, specialization, certifications etc."
          required
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
