import * as React from "react";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";
import { useAuth } from "../authContext/components/AuthContext";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

interface Props {
  severity: any;
  msg: string;
}
export interface State extends SnackbarOrigin {
  open: boolean;
}
export const Alerts: React.FC<Props> = ({ severity, msg }) => {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  // const handleClose = () => {
  //   setState({ ...state, open: false });
  // };
  return (
    <Snackbar
      autoHideDuration={6000}
      sx={{ width: 600 }}
      anchorOrigin={{ vertical, horizontal }}
      open={true}
      // onClose={handleClose}
    >
      <Alert sx={{ width: "100%" }} severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  );
};
