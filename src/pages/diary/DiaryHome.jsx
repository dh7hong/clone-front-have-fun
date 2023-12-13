// MainDiary.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEntries } from "../../redux/modules/diarySlice";
import { getDiaryEntries } from "../../api/diary";
import DiaryInput from "./DiaryInput";
import DiaryList from "./DiaryList";
import { useParams } from "react-router-dom";
import * as F from "../../shared/style/FirstGridArea";
import * as S from "../../shared/style/SecondGridArea";
import Base from "../layout/Base";
import FirstGridArea from "../layout/FirstGridArea";
import SecondGridArea from "../SecondGridArea";

const DiaryHome = () => {
  const dispatch = useDispatch();
  const { memberId } = useParams();
  useEffect(() => {
    const getEntries = async () => {
      try {
        const entries = await getDiaryEntries(memberId);
        dispatch(setEntries(entries));
      } catch (error) {
        console.error("Error fetching diary entries", error);
      }
    };

    getEntries();
  }, [dispatch, memberId]);

  return (
    <>
      {/* <Base>
        <FirstGridArea /> */}
        <SecondGridArea>
          <DiaryInput />
          <DiaryList />
        </SecondGridArea>
      {/* </Base> */}
    </>
  );
};

export default DiaryHome;
