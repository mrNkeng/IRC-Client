import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import flexbox from '@mui/system';
import Button from '@mui/material/Button';
import { Container, Grid, Stack } from '@mui/material';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from './Login';
import DiamondIcon from '@mui/icons-material/Diamond';
interface SignupProps {}

type Direction = 'col' | 'row';

interface SpacerProps {
  spaceMultiplier: number;
  direction: Direction;
}

const Spacer = (props: SpacerProps) => {
  const { spaceMultiplier, direction } = props;
  const spaceing = 4 * (spaceMultiplier ?? 1);
  const style = {
    [direction === 'row' ? 'width' : 'height']: Math.max(0, spaceing),
  };
  return <div style={style}></div>;
};

export const Signup = (props: SignupProps) => {
  return (
    //we can style this correctly later :P

    //reagan changed spacing, couldn't figure out proper alignment yet
    //will wait till we moved the styling to its own file
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '	#1e2124',
        position: 'absolute',
        top: '20px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '35vh',
            width: '25vw',
            margin: '2px',
          }}
        >
          {/* blue box */}
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '30px',

              padding: '20px 30px',
              backgroundColor: '#7289da',
              margin: '10px',
            }}
          >
            <span className="heading">
              <Box
                sx={{
                  fontSize: 'large',
                  paddingTop: ' 10px',
                  fontWeight: 'bold',
                  color: 'lightgrey',
                }}
              >
                AOL Messenger
              </Box>
            </span>
            <DiamondIcon sx={{ fontSize: 100 }} />{' '}
            <Spacer spaceMultiplier={2} direction="col" />
            <Spacer spaceMultiplier={1} direction="col" />
            <TextField label="Email Address" variant="outlined" />
            <Spacer spaceMultiplier={2} direction="col" />
            <TextField label="Mobile Number" variant="outlined" />
            <Spacer spaceMultiplier={2} direction="col" />
            <TextField label="Full Name" variant="outlined" />
            <Spacer spaceMultiplier={2} direction="col" />
            <TextField label="Username" variant="outlined" />
            <Spacer spaceMultiplier={2} direction="col" />
            <TextField label="Password" variant="outlined" />
            <Spacer spaceMultiplier={2} direction="col" />
            <Button
              onClick={() => {
                alert("you're signed in");
              }}
              size="small"
              variant="outlined"
            >
              Sign Up
            </Button>
          </FormControl>
        </Box>

        <Spacer spaceMultiplier={2} direction="col" />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '8vh',
            width: '25vw',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '30px',
              padding: '30px',
              backgroundColor: '#7289da',
            }}
          >
            <span className="heading">
              <Box
                sx={{
                  fontSize: 'large',
                  paddingTop: ' 10px',
                  fontWeight: 'bold',
                  color: 'lightgrey',
                }}
              >
                Already have an account?
              </Box>
            </span>
            <Link to="/Login" className="btn btn-primary">
              Login
            </Link>
          </FormControl>
        </Box>
      </Stack>
    </Box>
  );
};
