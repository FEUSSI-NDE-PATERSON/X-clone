import {
  Delete,
  DeleteForever,
  Image,
  MusicNote,
  VideoCall,
} from "@mui/icons-material";
import { Avatar, Box, Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TwitterFollowButton, TwitterTweetEmbed } from "react-twitter-embed";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { toast } from "react-toastify";
import { AuthContext } from "../utils/context/AuthContext";
import { Card } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "#1DcdF0",
  boxShadow: 24,
  p: 4,
};
function Mainbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const storage = getStorage();
  const [posts, setPost] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPost(postsData);
    };
    fetchPosts();
  }, [posts]);
  const handlerPost = (event) => {
    event.preventDefault();
    console.log("Uploaded files:");
    // You can add your upload logic here
  };
  const handlerChange = (event) => {
    console.log(currentUser);
    const file = event.target.files[0];
    console.log(`${message} File uploaded from: ${file.name}`);
    if (file.name.includes(".mp3")) {
      alert("music");
      const storageRef = ref(
        storage,
        `music/${currentUser.displayName}/${currentUser.uid}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              console.log("Music is paused");
              break;
            case "running":
              console.log("Music is running");
              break;
          }
        },
        (error) => {
          toast.error("Music not  Uploaded");
        },
        async () => {
          const downloadURL2 = await getDownloadURL(uploadTask.snapshot.ref);
          try {
            const docRef = await addDoc(collection(db, "posts"), {
              postMessage: message,
              user: currentUser.displayName,
              postMusic: downloadURL2,
              id: currentUser.id,
            });
            toast.success("Music uploaded");
          } catch (error) {
            toast.error(error);
          }
        }
      );
    }

    if (
      file.name.includes(".jpeg") ||
      file.name.includes(".jpg") ||
      file.name.includes(".png") ||
      file.name.includes(".gif") ||
      file.name.includes(".webp")
    ) {
      const storageRef = ref(
        storage,
        `images/${currentUser.displayName}/${currentUser.uid}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("image is paused");
              break;
            case "running":
              console.log("image is running");
              break;
          }
        },
        (error) => {
          toast.error("Image not posted");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          try {
            const docRef = await addDoc(collection(db, "posts"), {
              postMessage: message,
              user: currentUser.displayName,
              postMedia: downloadURL,
            });
            toast.success("Uploaded successfully");
          } catch (error) {
            toast.error(error);
          }
        }
      );
    }
    if (file.name.includes(".mp4")) {
      const storageRef = ref(
        storage,
        `Videos/${currentUser.displayName}/${currentUser.uid}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Video is paused");
              break;
            case "running":
              console.log("Video is running");
              break;
          }
        },
        (error) => {
          toast.error("Video not  Uploaded");
        },
        async () => {
          const downloadURL1 = await getDownloadURL(uploadTask.snapshot.ref);
          try {
            const docRef = await addDoc(collection(db, "posts"), {
              postMessage: message,
              user: currentUser.displayName,
              postVideo: downloadURL1,
            });
            toast.success("Video is running");
          } catch (error) {
            toast.error(error);
          }
        }
      );
    }
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    toast.success("Document deleted successfully");
  };

  return (
    <div className="text-white h-screen overflow-x-hidden  border-x-2 border-gray-500 flex-[1] p-4">
      <form onSubmit={handlerPost}>
        <div className="flex items-center">
          <Avatar />
          <div className="flex flex-col flex-1">
            <input
              className="ml-3 outline-none placeholder:text-[#72767B] bg-transparent flex-[0.8]  "
              placeholder="What is Happening"
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <p className=" ml-3  text-[#1D9BF0] text-sm border-gray-300 my-1 border-b-2 flex-1"></p>
          </div>
        </div>
        <div className="flex justify-evenly items-center">
          <label for="image">
            {" "}
            <Image />
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => handlerChange(e)}
            className="hidden"
            accept="image/*"
          />
          <label for="video">
            {""}
            <VideoCall />
          </label>
          <input
            type="file"
            id="video"
            className="hidden"
            accept="video/*"
            onChange={(e) => handlerChange(e)}
          />
          <label for="music">
            {""}
            <MusicNote />
          </label>
          <input
            type="file"
            id="music"
            className="hidden"
            accept="audio/*"
            onChange={(e) => handlerChange(e)}
          />

          <button
            className="text-white bg-[#1D9BF0] font-extrabold flex-[0.3] p-3 rounded-full  my-3"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
      <div>
        <h2>Recent Post</h2>
        <div>
          {posts.map((post) => (
            <Card key={post.postMessage} sx={{ flex: 1, mb: 2 }}>
              <CardHeader
                avatar={<Avatar src={post.postMedia} />}
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={(id) => handleDelete(post.id)}
                  >
                    <DeleteForever />
                  </IconButton>
                }
                title={post.user}
                subheader="Date Placeholder"
              />
              {post.postMedia && (
                <CardMedia
                  component="img"
                  height="150"
                  image={post.postMedia}
                  alt="Post Media"
                />
              )}
              {post.postMusic && (
                <ReactAudioPlayer src={post.postMusic} controls />
              )}
              {post.postVideo && (
                <ReactPlayer
                  url={post.postVideo}
                  playing={isVideoPlaying}
                  controls={true}
                  onMouseEnter={(id) => setIsVideoPlaying(true)}
                  onMouseLeave={(id) => setIsVideoPlaying(false)}
                  width="100%"
                  height="100%"
                />
              )}
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {post.postMessage}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="flex items-center">
              <Avatar />
              <div className="flex flex-col flex-1">
                <input
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                  className="ml-3 outline-none placeholder:text-[#72767B] bg-transparent flex-[0.8]  "
                  placeholder="What is Happening"
                />
                <p className=" ml-3  text-[#1D9BF0] text-sm border-gray-300 my-1 border-b-2 flex-1"></p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label for="image">
                {" "}
                <Image />
              </label>
              <input type="file" className="hidden" id="image" value={file} onChange={(e)=>setFile(e.target.files[0])}/>
              <button className="text-white bg-[#1D9BF0] font-extrabold flex-[0.3] p-3 rounded-full  my-3" >
                Post
              </button>
            </div>
          </div>
        </Box>
      </Modal> */}
    </div>
  );
}

export default Mainbar;
