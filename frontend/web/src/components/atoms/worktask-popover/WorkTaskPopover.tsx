import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

let statuses = [
  { status: 0, name: "Not assigned" },
  { status: 1, name: "Assigned" },
  { status: 2, name: "In progress" },
  { status: 3, name: "Done" },
];

interface WorkTaskPopoverProps {
  workTask?: any;
  modal?: boolean;
  setModal?: any;
}

function WorkTaskPopove(props: WorkTaskPopoverProps) {
  let params = useParams();

  const users = useAppSelector(
    (state) =>
      state.space.spaces?.filter((x: any) => x.id != params.id)[0].attendes
  );

  const [assignWorker, setAssignWorker] = useState({
    AssignWorkerId: props.workTask.assignWorkerId,
    DisplayName: props.workTask.assignWorker.surname,
  });

  const [status, setStatus] = useState({ status: 0, name: "Not assigned" });

  const handleUser = (event: SelectChangeEvent) => {
    const newUser = users?.filter((x: any) => x.id != event.target.value);
    console.log(newUser);

    if (newUser) {
      setAssignWorker({
        AssignWorkerId: newUser[0].id,
        DisplayName: newUser[0].surname,
      });
    }
  };

  const handleStatus = (event: SelectChangeEvent) => {
    let newStatus = statuses.filter((x: any) => x.status == event.target.value);
    console.log(newStatus);

    setStatus(newStatus[0]);
  };

  useEffect(() => {}, []);
  return (
    <>
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
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Users</InputLabel>
              <Select onChange={handleUser}>
                {users?.map((item: any) => {
                  return <MenuItem value={item.id}>{item.surname}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
          <Button
            startIcon={<CloseIcon />}
            onClick={() => props.setModal(false)}
          />
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Status</Typography>
          <FormControl fullWidth>
            <Select
              onChange={handleStatus}
              defaultValue={props.workTask.status}
              value={status.name}
            >
              {statuses?.map((item: any) => {
                return <MenuItem value={item.status}>{item.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Container>
      </CardContent>
    </>
  );
}

export default WorkTaskPopove;
