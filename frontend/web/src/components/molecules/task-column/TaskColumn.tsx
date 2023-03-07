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
import { Box, Button, Container } from "@mui/material";
import { Select } from "antd";
import { changeWorkTaskStatus } from "../../../hooks/changeWorkTaskStatus";

interface TaskProps {
  data?: any;
  modal: boolean;
  setModal?: any;
  refreshWorkTask?: any;
}
const TaskColumn = (props: TaskProps) => {
  const navigate = useNavigate();
  console.log(props.data);

  const handleChange = (value: number) => {
    changeWorkTaskStatus(props.data.id, value).then((data) => {
      if (data == 1) {
        // zmieniono
        props.refreshWorkTask();
      } else {
        // pokaz error
      }
    });
  };

  return (
    <ListItem alignItems="flex-start" sx={{}}>
      <ListItemAvatar>
        <Avatar alt={props.data.assignWorker?.email} />
        <Typography variant="subtitle2">
          {props?.data?.assignWorker?.name}
        </Typography>
        <Typography variant="subtitle2">
          {props?.data?.assignWorker?.surname}
        </Typography>
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
      <Container
        sx={{
          width: "100px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Select
          defaultValue={props.data.status}
          onChange={handleChange}
          style={{
            minWidth: 80,
          }}
          options={[
            {
              value: "0",
              label: "Nie przypisane",
            },
            {
              value: "1",
              label: "Przypisane",
            },
            {
              value: "2",
              label: "W trakcie",
            },
            {
              value: "3",
              label: "Zakończone",
            },
          ]}
        />
        <Button onClick={() => navigate("editTask/" + props.data.id)}>
          Edytuj
        </Button>
      </Container>

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
