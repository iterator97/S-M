import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { WorkTaskPopover } from "../../atoms";

interface TaskProps {
  data?: any;
  modal?: boolean;
  setModal?: any;
}
const TaskColumn = (props: TaskProps) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={props.data.content}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {props.data.subContent}
            </Typography>
          </React.Fragment>
        }
      />
      <Popover
        open={false}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <WorkTaskPopover
          workTask={props.data}
          modal={props.modal}
          setModal={props.setModal}
        />
      </Popover>
    </ListItem>
  );
};

export default TaskColumn;
