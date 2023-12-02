import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceTired, faVenus } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import SpringGroup from "./layout/SpringGroup";
import {
  Container1,
  FeelingSelectorBox,
  FontStyle,
  HelpLink,
  Item1,
  Item2,
  LiName,
  ProfileImg,
  StatusMessage,
} from "../shared/style/FirstGridArea";
import { useSelector } from "react-redux";
import { MyProfile, MyProfileImage } from "../shared/style/HeaderStyle";

const FirstGridArea = ({ feeling }) => {
  const imageArr = useSelector((state) => state.image.imageArr);
  const image = localStorage.getItem("image");
  return (
    <LiName>
      <Container1>
        <Item1>
          <div style={{ marginBottom: "20px" }}>
            Today <span style={{ color: "red" }}>25 </span>
            <span>| TOTAL 777</span>
          </div>
        </Item1>
        <Item2>
          <FontStyle>
            <div style={{ marginTop: "10px" }}>
              {imageArr && <ProfileImg src={imageArr} alt="엑박" />}
              {!imageArr && (
                <div>
                  {!image && <MyProfile alt="마이페이지" />}
                  {image && <MyProfileImage src={image} alt="마이페이지" />}
                </div>
              )}
            </div>
            {/* ↑ 경로를 수정해야할 곳 */}
            <FeelingSelectorBox style={{ fontSize: "16px" }}>
              <span style={{ color: "#2aacd3" }}>TODAY IS.. &nbsp;</span>
              <span>
                <FontAwesomeIcon icon={faFaceTired} fade /> 피곤함
                {/* {feeling()} */}
                {/* <FontAwesomeIcon icon={faFaceTired} fade /> 피곤함 */}
                {/* ↑ 경로를 수정해야할 곳 */}
              </span>
            </FeelingSelectorBox>
            <div>
              <StatusMessage style={{ color: "#2aacd3", fontSize: "25px" }}>
                {/* ↑ 경로를 수정해야할 곳 */}
              </StatusMessage>
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#436087",
                fontWeight: "7500",
                display: "flex",
              }}
            >
              싸이월드
              <div
                style={{
                  marginLeft: "5px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  color: "#E8B793",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3px",
                }}
              >
                <FontAwesomeIcon icon={faVenus} style={{ fontSize: "cover" }} />
              </div>
            </div>
            <div>
              <HelpLink href="https://support.spartacodingclub.kr/">
                cyhelp@cyworld.com
              </HelpLink>
            </div>
          </FontStyle>
        </Item2>
      </Container1>
      {/* <SpringGroup /> */}
    </LiName>
  );
};

export default FirstGridArea;
