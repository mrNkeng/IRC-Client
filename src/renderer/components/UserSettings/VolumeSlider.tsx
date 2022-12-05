import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

const Input = styled(MuiInput)`
  width: 42px;
`;

interface Props {
  update: (value: number) => void
  value: number
}

export const VolumeSlider = (props: Props) => {
  const { update, value } = props;
  // const [value, setValue] = React.useState<number | string | Array<number | string>>(
  //   30,
  // );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    // setValue(newValue);
    update(Number(newValue))
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    update(Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      update(0);
    } else if (value > 100) {
      update(100);
    }
  };

  return (
    <Box sx={{ width: 300, paddingLeft: "30px", paddingTop:"40px", backgroundColor: "#7289da", paddingBottom:"40px", paddingRight:"40px"}}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
