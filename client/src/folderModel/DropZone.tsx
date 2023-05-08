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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { operationsByTag } from "../api/easyCostComponents";
import { useAuth } from "../authContext/components/AuthContext";
import axios, { AxiosError } from "axios";
import { async } from "@firebase/util";
import { Params, useParams } from "react-router-dom";

interface Prop {
  openAddObject: boolean;
  setOpenAddObject: (value: boolean) => void;
  bucketKey?: string;
}
export function Dropzone({ openAddObject, setOpenAddObject }: Prop) {
  const [fileName, setFileName] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  //   const queryClient = useQueryClient();

  const { user, setLoginMsg } = useAuth();
  const queryClient = useQueryClient();

  const { projectId } = useParams<Params<string>>();

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setIsLoading(true);
    setFileName(acceptedFiles[0].path);
    // Do something with the files
    const fileInput = acceptedFiles[0];

    let formData = new FormData();

    formData.append("file", fileInput);
    formData.append("originalname", fileInput.name);

    if (fileInput) {
      try {
        const response = await axios({
          method: "post",
          url: `/api/${projectId}/upload-file`,
          data: formData,
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        });
        if (response.data && response.status === 201) {
          console.log({ response });

          queryClient.invalidateQueries({ queryKey: ["uploadFileToS3"] });

          setIsLoading(false);
          setLoginMsg({
            code: 200,
            msg: `File Successfully Added to Database.`,
          });
          setOpenAddObject(false);
        }
        console.log({ response });
      } catch (error: AxiosError | any) {
        setLoginMsg({
          code: error.response?.status,

          msg: `Code Error:  ${
            error.response?.status
          }. ${error.response?.statusText.toLocaleLowerCase()} File already exist`,
        });
        setOpenAddObject(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "drawing/pdf": [".pdf", ".jpg", ".jpeg", ".png", ".dwf"],

      //   "ifc/ifc": [".ifc"],
      // "pdf/pdf": [".pdf"],
    },
  });

  return (
    <Dialog open={openAddObject}>
      <DialogTitle> Upload PDF file</DialogTitle>

      <Box sx={{ width: "30rem", height: "22rem" }}>
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
