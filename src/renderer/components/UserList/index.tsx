import { Box, Stack, Typography } from "@mui/material";

interface User {
  userName: string;
}

interface UserListProps {
  users: ReadonlyArray<User>;
}

function UserList(props: UserListProps) {
  return (
    <Box
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#2C2F33',
        padding: 0,
        borderColor: 'darkgray',
        margin: '0px',
      }}
    >
      <Typography
        sx={{
          fontSize: 'large',
          textAlign: 'center',
          paddingTop: ' 10px',
          fontWeight: 'bold',
          color: '#2E8B57',
        }}
      >
        Online
      </Typography>
      <Stack
        sx={{
          fontSize: 'large',
          textAlign: 'center',
          paddingTop: ' 10px',
          fontWeight: 'bold',
          color: 'lightgrey',
        }}
      >
        {props.users.map((user) => (
          <Typography>{user.userName}</Typography>
        ))}
      </Stack>
    </Box>
  );
};

export default UserList;
