import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Button, Stack, Tooltip } from '@mui/material';

interface Props {

}

export const ServerPlus = (props: Props) => {
return(
  <Tooltip
            title={"Add Server"}
            key={"Add Server"}
            placement="right"
            arrow
          >
<Button component={Link} to="/ServerList"
style={{width:'35px',
height:'55px',
borderRadius:'50px',
fontSize:'10px',
backgroundColor:'#1e2124',
color:"white",
transition:'0.2s all',
boxShadow:'0 0 5px black',
}} > <AddIcon/>

  </Button>
  </Tooltip>

)
}
