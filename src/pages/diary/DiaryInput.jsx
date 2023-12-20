import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../redux/modules/diarySlice';
import { postDiaryEntry } from '../../api/diary';
import { generateRandomId } from '../../util/generateUniqueId';
import { getDateTime } from '../../util/getDateTime';
import { Button } from "../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { DiarySection, DiaryInputField, DiaryButton, DiaryTitle } from "../../shared/style/DiaryStyle";

export default function DiaryInput() {
  const [contents, setContents] = useState('');
  const dispatch = useDispatch();
  const { memberId } = useParams();

  const onChangeContents = (event) => setContents(event.target.value);
  
  const handleSubmit = async () => {
    if (contents.trim()) {
      const newEntry = {
        diaryId: generateRandomId(),
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        nickname: localStorage.getItem('nickname'),
        contents: contents,
        memberId: memberId,
        createdAt: getDateTime(),
      };

      try {
        const addedEntry = await postDiaryEntry(memberId, newEntry);
        dispatch(addEntry(addedEntry));
        setContents('');
      } catch (error) {
        console.error('Error posting new diary entry', error);
      }
    }
  };

  return (
    <DiarySection>
      <DiaryTitle></DiaryTitle>
      <DiaryInputField
        type="text"
        placeholder="What's on your mind?"
        value={contents}
        onChange={onChangeContents}
      />
      <DiaryButton onClick={handleSubmit}>Submit</DiaryButton>
    </DiarySection>
  );
}
