import React, { useState, useEffect } from "react";
import * as F from "../shared/style/FirstGridArea";
import * as S from "../shared/style/SecondGridArea";

const SecondGridArea = ({ children }) => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/users`
        );
        const data = await response.json();

        // Assuming there's only one user in the response data array
        if (data && data.data && data.data.length > 0) {
          const user = data.data[0];
          setNickname(user.nickname);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <F.LiName>
        <S.Container2>
          <S.Item3>
            <span
              style={{
                marginLeft: "20px",
                color: "#4682B4",
                fontSize: "20px",
              }}
            >
              {nickname ? `${nickname}의 미니홈피` : "Loading..."}
            </span>
            <S.Tab
              href="https://www.naver.com/"
              target="_blank"
              style={{ marginRight: "15px" }}
            >
              https://github.com/
            </S.Tab>
          </S.Item3>
          <S.Item4>{children}</S.Item4>
        </S.Container2>
      </F.LiName>
    </>
  );
};

export default SecondGridArea;
