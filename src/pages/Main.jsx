import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Base from "./layout/Base";
import FirstGridArea from "./FirstGridArea";
import SecondGridArea from "./SecondGridArea";
import SpringGroup from "./layout/SpringGroup";
import CategoryGroup1 from "./layout/CategoryGroup1";
import {
  MiniroomImage,
  NewsBox,
  UpdateImage,
  UpdateNewsContent,
  UpdatedNews,
} from "../shared/style/Main";

export default function Main() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_AUTH_URL}/api/users`
      );
      console.log("API 응답 구조가 예상과 같습니다:", response.data)
      // API 응답이 예상대로 구조화되었는지 확인
      if (response.data) {
        console.log("API 응답 구조가 예상과 같습니다:", response.data)
        setUsers(response.data);
      } else {
        console.error("API 응답 구조가 예상과 다릅니다:", response.data);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Base>
        <FirstGridArea />
        <SecondGridArea>
          <UpdatedNews>UpdateUsers</UpdatedNews>
          <div>
            {users.slice(0, 4).map((user) => (
              <UpdateNewsContent
                key={user.memberId}
                onClick={() => navigate(`/api/users/${user.memberId}/posts`)}
              >
                <NewsBox>news</NewsBox>
                {user.name}'s 미니홈피
                <UpdateImage />
              </UpdateNewsContent>
            ))}
          </div>
          <UpdatedNews>Miniroom</UpdatedNews>
          <MiniroomImage />
          <span style={{ marginLeft: "15px" }}>▶미니룸 갯수 [1]</span>
          <span style={{ marginLeft: "15px" }}>▶미니미 갯수 [1]</span>
        </SecondGridArea>
      </Base>
      <CategoryGroup1 />
    </div>
  );
}
