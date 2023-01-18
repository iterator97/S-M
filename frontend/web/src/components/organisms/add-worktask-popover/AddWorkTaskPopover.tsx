import {
  Box,
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
import { create_UUID } from "../../../hooks/createGuid";
import { SubTaskList } from "../../molecules";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export interface SubTask {
  id: string;
  description: string;
}

interface AddWorkTaskPopoverProps {
  subSpaces?: any;
}

function AddWorkTaskPopover(props: AddWorkTaskPopoverProps) {
  const [selectedSubSpace, setSelectedSubSpace] = useState<any | null>(null);
  const [workTaskTitle, setWorkTaskTitle] = useState<any | null>(null);
  const [workTaskDescription, setWorkTaskDescription] = useState<any | null>(
    null
  );
  const [subTasks, setSubTasks] = useState<Array<SubTask> | undefined>([
    {
      id: "141dd095-1223-4b30-85eb-c25a8090073a",
      description: "sample subtask",
    },
    {
      id: "341dd095-1223-4b30-85eb-c25a8090073a",
      description: "sample subtas2k",
    },
  ]);

  // Working
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSubSpace(event.target.value);
  };

  // Working
  const onAddNewSubTask = () => {
    let newSubTasks: any = subTasks;
    newSubTasks.push({
      id: create_UUID(),
      description: "Sample description",
    });
    setSubTasks(newSubTasks);
    console.log(subTasks);
  };

  // Working
  const onSubTaskRemove = (id: string | undefined) => {
    let newSubTasks: any = subTasks;
    var index = subTasks?.findIndex(function (o: any) {
      return o.id === id;
    });
    if (index !== -1 && index) newSubTasks?.splice(index, 1);

    setSubTasks(newSubTasks);

    console.log(newSubTasks);
  };

  useEffect(() => {
    setSubTasks(subTasks);
  }, [subTasks]);

  return (
    <Box
      sx={{
        width: 500,
        height: 500,
      }}
    >
      <Stack spacing={2}>
        <Item>
          <Typography variant="h5">Add work task</Typography>
        </Item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSubSpace}
            label="SubSpace"
            onChange={handleChange}
          >
            {props.subSpaces.map((item: any) => {
              return <MenuItem value={item}>{item.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Item>
          <div style={{ display: "flex" }}>
            <TextField
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
              fullWidth
              variant="standard"
              id="outlined-required"
              label="Work task description"
              defaultValue="Hello World"
            />
          </div>
        </Item>
        <Item>
          <div>
            <Typography variant="h6">Subtasks</Typography>
          </div>
          <div>
            <SubTaskList
              subtasks={subTasks}
              onAddNewSubTask={onAddNewSubTask}
              onSubTaskRemove={onSubTaskRemove}
            />
          </div>
        </Item>
      </Stack>
    </Box>
  );
}

export default AddWorkTaskPopover;
