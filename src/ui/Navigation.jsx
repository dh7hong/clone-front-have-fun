import React from "react";
import * as S from "../shared/style/NavigationStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



export default function Navigation() {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");

  const NAVIGATION_BAR = [
  
    { name: "Main", navigate: `/api/users`},
    { name: "Profile", navigate: `/api/users/${memberId}/profile` },
    { name: "Diary", navigate: `/api/users/${memberId}/diary` },
    { name: "Juke Box", navigate: `/api/users/${memberId}/jukebox` },
    { name: "Posts", navigate: `/api/users/${memberId}/posts` },
    { name: "Add Friend", navigate: `/api/users/${memberId}/friends`},
    { name: "Guest Book", navigate: `/api/users/${memberId}/guestbook` },
  ];

  const onClickBar = (url) => () => {
    navigate(url);
  };
  return (
    <S.NavigateWrapper>
      <S.NavigateBarStyle>
        {NAVIGATION_BAR.map((category) => (
          <S.NavaigateTitle
            key={category.name}
            onClick={onClickBar(category.navigate)}
          >
            {category.name}
          </S.NavaigateTitle>
        ))}
      </S.NavigateBarStyle>
    </S.NavigateWrapper>
  );
}
