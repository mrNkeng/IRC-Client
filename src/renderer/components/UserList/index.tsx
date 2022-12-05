import '../../styles.css';
import { Box, Stack, Typography } from "@mui/material";
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';

const UserList = observer(() => {
  const store = getStore();

  return (
    <Box className="UserList">
      <Typography
        className="FlexColumnHeading"
        sx={{color: '#2E8B57'}}
      >
        Online
      </Typography>

      <Stack>
        {store.users.map((user) => (
          <Typography className="typography" key={user}>{user}</Typography>
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

export default UserList;
