// MainDiary.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setEntries } from '../../redux/modules/diarySlice';
import { getDiaryEntries } from '../../api/diary';
import DiaryInput from './DiaryInput';
import DiaryList from './DiaryList';
import { useParams } from 'react-router-dom';

const DiaryHome = () => {
  const dispatch = useDispatch();
  const { memberId } = useParams();
  useEffect(() => {
    const getEntries = async () => {
      try {
        const entries = await getDiaryEntries(memberId);
        dispatch(setEntries(entries));
      } catch (error) {
        console.error('Error fetching diary entries', error);
      }
    };

    getEntries();
  }, [dispatch, memberId]);

  return (
    <div>
      <DiaryInput />
      <DiaryList />
    </div>
  );
};

export default DiaryHome;