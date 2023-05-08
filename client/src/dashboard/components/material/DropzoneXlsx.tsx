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
import GridOnIcon from "@mui/icons-material/GridOn";
import * as XLSX from "xlsx";
import LinearProgress from "@mui/material/LinearProgress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";
import { async } from "@firebase/util";
import { Params, useParams } from "react-router-dom";
import { useAuth } from "../../../authContext/components/AuthContext";
import { UpdateMaterialDto } from "../../../api/easyCostSchemas";

interface Prop {
  openAddObject: boolean;
  setOpenAddObject: (value: boolean) => void;
  bucketKey?: string;
}
export function DropzoneXlsx({ openAddObject, setOpenAddObject }: Prop) {
  const [fileName, setFileName] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  //   const queryClient = useQueryClient();
  const { user, setLoginMsg } = useAuth();
  const queryClient = useQueryClient();

  const { projectId } = useParams<Params<string>>();

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = async (evt) => {
      var data = evt?.target?.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      const dataParse = XLSX.utils.sheet_to_json(ws, {}); /* Update state */
      console.log(dataParse);

      const resultData = dataParse.map((row: any) => {
        return {
          ...row,
          companyId: user.companyId,
          userId: user.uid,
        };
      }) as UpdateMaterialDto[];

      if (resultData.length !== 0) {
        try {
          setIsLoading(true);
          const response = await axios({
            method: "post",
            url: `/material/bulk`,
            data: removeDuplicatesByProperty(resultData),
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          });
          if (response.data && response.status === 201) {
            setOpenAddObject(false);

            setIsLoading(false);
            response && queryClient.invalidateQueries(["materialByCompanyId"]);
            setLoginMsg({
              code: 200,
              msg: `Materials Successfully Added to Database.`,
            });
          }
        } catch (error: any) {
          if (error) {
            setLoginMsg({
              code: error.response?.status,

              msg: `Code Error:  ${
                error.response?.status
              }. ${error.response?.statusText.toLocaleLowerCase()} some of the material already exist in the database`,
            });
            setIsLoading(false);
          }
        }
      }
    };
    reader.readAsBinaryString(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "excel/xlsx": [".xlsx"],
    },
  });

  return (
    <Dialog open={openAddObject}>
      <DialogTitle> Upload Material</DialogTitle>

      <Box sx={{ width: "30rem", height: "10rem" }}>
        {isLoading && <LinearProgress />}
        <Box
          {...getRootProps()}
          sx={{
            m: "auto",
            backgroundColor: "lightgray",

            height: "10rem",
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
          <GridOnIcon fontSize={"large"} color="success" />
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

function removeDuplicatesByProperty(materials: UpdateMaterialDto[]) {
  const filteredMaterials = materials.reduce(
    (acc: UpdateMaterialDto[], curr: UpdateMaterialDto) => {
      if (
        !acc.find(
          (m: UpdateMaterialDto) => m.materialName === curr.materialName
        )
      ) {
        acc.push(curr);
      }
      return acc;
    },
    []
  );
  return filteredMaterials;
}
