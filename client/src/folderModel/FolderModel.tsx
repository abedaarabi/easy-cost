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
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  CircularProgress,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { Dropzone } from "./DropZone";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { operationsByTag } from "../api/easyCostComponents";
import { useAuth } from "../authContext/components/AuthContext";
import { Params, useParams } from "react-router-dom";
import { StyledTreeItem } from "./StyledList";
import { async } from "@firebase/util";
import { TreeView } from "@mui/lab";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { FilesVersionRoot } from "./types";
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
  getFilePath: (param: any) => void;
}) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { projectId } = useParams<Params<string>>();

  const {
    isLoading,
    isError,
    data,
    isFetching,
  }: {
    data: FilesVersionRoot[] | undefined;
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
  } = useQuery({
    queryKey: ["uploadFileToS3"],

    queryFn: () =>
      operationsByTag.uploadFile.awsControllerFindAllByProjectId({
        pathParams: { projectId: projectId! },
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
  });
  console.log(data);

  const deleteMutationObject = useMutation(
    (id: string) =>
      operationsByTag.uploadFile.awsControllerRemove({
        pathParams: { id },

        headers: { authorization: `Bearer ${user.accessToken}` },
      }),

    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["uploadFileToS3"]);
      },
    }
  );

  const [openAddObject, setOpenAddObject] = React.useState(false);
  const handleClickOpen = () => {
    setOpenModel(true);
  };
  const handleClose = () => {
    setOpenModel(false);
  };

  const totalFileSize = React.useMemo(() => {
    return data
      ?.map((i) => i.filesVersion.reduce((acc, val) => acc + val.size, 0))
      .reduce((acc, val) => acc + val, 0)
      .toFixed(2);
  }, [isLoading, isFetching]);

  if (isLoading) {
    return <Typography>Loading</Typography>;
  }
  if (isError) {
    return <Typography>Error</Typography>;
  }

  async function deleteS3Bucket(objectId: string) {
    deleteMutationObject.mutate(objectId);
  }

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
              justifyContent: "space-between",
              // borderLeft: "#2a9d8f solid 3px",
              // gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                borderLeft: "#ffb703 solid 5px",
                borderTop: "#ffb703 solid 5px",
              }}
            >
              <IconButton
                aria-label="fingerprint"
                color="primary"
                onClick={() => setOpenAddObject(true)}
              >
                <CloudUploadIcon fontSize="large" color="success" />
              </IconButton>

              <Typography variant="body2" ml={2}>
                {totalFileSize && totalFileSize} MB
              </Typography>
            </Box>
            <Typography
              color={"#6c757d"}
              variant="inherit"
              pr={8}
              // sx={{ textDecoration: "underline" }}
            >
              File Storage
            </Typography>
          </Box>

          <TextField
            sx={{ mt: 2 }}
            size="small"
            fullWidth
            id="outlined-basic"
            label="Find Your File"
            variant="outlined"
          />
        </BootstrapDialogTitle>

        <DialogContent
          dividers
          sx={{
            maxWidth: "30rem",
            width: "30rem",
            height: "20rem",
            maxHeight: "25rem",
          }}
        >
          {data?.map((item) => (
            <Box key={item.id} display={"flex"} alignItems={"center"}>
              <Box sx={{ width: "30rem" }}>
                <TreeView
                  defaultCollapseIcon={<ArrowDropDownIcon />}
                  defaultExpandIcon={<ArrowRightIcon />}
                >
                  <StyledTreeItem
                    sx={{ mt: 1 }}
                    labelText={item.fileName.split("=projectId=")[1]}
                    // labelInfo={String(item.size) + " " + "MB"}
                    labelIcon={
                      imageFormat.find((i) => item.fileName.endsWith(i))
                        ? WallpaperIcon
                        : item.fileName.endsWith(".dwf")
                        ? HouseSidingIcon
                        : PictureAsPdfIcon
                    }
                    // bgColor={
                    //   // imageFormat.find((i) => item.fileName.endsWith(i))
                    //   // ? "#2a9d8f"
                    //   // : item.fileName.endsWith(".dwf")
                    //   // ? "#0096c7"
                    //   // : "#e63946"
                    // }
                    iconColor={
                      imageFormat.find((i) => item.fileName.endsWith(i))
                        ? "#2a9d8f"
                        : item.fileName.endsWith(".dwf")
                        ? "#0096c7"
                        : "#e63946"
                    }
                    nodeId={item.id}
                  >
                    {item.filesVersion
                      .sort(
                        (a, b) =>
                          Number(new Date(a.createdAt)) -
                          Number(new Date(b.createdAt))
                      )
                      ?.map((file) => (
                        <Box
                          ml={1}
                          key={file.id}
                          display={"flex"}
                          alignItems={"center"}
                          width={"28rem"}
                        >
                          <StyledTreeItem
                            sx={{ width: "25rem" }}
                            nodeId={file.id}
                            version
                            labelText={convertToDanishTime(file.createdAt)}
                            labelIcon={MoreTimeIcon}
                            labelInfo={`V ${file.versionNumber}`}
                            // color="#1a73e8"
                            // bgColor="#e8f0fe"
                            onClick={() => {
                              const { fileName } = item;
                              getFilePath({ ...file, fileName });
                              handleClose();
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => deleteS3Bucket(item.id)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>
                      ))}
                  </StyledTreeItem>
                </TreeView>
              </Box>
            </Box>
          ))}
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

const imageFormat = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "tiff",
  "ico",
  "heif",
  "avif",
];

// <ListItemButton
//   key={item.id}
//   onClick={() => {
//     getFilePath(item.urlPath);
//     handleClose();
//   }}
// >
//   <ListItemIcon >
//     {imageFormat.find((i) => item.fileName.endsWith(i)) ? (
//       <WallpaperIcon color="secondary" />
//     ) : (
//       <PictureAsPdfIcon color="error" />
//     )}
//   </ListItemIcon>
//   <ListItemText primary={item.fileName} />
// </ListItemButton>

function convertToDanishTime(utcTime: string): string {
  const localTime = new Date(utcTime);
  localTime.setHours(localTime.getHours());

  return localTime.toLocaleString("da-DK");
}
