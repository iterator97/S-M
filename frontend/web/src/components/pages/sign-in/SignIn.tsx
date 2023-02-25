import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../../store/common/actions/singInAction";
import { AppDispatch } from "../../../store/store";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { ISignIn } from "../../../models";

interface SingInProps {
  changeMode?: any;
}

const SignIn = (props: SingInProps) => {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signedIn = useAppSelector((state) => state.common.signedIn);

  const onSignInClick = () => {
    let signInValues: ISignIn = {
      email: email,
      password: password,
    };
    dispatch(signInAction(signInValues)).then(() => {
      if (signedIn) {
        return navigate("/dashboard");
      }
    });
  };

  return (
    <>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSignInClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button onClick={() => props.changeMode(false)}>
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default SignIn;
