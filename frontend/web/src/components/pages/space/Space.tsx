import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { TasksColumn } from "../../organisms";
import { useAppSelector } from "../../../store/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { getSubSpaceWorkTasks } from "../../../store/workTask/actions/getSubSpaceWorkTasks";

const Space = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const workTask = useAppSelector((state) => state.workTask);

  useEffect(() => {
    // Get data by props.id
    // console.log("SPACE SPACE mounted get");
    dispatch(getSubSpaceWorkTasks(props.id));
  }, [props.id]);

  return (
    <Box
      sx={{
        border: "1 px solid red",
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TasksColumn status={0} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumn status={1} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumn status={2} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumn status={3} />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Space;
