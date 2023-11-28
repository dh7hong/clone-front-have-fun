import React, { useEffect, useRef, useState } from "react";
import { store } from "../redux/config/configStore";
import { useDispatch } from "react-redux";
import { addImage } from "../redux/modules/ImageSlice";
import { useNavigate } from "react-router-dom";
import * as S from "../shared/style/MyPageStyle";
import { checkValidationFile } from "../util/ImageValidation";
import { Button } from "../components/button";

export default function MyPage() {
  const [isActive, setIsActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);

  // useEffect(() => {
  //   const image = localStorage.getItem("image")
  //   if(image) {
  //     dispatch
  //   }
  // })

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
  }
  return (
    <S.Wrapper>
      <S.MyPageWrapper>
        <S.TitleWrapper>
          <S.Title>My Page</S.Title>
        </S.TitleWrapper>
        <div>Profile image</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid black",
            }}
          >
            {isActive && (
              <img
                style={{ width: "100px", height: "100px" }}
                src={imageUrl}
                alt="엑박"
              />
            )}
          </div>
          <Button type="button" onClick={onClickImageBtn}>
            이미지 업로드
          </Button>
          <Button onClick={onClickSubmitBtn}>수정하기</Button>
        </div>
        <input
          style={{ display: "none" }}
          ref={ref}
          onChange={onChangeImage}
          type="file"
        />
      </S.MyPageWrapper>
    </S.Wrapper>
  );
}
