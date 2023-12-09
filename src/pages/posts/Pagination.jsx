import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";

export default function Pagination({ page, setPage, data }) {
  const postsPerPage = 6;

  const pageList = [];
  const postsNum = data?.length;
  const totalPages = Math.ceil(postsNum / postsPerPage);

  const onClickPageBtn = (number) => () => {
    setPage(number);
  };

  const moveToPrevPage = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const moveToNextPage = () => {
    if (totalPages === page) return;
    setPage((prev) => prev + 1);
  };

  console.log("postsNum", postsNum);
  console.log("totalPages", totalPages);

  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }
  console.log("pageList", pageList);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={moveToPrevPage}>prev</Button>
      {pageList.map((page, index) => (
        <Button id={index} onClick={onClickPageBtn(page)} key={page}>
          {page}
        </Button>
      ))}
      <Button onClick={moveToNextPage}>next</Button>
    </div>
  );
}
