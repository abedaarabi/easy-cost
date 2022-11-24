import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { Avatar, IconButton, makeStyles, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommentDialog from "./CommentDialog";
import { OpenInBrowser } from "@mui/icons-material";

interface CommentDialogProps {
  commentDrawerOpen?: boolean;
  setCommentDrawerOpen?: () => boolean;
  handleCloseDrawer?: () => void;
  toggleSliderClose?: () => void;
  toggleSliderOpen?: () => void;
  projectId?: string;
  projectMaterialId?: string;
  userId?: string;
  openDrawer: boolean;
}

export default function TemporaryDrawer({
  openDrawer,
  handleCloseDrawer,
  commentDrawerOpen,
  setCommentDrawerOpen,
  toggleSliderClose,
  toggleSliderOpen,
  projectId,
  projectMaterialId,
  userId,
}: CommentDialogProps) {
  //CommentDialog
  const [commentDialogOpen, setCommentDialogOpen] = React.useState(false);

  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
  };
  const handleOpenCommentDialog = () => setCommentDialogOpen(true);

  return (
    <>
      {/* <Button onClick={OpenInBrowser}>Open</Button> */}
      <Drawer
        sx={{
          "& .MuiPaper-root": {
            width: 400,
            borderLeft: 5,
            borderColor: "#2a9d8f",
            bgcolor: "#edf2f4",
            mt: 8.5,
            // opacity: 0.9,
          },
        }}
        anchor={"right"}
        open={openDrawer}
        onClose={toggleSliderClose}
        variant="persistent"
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton color="primary" onClick={toggleSliderClose}>
            <CloseIcon color="error" fontSize="large" />
          </IconButton>
          <Button
            sx={{
              mr: 1,
            }}
            onClick={handleOpenCommentDialog}
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
          >
            Add New Comment
          </Button>
        </Box>
        <Box
          sx={{
            m: 1,
            p: 1,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            bgcolor: "#0077b6",
            borderLeft: 5,
            borderColor: "#ef476f",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            {/* <IconButton color="primary">
              <MarkunreadIcon color="disabled" fontSize="large" />
            </IconButton> */}

            <Avatar alt="Remy Sharp" src="" />
          </Box>

          <Typography color={"white"} width={350} variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
          </Typography>
        </Box>
      </Drawer>

      <CommentDialog
        commentDialogOpen={commentDialogOpen}
        handleCloseCommentDialog={handleCloseCommentDialog}
        projectId={projectId}
        projectMaterialId={projectMaterialId}
        userId={userId}
      />
    </>
  );
}
