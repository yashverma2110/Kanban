import React, { useEffect, useState } from "react";
import { Box, Chip, Avatar, Divider } from "@material-ui/core";
import { SearchInput } from "./SearchInput";
import { generateRandomColor, getUserDetails } from "../../utils/common";
import { memberListStyles } from "..";

export const MemberSelector = (props) => {
  const classes = memberListStyles();
  const [searchQry, setSearchQry] = useState("");
  const [userList, setUserList] = useState(props.list);
  const [selectedUserList, setSelectedUserList] = useState([]);

  useEffect(() => {
    if (props.selectedList) {
      let checkArray = props.selectedList.map((s) => s._id);
      let temp = props.list.filter((s) => !checkArray.includes(s._id));
      setSelectedUserList(props.selectedList);
      setUserList(temp);
    }
  }, [props.selectedList]);

  const contributorsSearchHandler = (qry) => {
    setSearchQry(qry);
  };

  const handleAddContributors = (user) => {
    let temp = userList.filter((mem) => mem._id !== user._id);
    setUserList(temp);
    setSelectedUserList([...selectedUserList, user]);
    props.getData([...selectedUserList, user]);
  };

  const handleContributorRemoval = (user) => {
    let temp = selectedUserList.filter((mem) => mem._id !== user._id);
    setSelectedUserList(temp);
    setUserList([...userList, user]);
    props.getData(temp);
  };

  const getUserChip = (member, index, onDelete) => (
    <Chip
      key={index}
      className={classes.chip}
      style={{ margin: "5px" }}
      avatar={
        <Avatar
          style={{ background: generateRandomColor() }}
          src={""}
          alt="person"
        >
          {member.name[0]}
        </Avatar>
      }
      label={member.name}
      onClick={() => (!onDelete ? handleAddContributors(member) : onDelete)}
      onDelete={onDelete}
    />
  );

  return (
    <Box className={classes.root}>
      <SearchInput title="Members" searchHandler={contributorsSearchHandler} />
      <Box display="flex" className={classes.selectedContainer}>
        {selectedUserList.map((user, index) =>
          getUserChip(user, index, () => handleContributorRemoval(user))
        )}
      </Box>
      <Divider />
      <Box>
        {userList.map((member, index) => {
          if (
            (searchQry === "" || member.name.includes(searchQry)) &&
            getUserDetails()._id !== member._id
          )
            return getUserChip(member, index, false);
          else return "";
        })}
      </Box>
    </Box>
  );
};
