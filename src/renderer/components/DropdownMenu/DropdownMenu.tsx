import { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import BlockIcon from '@mui/icons-material/Block';

interface DropdownMenuProps {
  lines: Array<string>;
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const { lines } = props;
  const [show, setShow] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const boxWidth = 180;

  // TODO: remove any and get react event type
  const onContextMenu = (event: any, data: string) => {
    event.preventDefault();
    setShow(true);
    let x = event.pageX;
    let y = event.pageY;
    //
    if (window.screen.width <= boxWidth + x) {
      x = window.screen.width - boxWidth;
    }
    setPoints({ x: x, y: y });
  };

  const style = {
    width: boxWidth,
    maxWidth: '50%',
    borderRadius: '5px',
    top: points.y,
    left: points.x,
    position: 'absolute',
  };

  return (
    <>
      {lines.map((line, index) => (
        <Typography
          key={index}
          onContextMenu={(event) => onContextMenu(event, line)}
        >
          {line}
        </Typography>
      ))}
      {show && (
        <Paper sx={style}>
          <MenuList
            sx={{
              backgroundColor: '#383838',
              borderRadius: '5px',
              position: 'absolute',
            }}
          >
            <MenuItem
              sx={{ backgroundColor: '#7289da' }}
              onClick={() => undefined}
            >
              <ListItemText>Message</ListItemText>
              <ListItemIcon>
                <MessageIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>

            <Divider />

            <MenuItem
              sx={{ backgroundColor: '#7289da' }}
              onClick={() => undefined}
            >
              <ListItemText>Block</ListItemText>
              <ListItemIcon>
                <BlockIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        </Paper>
      )}
    </>
  );

};

