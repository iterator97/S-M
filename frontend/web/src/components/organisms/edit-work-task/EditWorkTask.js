import {
  Button,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import OutlinedInput from "@mui/material/OutlinedInput";

let statuses = [
  { status: 0, name: "Not assigned" },
  { status: 1, name: "Assigned" },
  { status: 2, name: "In progress" },
  { status: 3, name: "Done" },
];

const EditWorkTask = () => {
  let params = useParams();
  const workTask = useAppSelector((state) =>
    state.subSpace.workTasks?.filter((x) => x.id == params.taskId)
  );

  const workTaskRest = useAppSelector((state) =>
    state.subSpace.workTasks?.filter((x) => x.id != params.taskId)
  );

  console.log("REST");
  console.log(workTaskRest);

  const [dependencies, setDependencies] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target);
    setDependencies(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log("CLICK");
    console.log(dependencies);
  };

  const [assignWorker, setAssignWorker] = useState(workTask[0].assignWorker);
  const [status, setStatus] = useState(workTask[0].status);
  const [workTaskTitle, setWorkTaskTitle] = useState(workTask[0].content);
  const [workTaskDescription, setWorkTaskDescription] = useState(
    workTask[0].subContent
  );

  const users = useAppSelector(
    (state) => state.space.spaces?.filter((x) => x.id != params.id)[0].attendes
  );

  const handleUser = (event) => {
    const newUser = users?.filter((x) => x.id != event.target.value);

    if (newUser) {
      setAssignWorker({
        AssignWorkerId: newUser[0].id,
        DisplayName: newUser[0].surname,
      });
    }
  };

  const handleStatus = (event) => {
    let newStatus = statuses.filter((x) => x.status == event.target.value);
    setStatus(newStatus[0]);
  };

  return (
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Assigned user
        </Typography>
        <div style={{ width: "350px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Users</InputLabel>
            <Select onChange={handleUser}>
              {users?.map((item) => {
                return <MenuItem value={item.id}>{item.surname}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Status
        </Typography>
        <div style={{ width: "350px" }}>
          <FormControl>
            <Select onChange={handleStatus} defaultValue={workTask.status}>
              {statuses?.map((item) => {
                return <MenuItem value={item.status}>{item.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Work task title
        </Typography>
        <div style={{ width: "350px" }}>
          <TextField
            value={workTaskTitle}
            onChange={(e) => setWorkTaskTitle(e.target.value)}
            fullWidth
            variant="standard"
            id="outlined-required"
            label="Work task description"
            defaultValue={workTask[0].content}
          />
        </div>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Work task description
        </Typography>
        <div style={{ width: "350px" }}>
          <TextField
            value={workTaskDescription}
            onChange={(e) => setWorkTaskDescription(e.target.value)}
            fullWidth
            variant="standard"
            id="outlined-required"
            label="Work task description"
            defaultValue={workTask[0].subContent}
          />
        </div>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Work task dependencies
        </Typography>
        <div style={{ width: "350px" }}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              multiple
              value={dependencies}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
            >
              {workTaskRest.map((item) => (
                <MenuItem key={item.id} value={item}>
                  {item.content}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Container>
      <Container>
        <Button>Save work task</Button>
      </Container>
    </CardContent>
  );
};

export default EditWorkTask;
