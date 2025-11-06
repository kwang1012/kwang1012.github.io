import { BreakpointsOptions, PaletteOptions, Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface AppTheme extends Theme {
    palette: PaletteOptions & {
      background: {
        secondary?: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface AppThemeOptions extends ThemeOptions {
    palette?: PaletteOptions & {
      background: {
        secondary?: string;
      };
    };
  }
  export function createTheme(options?: AppThemeOptions): AppTheme;
}
