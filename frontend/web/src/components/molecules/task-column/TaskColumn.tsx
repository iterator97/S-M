import React, { useState } from "react";
import {
  NavLink as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { WorkTaskPopover } from "../../atoms";
import { Box, Button } from "@mui/material";

interface TaskProps {
  data?: any;
  modal: boolean;
  setModal?: any;
}
const TaskColumn = (props: TaskProps) => {
  const navigate = useNavigate();
  console.log(props.data);
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Michal Kalisiak" src="/static/images/avatar/1.jpg" />
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
      <Button onClick={() => navigate("editTask/" + props.data.id)}>
        Edit task
      </Button>
      <Popover
        open={props.modal}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            width: "800px",
            height: "800px",
          }}
        >
          <WorkTaskPopover workTask={props.data} setModal={props.setModal} />
        </Box>
      </Popover>
    </ListItem>
  );
};

export default TaskColumn;
