import React, { FC } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../authContext/components/AuthContext";
import AddIcon from "@mui/icons-material/Add";

import {
  createMaterial,
  deleteMaterialById,
  getMaterialByCompany,
  updateMaterial,
} from "../helper/db.fetchMaterial";
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
  Autocomplete,
  Avatar,
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
} from "@mui/material";
import Button from "@mui/material/Button";
import { CellTower, ContentCopy, Delete, Edit } from "@mui/icons-material";

import { operationsByTag } from "../../api/easyCostComponents";
import { MaterialEntity } from "../../api/easyCostSchemas";

const MaterialTable = () => {
  const queryClient = useQueryClient();
  const { user, setLoading, loading } = useAuth();
  const { companyId, id: userId } = user[0];

  const { isLoading, error, data, isFetching } = useQuery(
    ["materialByCompanyId"],
    () =>
      operationsByTag.material.materialControllerFindMaterialByCompanyId({
        pathParams: { companyId },
      }) as unknown as Promise<MaterialEntity[]>
  );

  const deleteMutation = useMutation(
    (id: string) =>
      operationsByTag.material.materialControllerRemove({
        pathParams: { id },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["materialByCompanyId"]);
      },
    }
  );

  const updateMutation = useMutation(updateMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries(["materialByCompanyId"]);
    },
  });
  const createMutation = useMutation(createMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries(["materialByCompanyId"]);
    },
  });

  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  console.log({ isLoading, error, data, isFetching });

  if (!data) return null;

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
      accessorKey: "image",
      header: "Image",
      size: 80,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({}),
      Cell: ({ cell, row }) => (
        <Box>
          <Avatar alt="Remy Sharp" src="" />
          {/* <Typography>{cell.getValue<string>()}</Typography> */}
        </Box>
      ),
    },

    {
      accessorKey: "materialName",
      header: "Material Name",
      size: 180,

      muiTableBodyCellEditTextFieldProps: {
        select: true, //change to select for a dropdown
        children: data
          ? data
              .sort((a, b) => (a.materialName > b.materialName ? 1 : -1))
              .map((state) => (
                <MenuItem key={state.id} value={state.materialName}>
                  {state.materialName}
                </MenuItem>
              ))
          : [],
      },
      muiTableBodyCellCopyButtonProps: {
        fullWidth: true,
        startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 140,
      Cell: ({ cell }) => (
        <Box
          sx={({}) => ({
            // bgcolor: cell.getValue<number>() ? "tomato" : "lightblue",

            color: "#0F5257",
            borderRadius: 5,
          })}
        >
          {cell.getValue<number>().toLocaleString()}
        </Box>
      ),
    },
    {
      accessorKey: "unit",
      header: "Unit",
      size: 100,
      muiTableBodyCellEditTextFieldProps: {
        select: true,
        children: ["m2", "mm", "feet", "inch", "m3", "stk"].map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        )),
      },
    },
    {
      accessorKey: "priceUnit",
      header: "Price Unit",
      size: 140,
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      size: 140,
      Cell: ({ cell }) => (
        <Box
          sx={({}) => ({
            bgcolor: "#5C95FF",
            p: "6px",
            color: "white",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
          })}
        >
          <Box>{cell.getValue<string>().toLocaleString()}</Box>
        </Box>
      ),
    },
    {
      accessorKey: "workByhour",
      header: "Work Hour",
      size: 140,
    },
  ] as MRT_ColumnDef<Omit<MaterialEntity, "companyId" | "userId" | "Id">>[];

  const dataTable = data
    ? data.map((column) => {
        return {
          createdAt: column.createdAt,
          id: column.id,
          image: column.image,
          materialName: column.materialName,
          price: column.price,
          priceUnit: column.priceUnit,
          supplier: column.supplier,
          unit: column.unit,
          workByhour: column.workByhour,
        };
      })
    : [];

  //delete
  const handleDeleteRow = (
    row: MRT_Row<Omit<MaterialEntity, "companyId" | "userId" | "Id">>
  ) => {
    console.log(row.original.id);

    if (
      !confirm(
        `Are you sure you want to delete ${row.getValue("materialName")}`
      )
    ) {
      return;
    }

    deleteMutation.mutate(row.original.id);
    //send api delete request here, then refetch or update local table data for re-render Delete
  };

  const handleCreateNewRow = (values: MaterialEntity) => {
    createMutation.mutate({ ...values, companyId, userId });
    //send/receive api updates here, then refetch or update local table data for re-render Update
  };

  const handleSaveRowEdits: MaterialReactTableProps<
    typeof dataTable[0]
  >["onEditingRowSave"] = async ({ exitEditingMode, row, values }) => {
    //send/receive api updates here, then refetch or update local table data for re-render Update

    console.log(values);
    updateMutation.mutate(values);
    exitEditingMode();
  };

  return (
    <Paper>
      <ReusableTable
        isLoading={isLoading}
        enableStickyFooter
        initialState={{ columnVisibility: { id: false } }}
        columns={colTest}
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
        columns={colTest}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </Paper>
  );
};

export default MaterialTable;

export const CreateNewAccountModal: FC<{
  columns: MRT_ColumnDef<Omit<MaterialEntity, "companyId" | "userId" | "Id">>[];
  onClose: () => void;
  onSubmit: (values: MaterialEntity) => void;
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
                if (column.accessorKey == "unit") {
                  return (
                    <Select
                      key={column.accessorKey}
                      label="Unit"
                      value={values["unit"]}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          unit: e.target.value,
                        })
                      }
                    >
                      {["m2", "mm", "feet", "inch", "m3", "stk"].map(
                        (state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  );
                } else {
                  return (
                    <TextField
                      key={column.accessorKey}
                      label={column.header}
                      name={column.accessorKey}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  );
                }
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
