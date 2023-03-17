import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import LinearProgress from "@mui/material/LinearProgress";

interface Prop {
  openAddObject: boolean;
  setOpenAddObject: (value: boolean) => void;
  bucketKey?: string;
}
export function Dropzone({ openAddObject, setOpenAddObject }: Prop) {
  const [fileName, setFileName] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    setIsLoading(true);
    setFileName(acceptedFiles[0].path);
    // Do something with the files
    const fileInput = acceptedFiles[0];
    var formData = new FormData();
    formData.append("name", fileInput.name);
    formData.append("bucketKey", "bucketKey");
    formData.append("file", fileInput);
    console.log(fileInput);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "drawing/pdf": [".pdf"],
      //   "ifc/ifc": [".ifc"],
      // "pdf/pdf": [".pdf"],
    },
  });

  return (
    <Dialog open={openAddObject}>
      <DialogTitle> Upload PDF file</DialogTitle>

      <Box sx={{ width: "22rem", height: "20rem" }}>
        {isLoading && <LinearProgress />}
        <Box
          {...getRootProps()}
          sx={{
            m: "auto",
            backgroundColor: "lightgray",

            height: "20rem",
            borderRadius: "6px",
            border: "1px dashed black",
            margin: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <input {...getInputProps()} />
          <PictureAsPdfIcon fontSize={"large"} color="error" />
          <Typography>{fileName}</Typography>
        </Box>
      </Box>

      <DialogActions sx={{ pt: 3 }}>
        <Button
          endIcon={<CancelIcon />}
          onClick={() => setOpenAddObject(false)}
          variant="outlined"
          color="error"

          //   disabled={isLoading}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
