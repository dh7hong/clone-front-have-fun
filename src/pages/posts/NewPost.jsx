import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AddPost } from "../../api/posts";
import { addPost } from "../../redux/modules/postSlice";
import * as S from "../../shared/style/NewPostStyle";
import { Button } from "../../components/button";
import { get } from "lodash";
import { getDateTime } from "../../util/getDateTime";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [id, setId] = useState(localStorage.getItem("id"));
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memberId } = useParams();

  useEffect(() => {
    // Update state if localStorage changes
    setId(localStorage.getItem("id"));
    setNickname(localStorage.getItem("nickname"));
    setName(localStorage.getItem("name"));
  }, []);

  const generateUniqueId = () => {
    let now = new Date();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();
    return minutes * 60000 + seconds * 1000 + milliseconds;
  };

  const uniqueId = generateUniqueId();
  const createdAt = getDateTime();

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeContents = (event) => setContents(event.target.value);
  
  const onSubmit = async () => {
    if (!title || !contents) {
      alert("Title and contents are required.");
      return;
    }

    try {
      const newPostData = {
        postId: uniqueId,
        title,
        id,
        name,
        nickname,
        contents,
        memberId,
        createdAt
      };
      const response = await AddPost(newPostData, memberId);
      dispatch(addPost(response));
      navigate(`/api/users/${memberId}/posts`);
    } catch (error) {
      console.error("Error adding new post:", error);
      // Handle error appropriately
    }
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
              maxLength={30}
              value={title}
              onChange={onChangeTitle}
            />
          </S.TitleWrapper>
          <S.ContentsWrapper>
            <h3>내용</h3>
            <S.ContentsInput
              placeholder="내용을 입력하세요"
              value={contents}
              onChange={onChangeContents}
            />
          </S.ContentsWrapper>
        </S.ContentsBody>
        <S.ButtonWrapper>
          <Button onClick={onSubmit} disabled={!title || !contents}>
            등록하기
          </Button>
          <Button onClick={() => navigate(`/api/users/${memberId}/posts`)}>
            목록가기
          </Button>
        </S.ButtonWrapper>
      </S.InputWrapper>
    </S.NewPostWrapper>
  );
}
