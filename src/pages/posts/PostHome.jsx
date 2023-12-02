import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { AddPost, getPost } from "../../api/posts";
import * as S from "../../shared/style/HomeStyle";
import { useNavigate, useParams } from "react-router-dom";
import PostList from "./PostList";
import Pagination from "./Pagination";
import { Button } from "../../components/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/modules/userSlice";
import Base from "../layout/Base";
import FirstGridArea from "../FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import SpringGroup from "../layout/SpringGroup";
import CategoryGroup5 from "../layout/CategoryGroup5";

export default function PostHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memberId } = useParams();
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery("posts", () => getPost(memberId), {
    enabled: !!memberId,
  });

  useEffect(() => {
    refetch();
  }, [memberId, refetch]);

  //data = 객체형태로 모든 값들 다있음
  const [page, setPage] = useState(1);
  const limit = 7;
  const offset = (page - 1) * limit;

  const onClickSubmitBtn = () => {
    navigate(`/api/users/${memberId}/posts/new`);
  };

  const postsData = () => {
    if (data) {
      let reversedData = [...data].reverse(); // Reverse the entire data array
      let result = reversedData.slice(offset, offset + limit);
      return result;
    }
  };

  const handleLogout = () => {
    queryClient.clear();
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
    window.location.reload();
  };

  console.log("data", data);

  return (
    <>
      <Base>
        <FirstGridArea />
        <SecondGridArea>
          <S.HeaderWrapper>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <Button onClick={onClickSubmitBtn}>Post</Button>
              <Button onClick={onClickSubmitBtn}>Other Users</Button>
            </div>
          </S.HeaderWrapper>
          <S.BoardWrapper>
            <S.BoardTitle>ID</S.BoardTitle>
            <S.BoardTitle>Title</S.BoardTitle>
            <S.BoardTitle>Posted By</S.BoardTitle>
            <S.BoardTitle>Posted On</S.BoardTitle>
            <S.BoardTitle>Details</S.BoardTitle>
          </S.BoardWrapper>

          <S.PostStyle>
            {postsData()?.map((post) => (
              <PostList key={post.postId} post={post} />
            ))}
          </S.PostStyle>
          <Pagination page={page} setPage={setPage} data={data} />
        </SecondGridArea>
      </Base>
      <CategoryGroup5 />
    </>
  );
}
