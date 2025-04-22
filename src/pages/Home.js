import { Button, IconButton } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db, provider } from "../utils/firebase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { Image } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#c2c3c5",
  boxShadow: 24,
  p: 4,
};
function Home() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  // login states
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");

  const Google = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        console.log("success");
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      try {
        createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            toast.success("Account created");
          })
          .catch((error) => {
            toast.error(error.code);
          });

        const docRef = await addDoc(collection(db, "Users"), {
          name: name,
          password: password,
          email: email,
        });
        setEmail("");
        setName("");
        setPassword("");
      } catch (error) {
        toast.error("error");
      }
    } else {
      toast.error("Make Sure to Enter All the Values");
    }
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (email1 !== "" && password1 !== "") {
      signInWithEmailAndPassword(auth, email1, password1)
        .then((user) => {
          toast.success("Welcome Here");
          nav("/");
          setEmail1("");
          setPassword1("");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Provide all the input fields ");
    }
  };
  return (
    <div className="relative sm:static bg-black overflow-x-hidden flex h-screen items-center justify-evenly">
      <img
        src="../images/download.jpeg"
        alt="error"
        className="absolute top-2 h-16 w-16 sm:static left-2  sm:flex-[0.5] sm:h-96"
      />
      <div className="flex flex-col  w-[350px] ">
        <h2 className="text-[#E7E9EA] font-bold text-4xl sm:text-5xl">
          Happening now
        </h2>
        <p className="text-[#E7E9EA] font-bold text-lg mt-8 mb-2">Join today</p>
        <div className="flex flex-col">
          <button
            className="bg-[#fff] flex items-center w-[100%]  p-2 rounded-lg"
            onClick={Google}
          >
            <img
              src="../images/download1.jpeg"
              alt="error"
              className="w-6 h-6 rounded-lg "
            />
            <p className="text-[#9C9D9F] mx-2">Sign up with Google</p>
          </button>
          <button className="bg-[#fff] flex items-center w-[100%]  p-2 rounded-lg mt-2">
            <img
              src="../images/download2.jpeg"
              alt="error"
              className="w-6 h-6 rounded-lg"
            />
            <p className="text-[#9C9D9F] mx-2">Sign up with Apple</p>
          </button>
          <button
            className="bg-[#1D9BF0] text-white rounded-full p-3 w-[100%] my-3"
            onClick={handleOpen}
          >
            Create account
          </button>
          <p className="text-[#1A1B1C] text-lg text-wrap w-[100%] font-bold">
            By Signing up,you agree to the{" "}
            <span className="text-[#155C8F]">
              Terms of service and privacy Policy{" "}
            </span>
            ,including Cookie Use
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <button
            className="text-[#1D9BF0] mt-2 p-2 bg-transparent border-2 border-gray-400 rounded-full  w-[100%]"
            onClick={handleOpen1}
          >
            Sign in
          </button>
        </div>
      </div>
      {/* Sign Up modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src="../images/download.jpeg"
            className="h-16 w-16 text-center mx-auto my-3"
          />
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Create your account
          </Typography>
          <form className="grid gap-5 mt-2" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>
              {""}
              <Image />
            </label>
            
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-200    mx-auto p-2 rounded-full text-white"
            >
              <IconButton>Submit</IconButton>
            </button>
          </form>
        </Box>
      </Modal>
      {/* Sign in modal */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src="../images/download.jpeg"
            className="h-16 w-16 text-center mx-auto my-3"
          />
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Log to your account
          </Typography>
          <form className="grid gap-5 mt-2" onSubmit={handleSubmit1}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email1}
              type="email"
              onChange={(e) => setEmail1(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-200    mx-auto p-2 rounded-full text-white"
            >
              <IconButton>Submit</IconButton>
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
