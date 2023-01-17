import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React, { useEffect } from "react";

interface WorkTaskPopoverProps {
  workTask?: any;
  modal?: boolean;
  setModal?: any;
}

function WorkTaskPopove(props: WorkTaskPopoverProps) {
  useEffect(() => {
    console.log("Popover did mount");
  }, []);
  return (
    <div>
      {/* {" "}
      <Card sx={{ display: "flex" }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">User</Avatar>}
          action={<IconButton aria-label="settings">Status here ?</IconButton>}
          title={<div>dupa</div>}
        />
      </Card> */}
    </div>
  );
}

export default WorkTaskPopove;
