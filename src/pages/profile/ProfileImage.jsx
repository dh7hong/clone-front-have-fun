import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addImage } from "../../redux/modules/imageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { checkValidationFile } from "../../util/ImageValidation";
import { Button } from "../../components/button";
import * as F from "../../shared/style/FirstGridArea";
import axios from "axios";


export default function ProfileImage() {
  const [isActive, setIsActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(""); // Base64 encoded string for preview
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const memberId = localStorage.getItem("memberId");

  const onChangeImage = (event) => {
    const file = event.target.files?.[0];
    if (!checkValidationFile(file)) {
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        setPreviewImage(fileReader.result); // For preview
      };
      setIsActive(true);
      setFile(file); // Store the file object for uploading
    }
  };
  const onClickImageBtn = () => {
    ref.current.click();
  };

  const onClickSubmitBtn = async () => {
    const formData = new FormData();
    formData.append("profileImage", file); // Use the file object
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/profileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully", response.data);
      localStorage.setItem("image", response.data.imageUrl); // Store the URL returned by the server
      dispatch(addImage({memberId, imageUrl: response.data.imageUrl})); // Update Redux store
      alert("Profile image updated successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to update profile image");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <F.ProfileImg
          style={{
            marginLeft: "",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isActive && (
            <img
              style={{
                width: "7vw",
                height: "15vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              src={previewImage}
              alt=""
            />
          )}
        </F.ProfileImg>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Button onClick={onClickImageBtn}>image select</Button>
        <Button onClick={onClickSubmitBtn}>upload</Button>
        <input
          style={{ display: "none" }}
          ref={ref}
          onChange={onChangeImage}
          type="file"
        />
      </div>
    </div>
  );
}
