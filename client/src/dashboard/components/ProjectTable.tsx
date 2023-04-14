import React, { FC } from "react";
import "./style.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../authContext/components/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import TimelineIcon from "@mui/icons-material/Timeline";
import { createMaterial, deleteMaterialById } from "../helper/db.fetchMaterial";
import ReusableTable, {
  ColumnFromData,
} from "../../reusableTable/ReusableTable";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";
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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { CellTower, ContentCopy, Delete, Edit } from "@mui/icons-material";

// import { getUserByCompany, updateUser } from "../helper/db.fetchUser";
import { projectsByCompany } from "../helper/db.fetchProject";
import { operationsByTag } from "../../api/easyCostComponents";
import {
  CreateProjectDto,
  ProjectEntity,
  UpdateProjectDto,
} from "../../api/easyCostSchemas";
import { AxiosError } from "axios";

const ProjectTable = () => {
  const navigate = useNavigate();
  const { user, setLoginMsg } = useAuth();
  const queryClient = useQueryClient();
  if (user.length < 1) return null;
  const { companyId, id: userId } = user;

  const { isLoading, isError, data, isFetching } = useQuery(
    ["userByCompanyId"],
    () =>
      operationsByTag.project.projectControllerProjectsByCompanyId({
        headers: { authorization: `Bearer ${user.accessToken}` },
      }) as unknown as Promise<ProjectEntity[]>
  );

  const deleteMutation = useMutation(
    (id: string) =>
      operationsByTag.project.projectControllerRemove({
        pathParams: { id },
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userByCompanyId"]);
      },
    }
  );

  const updateMutation = useMutation(
    ({ id, value }: { id: string; value: UpdateProjectDto }) =>
      operationsByTag.project.projectControllerUpdate({
        pathParams: { id },

        headers: { authorization: `Bearer ${user.accessToken}` },

        body: {
          companyId: value.companyId,
          createdAt: value.createdAt,

          id: value.id,
          projectName: value.projectName,
          userId: value.userId,
          isActive: Boolean(value.isActive),
          location: value.location,
        },
      }),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["userByCompanyId"]);
        response && queryClient.invalidateQueries(["materialByCompanyId_test"]);
        setLoginMsg({
          code: 200,
          msg: `Successfully ${response.projectName} Info Saved to Database.`,
        });
      },
      onError: (error: AxiosError) => {
        if (error) {
          setLoginMsg({
            code: error.response?.status,

            msg: `Code Error:  ${
              error.response?.status
            }. ${error.response?.statusText.toLocaleLowerCase()}`,
          });
        }
      },
    }
  );
  const createMutation = useMutation(
    (values: ProjectEntity) =>
      operationsByTag.project.projectControllerCreate({
        body: { ...values },
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),

    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["userByCompanyId"]);
        response && queryClient.invalidateQueries(["materialByCompanyId_test"]);
        setLoginMsg({
          code: 200,
          msg: `Successfully ${response.projectName} added to Database.`,
        });
      },
      onError: (error: AxiosError) => {
        if (error) {
          setLoginMsg({
            code: error.response?.status,

            msg: `Code Error:  ${
              error.response?.status
            }. ${error.response?.statusText.toLocaleLowerCase()}`,
          });
        }
      },
    }
  );

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
      accessorKey: "isActive",
      header: "Active",
      size: 100,
      Cell: ({ cell, row, table, column }) => {
        // console.log({ cell, row, table, column });
        const status = cell.row.original.isActive;

        return (
          <Box ml={5}>
            {status ? (
              <Box className="ring-container">
                <Box className="ringring"></Box>
                <Box className="circle"></Box>
              </Box>
            ) : (
              <Box className="ring-container-red">
                <Box className="ringring-red"></Box>
                <Box className="circle-red"></Box>
              </Box>
            )}
          </Box>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Create Date",
      size: 100,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 100,
    },
  ] as MRT_ColumnDef<CreateProjectDto>[];

  const dataTable = data.map((column) => {
    // return ({ ...column } = column);
    return {
      projectName: column.projectName,
      isActive: column.isActive,
      location: column.location,
      id: column.id,
      createdAt: new Date(column.createdAt).toLocaleDateString(),
    };
  }) as CreateProjectDto[];

  const handleDeleteRow = (row: MRT_Row<CreateProjectDto>) => {
    if (
      !confirm(`Are you sure you want to delete ${row.getValue("projectName")}`)
    ) {
      return;
    }
    deleteMutation.mutate(row.original.id);
    //send api delete request here, then refetch or update local table data for re-render Delete
  };

  const handleCreateNewRow = (values: ProjectEntity) => {
    createMutation.mutate({
      ...values,
      companyId,
      userId,
      isActive: true,
    });
    //send/receive api updates here, then refetch or update local table data for re-render Update
  };

  const handleSaveRowEdits: MaterialReactTableProps<ProjectEntity>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      //send/receive api updates here, then refetch or update local table data for re-render Update

      updateMutation.mutate({
        id: values.id,
        value: { ...values, companyId },
      });
      exitEditingMode();
    };

  if (isLoading) {
    return <h3>Loading</h3>;
  }
  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <Box>
      <Typography variant="h6" color={"#2c2c34"} mb={1}>
        All Projects:
      </Typography>
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
                <Edit color="action" />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Visit Project">
              <Link to={`${row.getValue("id")}`}>
                <IconButton
                  color="error"
                  onClick={() => {
                    console.log(row.getValue("id"));
                    // navigate();
                  }}
                >
                  <TimelineIcon color="success" />
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        )}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            header: "Actions", //change header text
            size: 100, //make actions column wider
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Fab
            color="success"
            onClick={() => setCreateModalOpen(true)}
            aria-label="add"
            size="small"
          >
            <AddIcon />
          </Fab>
        )}
        muiTablePaperProps={{
          sx: {
            borderRadius: "5px",

            border: "1px  #e0e0e0 ",
          },
        }}
        muiTopToolbarProps={{
          sx: {
            borderRadius: "5px",
            bgcolor: "#81b29a",
            height: 80,
            border: "5px  #e0e0e0 ",
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            borderRadius: "5px",
            bgcolor: "#99c1b9",

            border: "5px  #e0e0e0 ",
          },
        }}
        muiTableContainerProps={{
          sx: { height: "65vh", maxHeight: "65vh" },
        }}
      />

      <CreateNewAccountModal
        columns={projectColumn}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </Box>
  );
};

export default ProjectTable;

export const CreateNewAccountModal: FC<{
  columns: MRT_ColumnDef<CreateProjectDto>[];
  onClose: () => void;
  onSubmit: (values: CreateProjectDto) => void;
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
              .filter(
                (i) => i.accessorKey !== "id" && i.accessorKey !== "createdAt"
              )
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
