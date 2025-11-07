import { AppThemeOptions } from '@mui/material';

const baseTheme: AppThemeOptions = {
  spacing: 4,
  typography: {
    fontFamily: "'Roboto Mono', monospace",
  },
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      md: 800,
      lg: 1280,
      xl: 1696,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          backgroundColor: 'background.paper',
          '& svg': {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
};

export const lightTheme: AppThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      light: '#757ce8',
      main: '#CC3363',
      dark: '#bf2857',
      contrastText: 'white',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
    },
    background: {
      default: '#FAFBFC',
    },
    text: {
      primary: '#000000',
    },
  },
};

export const darkTheme: AppThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#CC3363',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      // contrastText: '#000',
    },
    background: {
      default: '#010203',
    },
    text: {
      primary: '#ffffff',
    },
  },
};
