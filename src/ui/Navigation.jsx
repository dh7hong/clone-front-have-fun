import React from "react";
import * as S from "../shared/style/NavigationStyle";
import { useLocation, useNavigate } from "react-router-dom";

const NAVIGATION_BAR = [
  { name: "Home", navigate: "/" },
  { name: "Profile", navigate: "/profile" },
  { name: "Diary", navigate: "/diary" },
  { name: "Juke Box", navigate: "/jukebox" },
  { name: "Posts", navigate: "/" },
  { name: "Guest Book", navigate: "/guestbook" },
];

export default function Navigation() {
  const navigate = useNavigate();
  

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
