import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import TasksColumns from "../tasks-columns/TasksColumns";

const SubProjectContent = (props: any) => {
  return (
    <Box
      sx={{
        border: "1 px solid red",
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TasksColumns Status={0} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumns Status={1} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumns Status={2} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumns Status={3} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SubProjectContent;
