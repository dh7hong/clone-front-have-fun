import React, { useEffect, useRef, useState } from "react";
import { store } from "../../redux/config/configStore";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import * as S from "../../shared/style/SecondGridArea";
import { updateProfileMessage } from "../../api/profile";
import { updateOrCreateStatusMessage } from "../../redux/modules/profileSlice";
import { setStatusMessage } from "../../redux/modules/profileSlice";

export default function ProfileMessage() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [profileMessage, setProfileMessage] = useState("");
  const { memberId } = useParams();

  const handleStatusChangeSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      updateOrCreateStatusMessage({
        message: profileMessage,
        memberId: memberId,
      })
    );

    dispatch(
      setStatusMessage({
        memberId,
        message: profileMessage,
      })
    );

    const profileData = { memberId, profileMessage };
    console.log("profileData", profileData);
    await updateProfileMessage(profileMessage, memberId);

    setProfileMessage("");
  };

  return (
    <div
      style={{
        marginTop: "20px",
        fontSize: "20px",
        color: "#436087",
        fontWeight: "7500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleStatusChangeSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <S.StatusMessageTextarea
          value={profileMessage}
          onChange={(e) => setProfileMessage(e.target.value)}
          style={{ fontSize: "25px" }}
        />
        <Button type="submit" style={{ marginTop: "10px" }}>
          Save Status
        </Button>
      </form>
    </div>
  );
}
