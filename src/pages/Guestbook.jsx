import React from "react";
import CategoryGroup6 from "./layout/CategoryGroup6";
import SpringGroup from "./layout/SpringGroup";
import Base from "./layout/Base";
import FirstGridArea from "./FirstGridArea";
import SecondGridArea from "./SecondGridArea";
import * as F from "../shared/style/FirstGridArea";
import * as S from "../shared/style/SecondGridArea";

export default function Guestbook() {
  return (
    <>
      <Base>
        <FirstGridArea />
        <SecondGridArea></SecondGridArea>
      </Base>
      <CategoryGroup6 />
    </>
  );
}
