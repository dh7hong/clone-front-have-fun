import React from 'react';
import { useSelector } from 'react-redux';
import { DiaryEntry, DiaryDate, DiaryContent } from "../../shared/style/DiaryStyle";

const DiaryList = () => {
  const entries = useSelector((state) => state.diary.entries);

  
  const reversedEntries = [...entries].reverse();

  return (
    <>
      {reversedEntries.map((entry) => (
        <DiaryEntry key={entry.diaryId}>
          <DiaryDate>{entry.createdAt}</DiaryDate>
          <DiaryContent>{entry.contents}</DiaryContent>
        </DiaryEntry>
      ))}
    </>
  );
};

export default DiaryList;