import '../../../styles.css';
import { Box, Typography } from '@mui/material';

export interface WindowProps {
  windowTitle?: String
  children?: JSX.Element
}

function CenterWindow(props: WindowProps) {
  const { children, windowTitle } = props;

  return (
    <Box className="TextWindow">
      <Box className = "WindowHeadingContainer">
        <Typography className="WindowHeading">
          {windowTitle}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default CenterWindow;
