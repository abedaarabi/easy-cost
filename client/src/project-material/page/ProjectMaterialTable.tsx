import React, { FC } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { useAuth } from "../../authContext/components/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";

import ReusableTable from "../../reusableTable/ReusableTable";
import Box from "@mui/material/Box";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTableProps,
} from "material-react-table";
import {
  Badge,
  Button,
  darken,
  Fab,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { ContentCopy, Delete, Edit } from "@mui/icons-material";

import { operationsByTag } from "../../api/easyCostComponents";
import {
  CreateProjectMaterialDto,
  MaterialEntity,
  ProjectMaterialEntity,
  UpdateProjectMaterialDto,
  UpdateTableCustomFieldDto,
} from "../../api/easyCostSchemas";
import { Params, useParams } from "react-router-dom";
import { ProjecTMaterialTest } from "../../dashboard/types";
import { projectMaterial } from "../../dashboard/helper/db.fetchProjectmaterial";
import { CreateNewAccountModal } from "../components/CreateNewAccountModal";
import { findById } from "../helper/customFunctions";
import { MySelect } from "../components/MySelect";
import { CustomFields } from "../components/CustomFields";
import CommentDialog from "../components/CommentDialog";
import TemporaryDrawer from "../components/CommentsDrawer";

const ProjectMaterialTable = () => {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [mIds, setMid] = React.useState<{ mId: string }>();

  const { projectId } = useParams<Params<string>>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  if (user.length < 1 || !projectId) return null;
  const { companyId, id: userId } = user[0];

  //Model
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleSliderOpen = () => {
    setOpenDrawer(true);
  };
  const toggleSliderClose = () => {
    setOpenDrawer(false);
  };

  const [projectMaterialId, setProjectMaterialId] = React.useState("");

  const { isLoading, error, data, isFetching } = useQuery(
    ["materialByProjectId"],
    () =>
      operationsByTag.projectMaterial.projectMaterialControllerFindByProjectId({
        pathParams: { projectId },
      }) as unknown as Promise<ProjecTMaterialTest[]>
  );

  const { data: customFields } = useQuery(
    ["customFieldsTable"],
    () =>
      operationsByTag.tableCustomFields.tableCustomFieldsControllerFindCustomFieldsByProjectId(
        {
          pathParams: { projectId },
        }
      ) as unknown as Promise<UpdateTableCustomFieldDto[]>
  );

  const updateMutation = useMutation(
    ({ id, values }: { id: string; values: UpdateProjectMaterialDto }) =>
      operationsByTag.projectMaterial.projectMaterialControllerUpdate({
        pathParams: { id },
        body: {
          materialId: mIds?.mId,
          projectId: projectId,
          profit: Number(values.profit),
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["materialByProjectId"]);
      },
    }
  );

  const updateMaterialStatus = useMutation(
    ({ id, values }: { id: string; values: UpdateProjectMaterialDto }) =>
      operationsByTag.projectMaterial.projectMaterialControllerUpdate({
        pathParams: { id },
        body: {
          status: !values.status,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["materialByProjectId"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (id: string) =>
      operationsByTag.projectMaterial.projectMaterialControllerRemove({
        pathParams: { id },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["materialByProjectId"]);
      },
    }
  );

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

  const createMutation = useMutation(projectMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries(["materialByProjectId"]);
    },
  });

  if (!data || !materials || !customFields) return null;
  const projectName = data[0]?.project?.projectName;

  const colTest = name(data, setMid, materials, updateMaterialStatus);

  // const colTest = [
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //     enableColumnOrdering: false,
  //     enableEditing: false, //disable editing on this column
  //     enableSorting: false,
  //     enableHiding: false,
  //     size: 80,
  //   },

  //   {
  //     accessorKey: "materialName",
  //     header: "Material Name",
  //     size: 100,
  //     Edit: ({ row, table }) => (
  //       <MySelect
  //         defaultValue={findById(data, row.original.id)!.materialId}
  //         materials={materials}
  //         onChange={(value) => setMid({ mId: value })}
  //       />
  //     ),

  //     muiTableBodyCellCopyButtonProps: {
  //       fullWidth: true,
  //       startIcon: <ContentCopy />,
  //       sx: { justifyContent: "flex-start" },
  //     },
  //   },
  //   {
  //     accessorKey: "unit",
  //     header: "Unit",
  //     enableEditing: false, //disable editing on this column
  //     enableSorting: false,
  //     enableHiding: false,
  //     size: 100,
  //   },

  //   {
  //     accessorKey: "profit",
  //     header: "Amount",
  //     size: 100,
  //   },
  //   {
  //     accessorKey: "status",
  //     enableEditing: false, //disable editing on this column
  //     enableHiding: false,
  //     header: "Status",
  //     size: 100,
  //     Cell: ({ cell, row }) => (
  //       <Box>
  //         <Button
  //           onClick={() => {
  //             console.log(!row.original.status, "$$$$$");

  //             updateMaterialStatus.mutate({
  //               id: row.original.id,
  //               values: row.original,
  //             });
  //           }}
  //           variant="outlined"
  //           color={!row.original.status ? "error" : "success"}
  //         >
  //           {cell.getValue<string>() ? "approved" : "not approved"}
  //         </Button>
  //         {/* <Avatar alt="Remy Sharp" src="" />
  //         <Typography>{cell.getValue<string>()}</Typography> */}
  //       </Box>
  //     ),
  //   },

  //   {
  //     accessorKey: "createdAt",
  //     enableEditing: false, //disable editing on this column
  //     enableSorting: false,
  //     enableHiding: false,
  //     header: "Create Date",
  //     size: 100,
  //   },
  // ] as MRT_ColumnDef<ProjecTMaterialTest>[];

  const dataTable = data
    ? data.map((column) => {
        return {
          materialName: column?.material?.materialName,
          unit: column.material.unit,
          createdAt: new Date(column.createdAt).toLocaleDateString(),
          id: column.id,
          profit: column.profit,
          status: column.status,
        };
      })
    : [];

  //Actions
  //delete
  const handleDeleteRow = (row: MRT_Row<ProjecTMaterialTest>) => {
    if (
      !confirm(
        `Are you sure you want to delete [${row.getValue("materialName")}]`
      )
    ) {
      return;
    }

    deleteMutation.mutate(row.original.id);
  };
  //Create

  const handleCreateNewRow = (values: CreateProjectMaterialDto) => {
    createMutation.mutate({
      projectId,
      ...values,
    });
    //send/receive api updates here, then refetch or update local table data for re-render Update
  };
  const handleSaveRowEdits: MaterialReactTableProps<ProjecTMaterialTest>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      //send/receive api updates here, then refetch or update local table data for re-render Update
      updateMutation.mutate({ id: values.id, values });
      delete values["materialName"];
      exitEditingMode();
    };

  return (
    <>
      <Paper sx={{ mb: 3, p: 1, textAlign: "center" }}>
        <Typography variant="h4" component="h4" color={"#011627"}>
          {projectName}
        </Typography>
      </Paper>
      <Paper>
        <ReusableTable
          enableColumnDragging
          muiTableHeadCellProps={{
            align: "center",
          }}
          muiTableBodyCellProps={{
            color: "white",
            align: "center",
          }}
          // muiTableBodyProps={{
          //   sx: (theme) => ({
          //     "& tr:nth-of-type(odd)": {
          //       backgroundColor: darken(theme.palette.background.paper, 0.1),
          //     },
          //   }),
          // }}
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
                <IconButton
                  onClick={() => {
                    table.setEditingRow(row);
                  }}
                  color="info"
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Add Comment">
                <IconButton
                  color="primary"
                  onClick={() => {
                    setProjectMaterialId(row.original.id);

                    toggleSliderOpen();
                  }}
                >
                  {/* variant="dot" */}
                  <Badge badgeContent={4} color="secondary">
                    <InsertCommentIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Box sx={{ pl: 2, display: "flex", gap: 2 }}>
              <Fab
                color="info"
                onClick={() => setCreateModalOpen(true)}
                aria-label="add"
                size="small"
              >
                <AddIcon />
              </Fab>
              {/* <Fab
                color="success"
                onClick={() => {
                  handleOpen();
                }}
                aria-label="add"
                size="small"
              >
                <LibraryAddIcon />
              </Fab> */}
            </Box>
          )}
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
        />

        <CreateNewAccountModal
          columns={colTest}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
          materials={materials}
        />

        <CustomFields
          projectId={projectId}
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
        />

        <TemporaryDrawer
          projectId={projectId}
          projectMaterialId={projectMaterialId}
          userId={userId}
          openDrawer={openDrawer}
          toggleSliderOpen={toggleSliderOpen}
          toggleSliderClose={toggleSliderClose}
        />
      </Paper>
    </>
  );
};

