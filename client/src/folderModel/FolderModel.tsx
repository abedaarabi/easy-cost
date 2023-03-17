import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/system";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { Dropzone } from "./DropZone";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
    // borderTop: "#8d99ae solid 2px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,

            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function FolderModel({
  openModel,
  setOpenModel,
  getFilePath,
}: {
  openModel: boolean;
  setOpenModel: (param: boolean) => void;
  getFilePath: (param: string) => void;
}) {
  const [openAddObject, setOpenAddObject] = React.useState(false);
  const handleClickOpen = () => {
    setOpenModel(true);
  };
  const handleClose = () => {
    setOpenModel(false);
  };

  return (
    <div>
      <BootstrapDialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModel}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mt: 2,
            }}
          >
            <IconButton
              aria-label="fingerprint"
              color="primary"
              onClick={() => setOpenAddObject(true)}
            >
              <CloudUploadIcon fontSize="large" color="success" />
            </IconButton>
            <Typography variant="overline">Files Storage</Typography>
          </Box>
        </BootstrapDialogTitle>

        <DialogContent
          dividers
          sx={{
            width: "20rem",
            height: "20rem",
            maxHeight: "25rem",
            overflow: "scroll",
          }}
        >
          <TextField
            size="small"
            fullWidth
            id="outlined-basic"
            label="Find Your File"
            variant="outlined"
          />
          <Box>
            {pdfFiles.map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => {
                  getFilePath(item.path);
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <PictureAsPdfIcon color="error" />
                </ListItemIcon>
                <ListItemText primary={item.fileName} />
              </ListItemButton>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Open Drawing
          </Button> */}
        </DialogActions>
      </BootstrapDialog>

      {openAddObject && (
        <Dropzone
          openAddObject={openAddObject}
          setOpenAddObject={setOpenAddObject}
        />
      )}
    </div>
  );
}

const pdfFiles = [
  {
    id: 1,
    fileName: "STU Project Stuen--01",
    path: "../../pdf.pdf",
  },
  {
    id: 2,
    fileName: "STU Project Stuen--02",
    path: "../../test.pdf",
  },
];
