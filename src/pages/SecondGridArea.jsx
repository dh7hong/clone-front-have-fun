import React, { useState, useEffect } from "react";
import * as S from "../shared/style/SecondGridArea";
import axios from "axios";
import { userList } from "../api/userService";
const SecondGridArea = ({ children }) => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await userList();
        const data = response;
        console.log("API 응답 구조가 예상과 같습니다:", data);
        // Assuming there's only one user in the response data array
        for (let i = 0; i < data.length; i++) {
          if (data[i].memberId == localStorage.getItem("memberId")) {
            setNickname(data[i].nickname);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUsersData();
  }, []);

  return (
    <>
      <S.LiName>
        <S.Container2>
          <S.Item3>
            <span
              style={{
                marginLeft: "20px",
                color: "#4682B4",
                fontSize: "20px",
              }}
            >
              {nickname ? `${nickname}'s space` : "Loading..."}
            </span>
            <S.Tab
              href="https://github.com/dh7hong"
              target="_blank"
              style={{ marginRight: "10px" }}
            >
              My Github
            </S.Tab>
          </S.Item3>
          <S.Item4>{children}</S.Item4>
        </S.Container2>
      </S.LiName>
    </>
  );
};

export default SecondGridArea;
