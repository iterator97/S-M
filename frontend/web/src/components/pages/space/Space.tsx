import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

const Space = (props: any) => {
  useEffect(() => {
    // Get data by props.id
  }, []);

  return (
    <Box
      sx={{
        border: "1 px solid red",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          1
        </Grid>
        <Grid item xs={4}>
          2
        </Grid>
        <Grid item xs={4}>
          3
        </Grid>
      </Grid>
    </Box>
  );
};

export default Space;
function styled(Paper: any) {
  throw new Error("Function not implemented.");
}
