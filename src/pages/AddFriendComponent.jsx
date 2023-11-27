import React, { useState } from "react";
import { addFriend } from "../api/friends";

const AddFriendComponent = () => {
  const [friendNickname, setFriendNickname] = useState("");
  const currentUserMemberId = localStorage.getItem("memberId");
  const handleAddFriend = async () => {
    try {
      await addFriend(currentUserMemberId, friendNickname);
      alert("Friend added successfully!");
      setFriendNickname("");
    } catch (error) {
      alert("Failed to add friend");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={friendNickname}
        onChange={(e) => setFriendNickname(e.target.value)}
        placeholder="Enter friend's nickname"
      />
      <button onClick={handleAddFriend}>Add Friend</button>
    </div>
  );
};

export default AddFriendComponent;
