import '../../../styles.css';
import { Box } from "@mui/material";

function Header() {
  return(
    <Box className="Header">
      <span className="heading">
        <Box className="FlexColumnHeading">
          AOL Messenger
        </Box>
      </span>
    </Box>
  );
}

export default Header;
