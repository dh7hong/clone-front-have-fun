import React from "react";
import Base from "../layout/Base";
import FirstGridArea from "../FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import * as F from "../../shared/style/FirstGridArea";
import * as S from "../../shared/style/SecondGridArea";

export default function Album() {
  return (
    <>
      <Base>
        <FirstGridArea />
        <SecondGridArea></SecondGridArea>
      </Base>
    </>
  );
}
