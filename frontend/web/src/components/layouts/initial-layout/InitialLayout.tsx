import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import SignIn from "../../pages/sign-in/SignIn";
import SignUp from "../../pages/sign-up/SignUp";

const theme = createTheme();

export default function InitialLayout() {
  const [mode, setMode] = useState<boolean>();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {mode ? (
          <SignIn changeMode={setMode} />
        ) : (
          <SignUp changeMode={setMode} />
        )}
      </Grid>
    </ThemeProvider>
  );
}