export default ProjectMaterialTable;

function name(
  data: { id: string }[],
  setMid: {
    (value: React.SetStateAction<{ mId: string } | undefined>): void;
    (arg0: { mId: string }): void;
  },
  materials: MaterialEntity[],
  updateMaterialStatus: UseMutationResult<
    ProjectMaterialEntity,
    unknown,
    { id: string; values: UpdateProjectMaterialDto },
    unknown
  >
) {
  return [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      enableHiding: false,
      size: 80,
    },

    {
      accessorKey: "materialName",
      header: "Material Name",
      size: 100,
      Edit: ({ row, table }) => (
        <MySelect
          defaultValue={findById(data, row.original.id)!.materialId}
          materials={materials}
          onChange={(value) => setMid({ mId: value })}
        />
      ),

      muiTableBodyCellCopyButtonProps: {
        fullWidth: true,
        startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      accessorKey: "unit",
      header: "Unit",
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      enableHiding: false,
      size: 100,
    },

    {
      accessorKey: "profit",
      header: "Amount",
      size: 100,
    },
    {
      accessorKey: "status",
      enableEditing: false, //disable editing on this column
      enableHiding: false,
      header: "Status",
      size: 100,
      Cell: ({ cell, row }) => (
        <Box>
          <Button
            onClick={() => {
              console.log(!row.original.status, "$$$$$");

              updateMaterialStatus.mutate({
                id: row.original.id,
                values: row.original,
              });
            }}
            variant="outlined"
            color={!row.original.status ? "error" : "success"}
          >
            {cell.getValue<string>() ? "approved" : "not approved"}
          </Button>
          {/* <Avatar alt="Remy Sharp" src="" />
          <Typography>{cell.getValue<string>()}</Typography> */}
        </Box>
      ),
    },

    {
      accessorKey: "createdAt",
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      enableHiding: false,
      header: "Create Date",
      size: 100,
    },
  ] as MRT_ColumnDef<ProjecTMaterialTest>[];
}
