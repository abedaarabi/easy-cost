import React, { FC } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../authContext/components/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";

import { createMaterial, deleteMaterialById } from "../helper/db.fetchMaterial";
import ReusableTable, {
  ColumnFromData,
} from "../../reusableTable/ReusableTable";
import Box from "@mui/material/Box";

import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTableProps,
} from "material-react-table";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";

import { CellTower, ContentCopy, Delete, Edit } from "@mui/icons-material";

import { getUserByCompany, updateUser } from "../helper/db.fetchUser";
import { projectsByCompany } from "../helper/db.fetchProject";
import { operationsByTag } from "../../api/easyCostComponents";
import {
  CreateProjectDto,
  CreateProjectMaterialDto,
  MaterialEntity,
  ProjectEntity,
  UpdateProjectDto,
} from "../../api/easyCostSchemas";

import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const ProjectMaterialTable = () => {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const { projectId }: { projectId: string } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  if (user.length < 1) return null;
  const { companyId, id: userId } = user[0];

  const { isLoading, error, data, isFetching } = useQuery(
    ["materialByProjectId"],
    () =>
      operationsByTag.projectMaterial.projectMaterialControllerFindByProjectId({
        pathParams: { projectId },
      }) as unknown as Promise<CreateProjectMaterialDto[]>
  );

  const colTest = [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      enableHiding: true,
      size: 80,
    },

    {
      accessorKey: "materialName",
      header: "Material Name",
      size: 180,

      // muiTableBodyCellEditTextFieldProps: {
      //   select: true, //change to select for a dropdown
      //   children: materials
      //     ? materials
      //         .sort((a, b) => (a.materialName > b.materialName ? 1 : -1))
      //         .map((state) => (
      //           <MenuItem key={state.id} value={state.materialName}>
      //             {state.materialName}
      //           </MenuItem>
      //         ))
      //     : [],
      // },
      muiTableBodyCellCopyButtonProps: {
        fullWidth: true,
        startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
  ] as MRT_ColumnDef<MaterialEntity>[];

  const dataTable = data
    ? data.map((column) => {
        return {
          ...column,
        };
      })
    : [];

  //Actions
  //delete
  const handleDeleteRow = (row: MRT_Row<CreateProjectMaterialDto>) => {
    console.log(row.original.id);

    if (!confirm(`Are you sure you want to delete ${row.getValue("id")}`)) {
      return;
    }

    // deleteMutation.mutate(row.original.id);
    //send api delete request here, then refetch or update local table data for re-render Delete
  };
  //Create

  const handleCreateNewRow = (values: MaterialEntity) => {
    // createMutation.mutate({ ...values, companyId, userId });
    //send/receive api updates here, then refetch or update local table data for re-render Update
  };

  return (
    <Paper>
      <ReusableTable
        isLoading={isLoading}
        enableStickyFooter
        initialState={{ columnVisibility: { id: false } }}
        columns={colTest}
        data={[]}
        // onEditingRowSave={handleSaveRowEdits}
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)} color="info">
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Fab
            color="info"
            onClick={() => setCreateModalOpen(true)}
            aria-label="add"
            size="small"
          >
            <AddIcon />
          </Fab>
        )}
      />

      <CreateNewAccountModal
        columns={colTest}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </Paper>
  );
};

export default ProjectMaterialTable;
export const CreateNewAccountModal: FC<{
  columns: MRT_ColumnDef<CreateProjectMaterialDto>[];
  onClose: () => void;
  onSubmit: (values: CreateProjectMaterialDto) => void;
  open: boolean;
}> = ({ open, columns, onClose, onSubmit }) => {
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
  const { user } = useAuth();
  const queryClient = useQueryClient();
  if (user.length < 1) return null;
  const { companyId, id: userId } = user[0];
  //   //Fetch Materials
  const { projectId }: { projectId: string } = useParams();
  const {
    isLoading: materialIsLoading,
    error: materialError,
    data: materials,
    isFetching: materialIsFetching,
  } = useQuery(
    ["materialByCompanyId"],
    () =>
      operationsByTag.material.materialControllerFindMaterialByCompanyId({
        pathParams: { companyId },
      }) as unknown as Promise<MaterialEntity[]>
  );
  if (!materials) return null;

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
              .filter((i) => i.accessorKey !== "id")
              .map((column) => {
                if (column.accessorKey === "materialName") {
                  return (
                    <Select
                      key={column.accessorKey}
                      label="userType"
                      value={values["userType"]}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          userType: e.target.value,
                        })
                      }
                    >
                      {materials.map((state) => (
                        <MenuItem key={state.id} value={state.materialName}>
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
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Material
        </Button>
      </DialogActions>
    </Dialog>
  );
};
