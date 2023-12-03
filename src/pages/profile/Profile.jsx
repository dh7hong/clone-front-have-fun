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
import * as F from "../../shared/style/FirstGridArea";
import * as S from "../../shared/style/SecondGridArea";
import {
  faFaceAngry,
  faFaceFrown,
  faFaceGrinSquint,
  faFaceLaughBeam,
  faFaceMeh,
  faFaceSadTear,
  faFaceSmile,
  faFaceTired,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexJustAlignCenter } from "../../shared/style/Base";
import axios from "axios";
import { updateProfileMessage } from "../../api/profile";
import { updateOrCreateStatusMessage } from "../../redux/modules/profileSlice";

export default function Profile() {
  const [isActive, setIsActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const { memberId } = useParams();

  const modifySelfIntroduction = () => {
    // 여기에 수정 로직 작성
  };

  const handleFeelingChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFeeling(selectedValue);
  };

  const feeling = () => {
    switch (selectedFeeling) {
      case "즐거움":
        return (
          <>
            <FontAwesomeIcon icon={faFaceLaughBeam} bounce /> 즐거움
          </>
        );
      case "우울함":
        return (
          <>
            <FontAwesomeIcon icon={faFaceFrown} fade /> 우울함
          </>
        );
      case "피곤함":
        return (
          <>
            <FontAwesomeIcon icon={faFaceTired} fade /> 피곤함
          </>
        );
      case "화남":
        return (
          <>
            <FontAwesomeIcon icon={faFaceAngry} shake /> 화남
          </>
        );
      case "기쁨":
        return (
          <>
            <FontAwesomeIcon icon={faFaceGrinSquint} bounce /> 기쁨
          </>
        );
      case "슬픔":
        return (
          <>
            <FontAwesomeIcon icon={faFaceSadTear} fade /> 슬픔
          </>
        );
      default:
        return (
          <>
            <FontAwesomeIcon icon={faFaceMeh} fade /> 그냥 그래
          </>
        );
    }
  };

  const onChangeImage = (event) => {
    const file = event.target.files?.[0];
    if (!checkValidationFile(file)) {
      return;
      //  input 이벤트는 실행 됐으나, 실제 파일이 업로드가 되지 않은 경우  그대로 종료
    } else {
      // 그 외의 경우에는 필요한 기능들이 작동하도록 작성
      console.log("file", file);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        setImageUrl(fileReader.result);
      };
      setIsActive(true);
    }
  };
  const onClickImageBtn = () => {
    ref.current.click();
  };

  const onClickSubmitBtn = () => {
    localStorage.setItem("image", imageUrl);
    dispatch(addImage(imageUrl));
    alert("성공적으로 수정됐습니다");
    window.location.reload();
  };

  const onClickSubmitSelfIntroduction = () => {};

  const handleStatusChangeSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      updateOrCreateStatusMessage({
        message: profileMessage,
        memberId: memberId,
      })
    );

    const profileData = { memberId, profileMessage };
    console.log("profileData", profileData);
    await updateProfileMessage(profileMessage, memberId);

    setProfileMessage("");
  };

  return (
    <>
      <Base>
        <FirstGridArea feeling={feeling} />
        <SecondGridArea>
          <S.FlexBox>
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
                        width: "10vw",
                        height: "24vh",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      src={imageUrl}
                      alt="엑박"
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
              <F.FeelingSelectorBox style={{ marginLeft: "20px" }}>
                <span style={{ color: "#2aacd3" }}>TODAY IS.. &nbsp;</span>
                <span>
                  <select
                    id="feelingSelect"
                    name="feeling"
                    value={selectedFeeling}
                    onChange={handleFeelingChange}
                  >
                    <option value="">그냥 그래</option>
                    <option value="즐거움">즐거움</option>
                    <option value="우울함">우울함</option>
                    <option value="피곤함">피곤함</option>
                    <option value="화남">화남</option>
                    <option value="기쁨">기쁨</option>
                    <option value="슬픔">슬픔</option>
                  </select>
                  {/* ↑ 경로를 수정해야할 곳 */}
                </span>
              </F.FeelingSelectorBox>
              <form onSubmit={handleStatusChangeSubmit}>
                <S.StatusMessageTextarea
                  value={profileMessage}
                  onChange={(e) => setProfileMessage(e.target.value)}
                  style={{ fontSize: "25px", marginLeft: "20px" }}
                />
                <Button
                  type="submit"
                  style={{ marginTop: "10px", marginLeft: "60px" }}
                >
                  Status 수정
                </Button>
              </form>
            </div>
            <div
              style={{
                marginLeft: "30px",
                marginTop: "10px",
                width: "550px",
                height: "50px",
                border: "1px solid black",
                borderRadius: "20px",
                padding: "10px",
                fontSize: "40px",
                color: "deepskyblue",
                fontFamily: '"Hi Melody", sans-serif',
              }}
            >
              <FlexJustAlignCenter>자기소개</FlexJustAlignCenter>
              <textarea
                rows={15}
                cols={52}
                style={{
                  marginTop: "30px",
                  fontSize: "25px",
                  fontFamily: "'Hi Melody', sans-serif",
                }}
              />
              <FlexJustAlignCenter>
                <Button onClick={onClickSubmitSelfIntroduction}>
                  수정하기
                </Button>
              </FlexJustAlignCenter>
            </div>
          </S.FlexBox>
        </SecondGridArea>
      </Base>
    </>
  );
}
