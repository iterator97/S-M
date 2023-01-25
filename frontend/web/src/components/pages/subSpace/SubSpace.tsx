import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TasksColumn } from "../../organisms";
import { Container } from "@mui/material";

const SubSpace = (props: any) => {
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
            <TasksColumn Status={0} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumn Status={1} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumn Status={2} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumn Status={3} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SubSpace;
