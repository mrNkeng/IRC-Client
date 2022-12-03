import '../../styles.css';
import { Box, Stack, Typography } from "@mui/material";
import { User } from '../../../data-models/interfaces';

interface UserListProps {
  users: ReadonlyArray<User>;
}

function UserList(props: UserListProps) {
  return (
    <Box className="UserList">
      <Typography
        className="FlexColumnHeading"
        sx={{color: '#2E8B57'}}
      >
        Online
      </Typography>

      <Stack>
        {props.users.map((user) => (
          <Typography className="typography" key={user.name}>{user.name}</Typography>
        ))}
      </Stack>

      <Typography
        className="FlexColumnHeading"
        sx={{color: '#2E8B57'}}
      >
        Offline
      </Typography>
      <Stack>
        <Typography className="typography">TODO?</Typography>
      </Stack>
    </Box>
  );
};

export default UserList;
