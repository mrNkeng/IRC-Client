import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';
import { getStore } from 'renderer/state';
interface Props {

}

export const Settingsbutton = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };


  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const logUserOut = (event: Event | React.SyntheticEvent) => {
    handleClose(event)
    getStore().logout()
    window.electron.ipcRenderer.sendMessage('logout', []);
    navigate("*")

  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const style2 = { color:"white"}
  return (

    <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{height:"30px"}}
        >
          <SettingsIcon sx={{paddingBottom:"10px", fontSize: '250%',}}/>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper sx={{backgroundColor:"#1e2124"}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList

                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}

                  >
                    <MenuItem component={Link} to="/Accountsettings" onClick={handleClose}>
                      <Typography sx={{color:"white"}}>Account Settings</Typography></MenuItem>
                    <MenuItem onClick={handleClose}><Typography sx={{color:"white"}}>Dark Mode </Typography>< DarkModeIcon sx={{color:"white"}}/></MenuItem>
                    <MenuItem onClick={logUserOut} > <Typography sx={{color:"white"}}>Sign Out</Typography> <LogoutIcon sx={{color:"white"}}/></MenuItem>

                    {/* <MenuItem onClick={handleClose}>Alert Volume</MenuItem> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>
  );
}
