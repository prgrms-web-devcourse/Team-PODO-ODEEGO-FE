import { COLORS } from "@/constants/css";
// import { createTheme } from "@mui/system";
import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    kakao: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    kakao: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    kakao: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.mainGreen,
      contrastText: COLORS.backgroundSecondary,
    },
    secondary: {
      main: COLORS.mainOrange,
      contrastText: COLORS.backgroundSecondary,
    },
    neutral: { main: COLORS.borderPrimary, contrastText: COLORS.textPrimary },
    kakao: { main: COLORS.kakao, contrastText: COLORS.textPrimary },
  },
});
