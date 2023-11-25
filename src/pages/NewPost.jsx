import React, { useState } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AddPost, getPost } from "../api/posts";
import { useDispatch, useSelector } from "react-redux";
import * as S from "../shared/style/NewPostStyle";
import { v4 as uuidv4 } from "uuid";
import { uniq } from "lodash";
import { Button } from "../components/button";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [titleError, setTitleError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const mutation = useMutation(AddPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    const test = event.target.value;
    if (test?.length > 15) {
      alert("15글자까지 입력 가능합니다.");
    } else {
      setTitleError("");
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const generateUniqueId = () => {
    let now = new Date();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();

    return minutes * 60000 + seconds * 1000 + milliseconds;
  };

  const onClickSubmitBtn = () => {
    if (!title || !contents) return alert("제목과 내용을 입력하세요");
    const uniqueId = generateUniqueId();
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const newPost = {
      postId: uniqueId,
      title: title,
      userId: userId,
      contents: contents,
      username: username,
      // likedCount: 0,
      // isActive: false,
    };
    mutation.mutate(newPost);

    alert("정상적으로 등록됐습니다");
  };

  const moveToBoard = () => {
    navigate("/");
  };
  return (
    <S.NewPostWrapper>
      <S.InputWrapper>
        <S.TitleBox>
          <S.Title>New Post</S.Title>
        </S.TitleBox>
        <S.ContentsBody>
          <S.TitleWrapper>
            <h3>제목</h3>
            <S.TitleInput
              placeholder="제목을 입력하세요"
              maxLength={15}
              onChange={onChangeTitle}
            />
            <span>{titleError}</span>
          </S.TitleWrapper>
          <S.ContentsWrapper>
            <h3>내용</h3>
            <S.ContentsInput
              placeholder="내용을 입력하세요"
              onChange={onChangeContents}
            />
          </S.ContentsWrapper>
        </S.ContentsBody>
        <S.ButtonWrapper>
          <Button onClick={onClickSubmitBtn}>등록하기</Button>
          <Button onClick={moveToBoard}>목록가기</Button>
        </S.ButtonWrapper>
      </S.InputWrapper>
    </S.NewPostWrapper>
  );
}
