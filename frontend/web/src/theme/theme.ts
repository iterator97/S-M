import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }

const theme = createTheme({
    status: {
      danger: orange[500],
    },
  });