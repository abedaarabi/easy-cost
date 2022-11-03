import React, { FC } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../authContext/components/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";

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
import { ColumnTypeUser } from "../types";
import { getUserByCompany, updateUser } from "../helper/db.fetchUser";

const UserTable = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  if (user.length < 1) return null;
  const { companyId, id: userId } = user[0];

  const { isLoading, error, data, isFetching } = useQuery(
    ["userByCompanyId"],
    () => getUserByCompany(companyId)
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

  const userColumn = [
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
      accessorKey: "avatar",
      header: "Avatar",
      size: 80,
      Cell: ({ cell, row }) => (
        <Box>
          <Avatar alt="Remy Sharp" src="" />
          {/* <Typography>{cell.getValue<string>()}</Typography> */}
        </Box>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 180,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 140,
    },

    {
      accessorKey: "userType",
      header: "User Type",
      size: 80,
      muiTableBodyCellEditTextFieldProps: {
        select: true, //change to select for a dropdown
        children: ["CompanyUser", "Client", "CompanyAdmin"].map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        )),
      },
      Cell: ({ cell }) => (
        <Box
          sx={({}) => ({
            bgcolor:
              cell.getValue<string>() === "CompanyAdmin"
                ? "#F52F57"
                : cell.getValue<string>() === "CompanyUser"
                ? "#0F5257"
                : "#5C95FF",
            p: "6px",
            display: "flex",
            justifyContent: "center",
            color: "white",
            borderRadius: 5,
          })}
        >
          <Box>{cell.getValue<string>()}</Box>
        </Box>
      ),
    },
  ] as MRT_ColumnDef<ColumnTypeUser>[];

  const dataTable = data.map((column) => {
    return ({ ...column } = column);
  });

  const handleDeleteRow = (row: MRT_Row<ColumnTypeUser>) => {
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

  const handleCreateNewRow = (values: ColumnTypeUser) => {
    console.log({ values });

    // createMutation.mutate({ ...values, companyId, userId });
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
    <>
      <ReusableTable
        // isLoading={{ isLoading: false }}
        enableStickyFooter
        initialState={{ columnVisibility: { id: false } }}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enablePinning
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <p>Comments:</p>
            {["apple", "banana", "tomato"].map((items) => (
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  width: "100%",
                  bgcolor: "yellowgreen",
                  color: "white",
                }}
              >
                {items}
              </Box>
            ))}
          </Box>
        )}
        // enableClickToCopy
        columns={userColumn}
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
        columns={userColumn}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

export default UserTable;

export const CreateNewAccountModal: FC<{
  columns: MRT_ColumnDef<ColumnTypeUser>[];
  onClose: () => void;
  onSubmit: (values: ColumnTypeUser) => void;
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
                if (column.accessorKey == "userType") {
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
                      {["CompanyUser", "Client", "CompanyAdmin"].map(
                        (state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        )
                      )}
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
          Create New User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const userData = [
  {
    id: "01e93273-bd90-4349-9cb0-5f3c8b97e729",
    name: "Jaskolski and Sons",

    email: "abma@moe.dk",
    avatar: "Direct Assurance Manager",

    userType: "CompanyAdmin",
    companyId: "4afd4f4e-7371-454a-99ce-657fa5bdc904",
  },
  {
    id: "02b96f16-8960-4059-953f-f353f66618f0",
    name: "Barrows LLC",
    email: "Serena72@hotmail.com",
    avatar: "Human Division Representative",

    userType: "CompanyAdmin",
    companyId: "70fab6fa-0a9a-4ec4-a637-73e923df7293",
  },
  {
    id: "046fe40b-4422-47c5-8218-036610222f4f",
    name: "Medhurst LLC",
    email: "Kathleen30@hotmail.com",
    avatar: "Chief Creative Supervisor",

    userType: "Client",
    companyId: "fbe63868-181d-4225-a273-cbd58cc973b9",
  },
];
