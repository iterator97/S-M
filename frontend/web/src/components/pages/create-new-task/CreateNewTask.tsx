import { PlusOutlined } from "@ant-design/icons";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { create_UUID } from "../../../hooks/createGuid";
import { IWorkTask } from "../../../models";
import { SubTask } from "../../../models/workTask/IWorkTask";
import { AppDispatch } from "../../../store/store";
import { createNewWorkTask } from "../../../store/subProjects/actions/createNewWorkTask";
import "./index.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface AddWorkTaskPopoverProps {
  subSpaces?: any;
}

function CreateNewTask(props: AddWorkTaskPopoverProps) {
  let params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [workTaskTitle, setWorkTaskTitle] = useState<any>("");
  const [workTaskDescription, setWorkTaskDescription] = useState<any>("");
  const [subTasks, setSubTasks] = useState<Array<SubTask> | []>([
    {
      Id: "141dd095-1223-4b30-85eb-c25a8090073a",
      Description: "sample subtask",
    },
    {
      Id: "341dd095-1223-4b30-85eb-c25a8090073a",
      Description: "sample subtas2k",
    },
  ]);

  // Working
  const onAddNewSubTask = () => {
    let newSubTasks: any = subTasks;
    newSubTasks.push({
      id: create_UUID(),
      description: "Sample description",
    });
    setSubTasks(newSubTasks);
  };

  // Working
  const onSubTaskRemove = (id: string | undefined) => {
    let newSubTasks: any = subTasks;
    var index = subTasks?.findIndex(function (o: any) {
      return o.id === id;
    });
    if (index !== -1 && index) newSubTasks?.splice(index, 1);

    setSubTasks(newSubTasks);
  };

  useEffect(() => {
    setSubTasks(subTasks);
  }, [subTasks]);

  const onCreateTask = () => {
    let newWorkTask: IWorkTask = {
      Content: workTaskTitle,
      SubContent: workTaskDescription,
      SubSpaceId: params.id,
      SubTasks: subTasks,
    };
    dispatch(createNewWorkTask(newWorkTask));
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Item>
          <Typography variant="h5">Add work task</Typography>
        </Item>

        <Item>
          <div style={{ display: "flex" }}>
            <TextField
              value={workTaskTitle}
              onChange={(e: any) => setWorkTaskTitle(e.target.value)}
              fullWidth
              variant="standard"
              id="outlined-required"
              label="Work task title"
            />
          </div>
        </Item>
        <Item>
          <div style={{ display: "flex" }}>
            <TextField
              value={workTaskDescription}
              onChange={(e: any) => setWorkTaskDescription(e.target.value)}
              fullWidth
              variant="standard"
              id="outlined-required"
              label="Work task description"
              defaultValue="Hello World"
            />
          </div>
        </Item>
        <Item>
          <div className="subtask-container-top">
            <Typography variant="h6">Subtasks</Typography>

            <Button endIcon={<PlusOutlined />} onClick={onAddNewSubTask}>
              New subtask
            </Button>
          </div>
          <div>
            {subTasks.map((x: any) => {
              return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    value={x.description}
                    fullWidth
                    variant="standard"
                    id="outlined-required"
                    label="Subtask description"
                    defaultValue=""
                  />
                  <Button color="error" onClick={() => onSubTaskRemove(x.id)}>
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="subtask-container-bottom">
            <Button onClick={onCreateTask}>Save</Button>
          </div>
        </Item>
      </Stack>
    </Box>
  );
}

export default CreateNewTask;
