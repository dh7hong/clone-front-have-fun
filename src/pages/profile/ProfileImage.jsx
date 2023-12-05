import React, { useEffect, useRef, useState } from "react";
import { store } from "../../redux/config/configStore";
import { useDispatch } from "react-redux";
import { addImage } from "../../redux/modules/imageSlice";



export default function ProfileImage() {
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [profileMessage, setProfileMessage] = useState("");

    


  return <div>ProfileImage</div>;
}
