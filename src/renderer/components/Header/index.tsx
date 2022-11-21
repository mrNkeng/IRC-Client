import '../../../styles.css';
import { Box } from "@mui/material";

function Header() {
  return(
    <Box className="Header">
      <span className="heading">
        <Box
          sx={{
            fontSize: 'large',
            textAlign: 'center',
            paddingTop: ' 10px',
            fontWeight: 'bold',
            color: 'lightgrey',
          }}
        >
          AOL Messenger
        </Box>
      </span>
    </Box>
  );
}

export default Header;
