import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  FormControlLabel,
  FormLabel,
  Icon,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { createTableCustomField } from "../helper/db.fetchCustomFields";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  boxShadow: 24,
  p: 4,
};

export function CustomFields({
  handleClose,
  handleOpen,
  open,
  projectId,
}: {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
  projectId: string;
}) {
  if (!projectId) return null;
  const queryClient = useQueryClient();

  const [formInput, setFormInput] = React.useState<{
    [key: string]: string;
  }>({});

  const createMutation = useMutation(createTableCustomField, {
    onSuccess: () => {
      queryClient.invalidateQueries(["customFieldsTable"]);
    },
  });

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(formInput);

    createMutation.mutate({
      projectId: projectId,
      columnName: formInput["fieldName"],
      columnType: formInput["fieldType"],
      customFieldValue: { price: 99 },
    });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          minWidth: "800",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Field Name"
            id="margin-normal"
            name="fieldName"
            required
            onChange={handleInput}
          />
          <Box>
            <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleInput}
            >
              <FormControlLabel
                value="number"
                control={<Radio />}
                label="Number"
                name="fieldType"
              />

              <FormControlLabel
                value="string"
                control={<Radio />}
                label="Text"
                name="fieldType"
              />
            </RadioGroup>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Subscribe
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
