import {
  CreateProjectMaterialDto,
  MaterialEntity,
} from "../../api/easyCostSchemas";

import { MRT_ColumnDef } from "material-react-table";
import React, { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

export const CreateNewAccountModal: FC<{
  columns: MRT_ColumnDef<Record<string, any>>[];
  onClose: () => void;
  materials: MaterialEntity[];
  onSubmit: (values: CreateProjectMaterialDto) => void;
  open: boolean;
}> = ({ open, columns, onClose, onSubmit, materials }) => {
  const [values, setValues] = React.useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  if (!columns) {
    return null;
  }

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Material</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "400px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns
              .filter(
                (i) =>
                  i.accessorKey !== "id" &&
                  i.accessorKey !== "unit" &&
                  i.accessorKey !== "createdAt" &&
                  i.accessorKey !== "status"
              )
              .map((column, i) => {
                if (column.accessorKey === "materialName") {
                  return (
                    <Select
                      key={column.accessorKey}
                      label="materialId"
                      value={
                        values["materialId"] ||
                        findById(materials, materials[0].id)?.id
                      }
                      onChange={(e) => {
                        setValues({
                          ...values,
                          materialId: e.target.value,
                        });
                      }}
                      renderValue={(value) => {
                        return findById(materials, value)?.materialName;
                      }}
                    >
                      {materials
                        .sort((a, b) =>
                          a.materialName > b.materialName ? 1 : -1
                        )
                        .map((state) => (
                          <MenuItem key={state.id} value={state.id}>
                            {state.materialName}
                          </MenuItem>
                        ))}
                    </Select>
                  );
                }
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                      delete values["materialName"];
                    }}
                  />
                );
              })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Select Material
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function findById<T extends { id: string }>(entities: Array<T>, id: string) {
  return entities.find((anEntity) => anEntity.id === id);
}
