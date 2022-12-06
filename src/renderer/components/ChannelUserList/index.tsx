import '../../styles.css';
import { Box, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Stack, Typography } from "@mui/material";
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import BlockIcon from '@mui/icons-material/Block';

const ChannelUserList = observer(() => {
  const { channelUsers } = getStore();
  const [show, setShow] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  const boxWidth = 180;

  const onContextMenu = (event: any, user: string) => {
    event.preventDefault();
    setShow(true);
    let x = event.pageX;
    let y = event.pageY;
    //
    if (window.screen.width <= boxWidth + x) {
      x = window.screen.width - boxWidth;
    }
    setPoints({ x: x, y: y });
  }

  const onBlock = () => {

  }

  const onMessage = () => {

  }


  const contextMenuStyle = { width: boxWidth, maxWidth: '50%', borderRadius: '5px', top: points.y, left: points.x, position: "absolute"}



  return (
    <Box className="UserList">
      {show && (
        <Paper sx={contextMenuStyle}>
        <MenuList sx= {{ backgroundColor: '#383838', borderRadius: '5px', position:'absolute'}}>
          <MenuItem sx= {{ backgroundColor: '#7289da'}} onClick={onMessage}>
            <ListItemText>Message</ListItemText>
            <ListItemIcon >
              <MessageIcon fontSize="small" />
            </ListItemIcon>
          </MenuItem>

          <Divider />

          <MenuItem sx= {{ backgroundColor: '#7289da'}} onClick={onBlock}>
            <ListItemText>Block</ListItemText>
            <ListItemIcon>
              <BlockIcon fontSize="small"/>
            </ListItemIcon>
          </MenuItem>


        </MenuList>
      </Paper>
      )}
      <Typography
        className="FlexColumnHeading"
      >
        Channel Users
      </Typography>
      <Typography
        className="FlexColumnHeading"
        sx={{color: '#2E8B57'}}
      >
        Online
      </Typography>

      <Stack>
        {channelUsers.map((user) => (
          <Typography  onContextMenu={(event) => onContextMenu(event, user)} className="typography" key={user}>{user}</Typography>
        ))}
      </Stack>

      <Typography
        className="FlexColumnHeading"
        sx={{color: '#2E8B57'}}
      >
        Away
      </Typography>
      <Stack>

      </Stack>
    </Box>
  );
});

export default ChannelUserList

// const fdfd = (props: UserListProps) => {
//   const [show, setShow] = useState(false);
//   const [points, setPoints] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleClick = () => setShow(false);
//     window.addEventListener('click', handleClick);
//     return () => window.removeEventListener('click', handleClick);
//   }, []);

//   const boxWidth = 180;
//   // TODO: remove any and get react event type
//   const onContextMenu = (event: any, user: User) => {
//       event.preventDefault();
//       setShow(true);
//       let x = event.pageX;
//       let y = event.pageY;
//       //
//       if (window.screen.width <= boxWidth + x) {
//         x = window.screen.width - boxWidth;
//       }
//       setPoints({ x: x, y: y });
//   }

//   const onMessage = () => {
//     console.log("sending message")
//   }

//   const onBlock = () => {

//   }

//   const style = { width: boxWidth, maxWidth: '50%', borderRadius: '5px', top: points.y, left: points.x, position: "absolute"}

//   return (
//     <Box style={{ margin: "0px", padding: "0px" }}>
//       <Typography sx={{fontSize: 'large',
//             textAlign: 'center',
//             paddingTop:' 10px',
//             fontWeight: 'bold',
//             color: '#2E8B57' }} >Online</Typography>
//       <Stack sx={{fontSize: 'large',
//             textAlign: 'center',
//             paddingTop:' 10px',
//             fontWeight: 'bold',
//             color: 'lightgrey' }} >
//         {props.users.map((user, index) => (
//           <Typography key={index} onContextMenu={(event) => onContextMenu(event, user)}>{user.userName}</Typography>
//         ))}
//         {show && (
//         <Paper sx={style}>
//         <MenuList sx= {{ backgroundColor: '#383838', borderRadius: '5px', position:'absolute'}}>
//           <MenuItem sx= {{ backgroundColor: '#7289da'}} onClick={onMessage}>
//             <ListItemText>Message</ListItemText>
//             <ListItemIcon >
//               <MessageIcon fontSize="small" />
//             </ListItemIcon>
//           </MenuItem>

//           <Divider />

//           <MenuItem sx= {{ backgroundColor: '#7289da'}} onClick={onBlock}>
//             <ListItemText>Block</ListItemText>
//             <ListItemIcon>
//               <BlockIcon fontSize="small"/>
//             </ListItemIcon>
//           </MenuItem>


//         </MenuList>
//       </Paper>
//       )}
//       </Stack>
//     </Box>
//   );
// };
