import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { AppContext } from "../context/AppContext";

import { FaUserMd, FaUser } from "react-icons/fa";
import {
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdCallEnd,
  MdTimer,
  MdVideoCall,
} from "react-icons/md";

const VideoCallRoom = () => {
  const { appointmentId } = useParams();
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  const [accessStatus, setAccessStatus] = useState("loading");
  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [role, setRole] = useState("");
  const [doctorName, setDoctorName] = useState("Doctor");
  const [userName, setUserName] = useState("User");

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const callIntervalRef = useRef(null);

  const ICE_SERVERS = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/user/verify-video-access/${appointmentId}`,
          {
            headers: { token },
          }
        );

        if (data.success) {
          setAccessStatus("granted");
          setRole(data.role);
          setDoctorName(data.doctorName);
          setUserName(data.userName);
        } else {
          setAccessStatus("denied");
          toast.error(data.message);
        }
      } catch (err) {
        setAccessStatus("denied");
      }
    };

    verifyAccess();
  }, [appointmentId, backendUrl, token]);

  useEffect(() => {
    if (accessStatus !== "granted") return;

    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    newSocket.emit("join-room", appointmentId);

    newSocket.on("receive-offer", async (offer) => {
      const pc = createPeerConnection(newSocket);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      newSocket.emit("send-answer", { roomId: appointmentId, answer });
      setPeerConnection(pc);
    });

    newSocket.on("receive-answer", async (answer) => {
      await peerConnection?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    newSocket.on("receive-ice-candidate", async (candidate) => {
      await peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => newSocket.disconnect();
  }, [accessStatus]);

  const createPeerConnection = (socket) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("send-ice-candidate", {
          roomId: appointmentId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      });

    return pc;
  };

  const handleCallStart = async () => {
    setCallStarted(true);
    const pc = createPeerConnection(socket);
    setPeerConnection(pc);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("send-offer", { roomId: appointmentId, offer });
    callIntervalRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const handleEndCall = () => {
    if (peerConnection) peerConnection.close();
    if (callIntervalRef.current) clearInterval(callIntervalRef.current);
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setCallEnded(true);
    setCallStarted(false);
  };

  const toggleMic = () => {
    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMicOn(track.enabled);
    });
  };

  const toggleCamera = () => {
    localStreamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsCamOn(track.enabled);
    });
  };

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (accessStatus === "loading")
    return <div className="text-white text-center mt-10">Loading...</div>;
  if (accessStatus === "denied")
    return <div className="text-red-500 text-center mt-10">Access Denied</div>;

  if (callEnded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4"> Call Ended</h1>
        <p className="text-lg mb-2">
          Duration:{" "}
          <span className="text-green-400">{formatDuration(callDuration)}</span>
        </p>
        <p className="text-gray-400 mb-8">
          Thank you for using Medigo Video Call
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Secure Video Call Room
      </h2>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl justify-center items-center">
        <div className="relative w-full max-w-[90vw] h-[56vw] sm:h-[240px] md:h-[360px]">
          <div className="absolute top-2 left-2 z-10 px-3 py-1 text-xs rounded-full bg-[#111827] text-white font-medium flex items-center gap-2 shadow-md">
            {role === "doctor" ? <FaUserMd size={14} /> : <FaUser size={14} />}
            {role === "doctor" ? doctorName : userName} (You)
            {isMicOn ? <MdMic size={14} /> : <MdMicOff size={14} />}
            {isCamOn ? <MdVideocam size={14} /> : <MdVideocamOff size={14} />}
          </div>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-full rounded-xl border-4 border-blue-500 shadow-lg object-cover"
          />
        </div>

        <div className="relative w-full max-w-[90vw] h-[56vw] sm:h-[240px] md:h-[360px]">
          <div className="absolute top-2 left-2 z-10 px-3 py-1 text-xs rounded-full bg-[#111827] text-white font-medium flex items-center gap-2 shadow-md">
            {role === "doctor" ? <FaUser size={14} /> : <FaUserMd size={14} />}
            {role === "doctor" ? userName : doctorName} (
            {role === "doctor" ? "User" : "Doctor"})
            <MdMic size={14} />
            <MdVideocam size={14} />
          </div>
          <video
            ref={remoteVideoRef}
            autoPlay
            className="w-full h-full rounded-xl border-4 border-green-500 shadow-lg object-cover"
          />
        </div>
      </div>

      {callStarted && !remoteVideoRef.current?.srcObject && (
        <div className="mt-4 text-gray-300 text-sm italic">
          {role === "doctor"
            ? `Waiting for ${userName} to join...`
            : `Waiting for ${doctorName} to join...`}
        </div>
      )}

      {callStarted && (
        <div className="text-green-400 font-semibold text-lg mt-4 flex items-center gap-2">
          <MdTimer size={20} />
          {formatDuration(callDuration)} (Live)
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {!callStarted ? (
          <button
            onClick={handleCallStart}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
          >
            <MdVideoCall size={20} />
            Start Call
          </button>
        ) : (
          <>
            <button
              onClick={toggleMic}
              className="flex items-center gap-2 px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-sm"
            >
              {isMicOn ? <MdMicOff size={16} /> : <MdMic size={16} />}
              {isMicOn ? "Mute" : "Unmute"}
            </button>

            <button
              onClick={toggleCamera}
              className="flex items-center gap-2 px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-sm"
            >
              {isCamOn ? <MdVideocamOff size={16} /> : <MdVideocam size={16} />}
              {isCamOn ? "Stop Video" : "Start Video"}
            </button>

            <button
              onClick={handleEndCall}
              className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-semibold"
            >
              <MdCallEnd size={18} />
              End Call
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCallRoom;
