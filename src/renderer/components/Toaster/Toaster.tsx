import { Alert, Snackbar } from "@mui/material";
import { observer } from "mobx-react";
import { getNotificationState } from "renderer/state";

export const Toaster = observer(() => {
    const { toast } = getNotificationState()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      toast.display = false
    };

    const vertical = "top";
    const horizontal = "center";
    return (
        <>
            <Snackbar open={toast.display} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleClose} severity={toast.type} sx={{ width: '100%' }}>
                    {toast?.message}
                </Alert>
            </Snackbar>
        </>
    );
});