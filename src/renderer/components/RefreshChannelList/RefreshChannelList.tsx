import { Refresh } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { getStore } from "renderer/state";

export const RefreshChannelList = () => {
  const { selectedServer } = getStore()
  const refresh = () => {
    window.electron.ipcRenderer.sendMessage('refreshChannelList', [selectedServer]);
  }

  return (
    <Tooltip title={'Refresh'} key={'Refresh'} placement="right" arrow>
      <Button
        onClick={refresh}
        style={{
          width: '35px',
          height: '55px',
          borderRadius: '50px',
          fontSize: '10px',
          backgroundColor: '#1e2124',
          color: 'white',
          transition: '0.2s all',
          boxShadow: '0 0 5px black',
        }}
      >
        {' '}
        <Refresh />
      </Button>
    </Tooltip>
  );
};

