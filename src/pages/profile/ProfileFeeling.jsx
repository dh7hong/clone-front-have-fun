import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexJustAlignCenter } from "../../shared/style/Base";
import * as F from "../../shared/style/FirstGridArea";
import * as S from "../../shared/style/SecondGridArea";
import Base from "../layout/Base";
import FirstGridArea from "../FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import feelingIcon from "./ProfileFeelingIcon";
import { setFeeling } from "../../redux/modules/feelingSlice";
import { useDispatch } from "react-redux";
import { Button } from "../../components/button";
import axios from "axios";
import { updateProfileFeeling } from "../../api/profile";

export default function ProfileFeeling() {
  const [currentFeeling, setCurrentFeeling] = useState("");
  const dispatch = useDispatch();
  const memberId = localStorage.getItem("memberId");

  const handleFeelingChange = (event) => {
    setCurrentFeeling(event.target.value);
  };

  const handleSaveFeeling = async (e) => {
    e.preventDefault();
    dispatch(setFeeling({ memberId, feeling: currentFeeling }));

    
      // await axios.post(
      //   `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/feeling`,
      //   { feeling: currentFeeling }
      // );
      
      await updateProfileFeeling(currentFeeling, memberId);

      console.log("feeling stored: ", currentFeeling);

  };

  return (
    <div>
      <F.FeelingSelectorBox style={{ marginLeft: "20px" }}>
        <span style={{ color: "#2aacd3" }}>TODAY IS.. &nbsp;</span>
        <span>
          <select
            id="feelingSelect"
            name="feeling"
            value={currentFeeling}
            onChange={(handleFeelingChange)}
          >
            <option value="그냥 그래">그냥 그래</option>
            <option value="즐거움">즐거움</option>
            <option value="우울함">우울함</option>
            <option value="피곤함">피곤함</option>
            <option value="화남">화남</option>
            <option value="기쁨">기쁨</option>
            <option value="슬픔">슬픔</option>
          </select>
        </span>
      </F.FeelingSelectorBox>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={handleSaveFeeling}>Save Feeling</Button>
      </div>
    </div>
  );
}
