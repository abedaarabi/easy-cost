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
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";

import { CellTower, ContentCopy, Delete, Edit } from "@mui/icons-material";
import { ColumnTypeProject, ColumnTypeUser } from "../types";
import { getUserByCompany, updateUser } from "../helper/db.fetchUser";
import { projectsByCompany } from "../helper/db.fetchProject";

const ProjectTable = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  if (user.length < 1) return null;
  const { companyId, id: userId } = user[0];

  const { isLoading, error, data, isFetching } = useQuery(
    ["userByCompanyId"],
    () => projectsByCompany(companyId)
  );
  const deleteMutation = useMutation(deleteMaterialById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userByCompanyId"]);
    },
  });
  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userByCompanyId"]);
    },
  });
  const createMutation = useMutation(createMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userByCompanyId"]);
    },
  });

  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  if (!data) return null;

  const projectColumn = [
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
      accessorKey: "projectName",
      header: "Project Name",
      size: 80,
    },
    {
      accessorKey: "workByhour",
      header: "work By Hour",
      size: 180,
    },
  ] as MRT_ColumnDef<ColumnTypeProject>[];

  const dataTable = data.map((column) => {
    return ({ ...column } = column);
  });

  const handleDeleteRow = (row: MRT_Row<ColumnTypeProject>) => {
    console.log(row.original.id);

    if (
      !confirm(
        `Are you sure you want to delete ${row.getValue("materialName")}`
      )
    ) {
      return;
    }
    // deleteMutation.mutate(row.original.id);
    //send api delete request here, then refetch or update local table data for re-render Delete
  };

  const handleCreateNewRow = (values: ColumnTypeProject) => {
    console.log({ values });

    // createMutation.mutate({ ...values, companyId, userId });
    //send/receive api updates here, then refetch or update local table data for re-render Update
  };

  const handleSaveRowEdits: MaterialReactTableProps<ColumnTypeProject>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      //send/receive api updates here, then refetch or update local table data for re-render Update

      console.log(values);

      exitEditingMode();
    };

  return (
    <>
      <ReusableTable
        // isLoading={{ isLoading: false }}
        enableStickyFooter
        initialState={{ columnVisibility: { id: false } }}
        // enableClickToCopy
        columns={projectColumn}
        data={dataTable}
        onEditingRowSave={handleSaveRowEdits}
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
        columns={projectColumn}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

export default ProjectTable;

export const CreateNewAccountModal: FC<{
  columns: MRT_ColumnDef<ColumnTypeProject>[];
  onClose: () => void;
  onSubmit: (values: ColumnTypeProject) => void;
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

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
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
          Create New User
        </Button>
      </DialogActions>
    </Dialog>
  );
};
