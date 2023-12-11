import React, { useEffect, useRef, useState } from "react";
import { store } from "../../redux/config/configStore";
import { useDispatch } from "react-redux";
import { addImage } from "../../redux/modules/imageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { checkValidationFile } from "../../util/ImageValidation";
import { Button } from "../../components/button";
import Base from "../layout/Base";
import FirstGridArea from "../FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import ProfileFeeling from "./ProfileFeeling";
import * as F from "../../shared/style/FirstGridArea";
import * as S from "../../shared/style/SecondGridArea";
import { FlexJustAlignCenter } from "../../shared/style/Base";
import axios from "axios";
import { updateProfileMessage } from "../../api/profile";
import { updateOrCreateStatusMessage } from "../../redux/modules/profileSlice";
import { setStatusMessage } from "../../redux/modules/profileSlice";
import ProfileMessage from "./ProfileMessage";
import ProfileIntro from "./ProfileIntro";
import { ProfileImageStyle } from "../../shared/style/HeaderStyle";
import ProfileImage from "./ProfileImage";

export default function Profile() {
  
  return (
    <>
      <Base>
        <FirstGridArea />
        <SecondGridArea>
          <S.FlexBox>
            <div>
              <ProfileImage />
              <ProfileFeeling />
              <ProfileMessage />
            </div>
            <div style={{display: "flex", marginTop: "10vh", marginLeft: "10vw"}}>
            <ProfileIntro />
            </div>
          </S.FlexBox>
        </SecondGridArea>
      </Base>
    </>
  );
}
