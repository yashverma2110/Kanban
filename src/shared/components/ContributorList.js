import React from "react";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import { generateRandomColor } from "../../utils/common";

export const ContributorList = ({ list }) => {
  return (
    <AvatarGroup max={4}>
      {list.map((member, index) => (
        <Avatar
          key={index}
          alt={member.name}
          src={"/static/images/avatar/1.jpg"}
          style={{
            color: "white",
            background: generateRandomColor(),
          }}
        >
          {member.name[0]}
          {member.name[1]}
        </Avatar>
      ))}
    </AvatarGroup>
  );
};
