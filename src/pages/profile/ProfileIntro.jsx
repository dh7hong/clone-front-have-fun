import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { FlexJustAlignCenter } from "../../shared/style/Base";
import axios from "axios";

export default function ProfileIntro() {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const applyFormatting = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const saveText = async () => {
    try {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const serializedContent = JSON.stringify(rawContentState);

      const content = JSON.stringify(rawContentState);

      await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/intro`,
        { intro: content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Text saved successfully!");
      toggleEdit();
    } catch (error) {
      console.error("Error saving text:", error);
      alert("Failed to save text.");
    }
  };

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/intro`
        );
        if (response.data && response.data.intro) {
          const content = response.data.intro;
          console.log("Fetched intro:", response.data.intro);
          const convertedContent = convertFromRaw(JSON.parse(content));
          setEditorState(EditorState.createWithContent(convertedContent));
        }
      } catch (error) {
        console.error("Error fetching intro:", error);
      }
    };

    fetchIntro();
  }, [memberId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Introduction</h2>

      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <button
          onClick={() => applyFormatting("BOLD")}
          style={{}}
        >
          <b>B</b>
        </button>
        <button
          onClick={() => applyFormatting("ITALIC")}
          style={{}}
        >
          <i>I</i>
        </button>
        <button
          onClick={() => applyFormatting("UNDERLINE")}
          style={{ marginRight: "5px" }}
        >
          <u>U</u>
        </button>
        <button onClick={toggleEdit} style={{ marginRight: "5px" }}>
          {isEditable ? "Lock" : "Edit"}
        </button>
        <button onClick={saveText} disabled={!isEditable}>
          Save
        </button>
      </div>

      <div
        style={{
          border: "1px solid black",
          padding: "5px",
          minHeight: "200px",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          readOnly={!isEditable}
        />
      </div>
    </div>
  );
}
