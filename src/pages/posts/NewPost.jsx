import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addPost as addPostAPI } from "../../api/posts";
import { addPost } from "../../redux/modules/postSlice";
import * as S from "../../shared/style/NewPostStyle";
import { Button } from "../../components/button";
import { getDateTime } from "../../util/getDateTime";
import { generateUniqueId, generateRandomId } from "../../util/generateUniqueId";
import Base from "../layout/Base";
import FirstGridArea from "../layout/FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import * as F from "../../shared/style/FirstGridArea";
import * as K from "../../shared/style/SecondGridArea";

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

  const uniqueId = generateRandomId();
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
        createdAt,
      };
      const response = await addPostAPI(newPostData, memberId);
      dispatch(addPost(response));
      console.log("response from addPost", response);
      navigate(`/api/users/${memberId}/posts`);
    } catch (error) {
      console.error("Error adding new post:", error);
      // Handle error appropriately
    }
  };

  return (
    <>
      <Base>
        <FirstGridArea />
        <SecondGridArea>
          <S.InputWrapper>
            <h3>Title</h3>
            <S.TitleInput
              placeholder="Enter title"
              maxLength={30}
              value={title}
              onChange={onChangeTitle}
            />

            <h3>Contents</h3>
            <S.ContentsInput
              placeholder="Enter contents"
              value={contents}
              onChange={onChangeContents}
            />

            <S.ButtonWrapper>
              <Button onClick={onSubmit} disabled={!title || !contents}>
                등록하기
              </Button>
              <Button onClick={() => navigate(`/api/users/${memberId}/posts`)}>
                목록가기
              </Button>
            </S.ButtonWrapper>
          </S.InputWrapper>
        </SecondGridArea>
      </Base>
    </>
  );
}
