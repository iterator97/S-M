import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { TasksColumns } from "../../organisms";
import { getProjectWorkTask } from "../../../hooks/getProjectWorkTasks";

export default function SubProject() {
  const navigate = useNavigate();
  const params = useParams();

  const [workTasks, setWorkTasks] = useState();

  useEffect(() => {
    getProjectWorkTask(params.subId).then((data) => {
      if (data) {
        setWorkTasks(data);
      }
    });
  }, [params.subId]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Grid container direction="row" justifyContent="flex-end">
          <Button
            variant="text"
            startIcon={<AddIcon />}
            size="large"
            onClick={() => navigate("newTask")}
          >
            Add work task
          </Button>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          <Button variant="text" startIcon={<AddIcon />} size="large">
            Edit subSpace
          </Button>
        </Grid>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={3} sx={{}}>
          <TasksColumns workTasks={workTasks} Status={0} />
        </Grid>
        <Grid item xs={3}>
          <TasksColumns workTasks={workTasks} Status={1} />
        </Grid>
        <Grid item xs={3}>
          <TasksColumns workTasks={workTasks} Status={2} />
        </Grid>
        <Grid item xs={3}>
          <TasksColumns workTasks={workTasks} Status={3} />
        </Grid>
      </Grid>
    </Box>
  );
}
