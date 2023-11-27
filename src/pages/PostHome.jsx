import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AddPost, getPost } from "../api/posts";
import * as S from "../shared/style/HomeStyle";
import { useNavigate, useParams } from "react-router-dom";
import PostList from "./PostList";
import Pagination from "./Pagination";
import { Button } from "../components/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/modules/userSlice";

export default function PostHome() {
  const [isActive, setIsActive] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [searchPost, setSearchPost] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memberId } = useParams();
  const { data, refetch } = useQuery("posts", () => getPost(memberId), {
    enabled: !!memberId,
  });

  useEffect(() => {
    refetch();
  }, [memberId, refetch]);

  //data = 객체형태로 모든 값들 다있음
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  
  
  
  const onClickSubmitBtn = () => {
    navigate(`/api/users/${memberId}/posts/new`);
  };
  const onChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  const postsData = () => {
    if (data) {
      let result = data?.slice(offset, offset + limit);
      return result;
    }
  };

  const onClickSearchBtn = () => {
    setSearchPost(data.filter((post) => post.title.includes(keyWord)));
    setIsActive(true);
  };

  const onClickAllPost = () => {
    setIsActive(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nickname");
    localStorage.removeItem("memberId");
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logout());
    setIsLoggedIn(false);
    console.log(isLoggedIn);
    navigate("/api/login", { replace: true }); // Navigate to login page on logout
  };

  console.log("data", data);

  return (
    <S.Wrapper>
      <S.HomeWrapper>
        <S.HeaderWrapper>
          <div>
            <S.SearchInput
              value={keyWord}
              onChange={onChangeKeyWord}
              placeholder="제목을 입력해주세요"
            />
            <Button onClick={onClickSearchBtn}>검색</Button>
            <Button onClick={onClickAllPost}>전체 글 보기</Button>
            <Button onClick={onClickSubmitBtn}>등록하기</Button>
            <Button onClick={handleLogout}>로그아웃</Button>
          </div>
        </S.HeaderWrapper>
        <S.BoardWrapper>
          <S.BoardTitle>번호</S.BoardTitle>
          <S.BoardTitleStyle>제목</S.BoardTitleStyle>
          <S.BoardTitle>작성자</S.BoardTitle>
          <S.BoardTitle>작성자 ID</S.BoardTitle>
          <S.BoardTitle>작성날짜</S.BoardTitle>
          <S.BoardTitle>상세보기</S.BoardTitle>
        </S.BoardWrapper>

        {/* search 기능 */}
        {!isActive && (
          <S.PostStyle>
            {postsData(data)?.map((post) => (
              <PostList key={post.postId} post={post} />
            ))}
          </S.PostStyle>
        )}
        {isActive && (
          <S.PostStyle>
            {searchPost?.map((post) => (
              <PostList key={post.postId} post={post} keyWord={keyWord} />
            ))}
          </S.PostStyle>
        )}
        
        <Pagination page={page} setPage={setPage} data={data} />
      </S.HomeWrapper>
    </S.Wrapper>
  );
}
