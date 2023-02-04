import React, { FC } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
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
import {
  createUser,
  getUserByCompany,
  updateUser,
} from "../helper/db.fetchUser";
import { operationsByTag } from "../../api/easyCostComponents";
import {
  UpdateUserDto,
  UserEntity,
  CreateUserDto,
} from "../../api/easyCostSchemas";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  if (user.length < 1) return null;
  const { companyId, id: userId } = user;
  // const companyId = "86656b02-5dbc-4d20-8127-5a4f08741eb3";

  const { isLoading, error, data, isFetching } = useQuery(
    ["userByCompanyId"],
    () =>
      operationsByTag.user.userControllerFindUserByCompanyId({
        pathParams: { companyId },
      }) as unknown as Promise<UserEntity[]>
  );

  const deleteMutation = useMutation(
    (id: string) =>
      operationsByTag.user.userControllerRemove({ pathParams: { id } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userByCompanyId"]);
      },
    }
  );

  const updateMutation = useMutation(
    ({ id, value }: { id: string; value: UpdateUserDto }) =>
      operationsByTag.user.userControllerUpdate({
        pathParams: { id },
        body: { ...value },
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userByCompanyId"]);
      },
    }
  );

  const createMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userByCompanyId"]);
    },
  });

  // const createMutation = useMutation(
  //   operationsByTag.user.userControllerCreate,
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["userByCompanyId"]);
  //     },
  //   }
  // );

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
    // {
    //   accessorKey: "avatar",
    //   header: "Avatar",
    //   // size: 80,
    //   Cell: ({ cell, row }) => (
    //     <Box>
    //       <Avatar alt="Remy Sharp" src="" />
    //       {/* <Typography>{cell.getValue<string>()}</Typography> */}
    //     </Box>
    //   ),
    // },
    {
      accessorKey: "name",
      header: "Name",
      // size: 120,
    },
    {
      accessorKey: "email",
      header: "Email",
      // size: 140,
    },

    {
      accessorKey: "userType",
      header: "User Type",
      // size: 80,
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
  ] as MRT_ColumnDef<UpdateUserDto>[];

  const dataTable = data.map((column) => {
    return ({ ...column } = column);
  });

  const handleDeleteRow = (row: MRT_Row<UpdateUserDto>) => {
    if (!row.original.id) return;
    console.log(row.original.id);
    if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
      return;
    }
    deleteMutation.mutate(row.original.id);
    //send api delete request here, then refetch or update local table data for re-render Delete
  };

  const handleCreateNewRow = (values: Omit<CreateUserDto, "id">) => {
    console.log({ ...values, companyId });
    // navigate(`/company/${companyId}/type/${values.userType}/sing-up`);

    createMutation.mutate({
      ...values,
      companyId,
    });
    //send/receive api updates here, then refetch or update local table data for re-render Update
  };

  const handleSaveRowEdits: MaterialReactTableProps<UpdateUserDto>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      //send/receive api updates here, then refetch or update local table data for re-render Update
      console.log({ values });

      updateMutation.mutate({ id: values.id, value: { ...values, companyId } });
      exitEditingMode();
    };

  return (
    <>
      <ReusableTable
        // isLoading={{ isLoading: false }}

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
                key={items}
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
  columns: MRT_ColumnDef<UpdateUserDto>[];
  onClose: () => void;
  onSubmit: (values: Omit<CreateUserDto, "id">) => void;
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
      <DialogTitle textAlign="center">Create New User</DialogTitle>
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
