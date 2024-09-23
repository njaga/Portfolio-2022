declare module '@mui/styles' {
  import { Theme } from '@mui/material/styles';
  export function makeStyles(styles: any): (props?: any) => Record<string, string>;
  export function useTheme(): Theme;
}
