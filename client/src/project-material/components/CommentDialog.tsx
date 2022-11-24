import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface CommentDialogProps {
  commentDialogOpen: boolean;
  setCommentDialogOpen?: () => boolean;
  handleCloseCommentDialog: () => void;
  projectId?: string;
  projectMaterialId?: string;
  userId?: string;
}

export default function CommentDialog({
  commentDialogOpen,
  userId,
  handleCloseCommentDialog,
  projectId,
  projectMaterialId,
}: CommentDialogProps) {
  const [commentsTextFields, setCommentsTextsFields] = React.useState<string>();

  function addCommentToDb() {
    if (!commentsTextFields) {
      alert("Can not dd empty text ");
      return;
    }
    console.log({ projectId, projectMaterialId, commentsTextFields, userId });
    handleCloseCommentDialog();
    setCommentsTextsFields("");
  }

  return (
    <div>
      <Dialog
        fullWidth
        open={commentDialogOpen}
        onClose={handleCloseCommentDialog}
      >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          <DialogContentText>Please add your comment here.</DialogContentText>
          <TextField
            rows={4}
            multiline
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            type="text"
            fullWidth
            onChange={(e) => setCommentsTextsFields(e.target.value)}
            // variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCloseCommentDialog}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="success" onClick={addCommentToDb}>
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
