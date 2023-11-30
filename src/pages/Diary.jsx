import React from "react";
import Base from "./layout/Base";
import FirstGridArea from "./FirstGridArea";
import SecondGridArea from "./SecondGridArea";
import * as F from "../shared/style/FirstGridArea";
import * as S from "../shared/style/SecondGridArea";
import SpringGroup from "./layout/SpringGroup";
import CategoryGroup3 from "./layout/CategoryGroup3";

const Diary = () => {
  return (
    <>
      <Base>
        <FirstGridArea />
        <SecondGridArea></SecondGridArea>
      </Base>
      <SpringGroup />
      <CategoryGroup3 />
    </>
  );
};

export default Diary;
