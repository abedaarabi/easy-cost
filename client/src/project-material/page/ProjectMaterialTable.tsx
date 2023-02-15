import React, { FC } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { useAuth } from "../../authContext/components/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
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
import { Viewer } from "../../viewer/ForgeViewer";
import { Stack } from "@mui/system";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.primary,
}));

const ProjectMaterialTable = () => {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [mIds, setMid] = React.useState<{ mId: string }>();

  const { projectId } = useParams<Params<string>>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  if (user.length < 1 || !projectId) return null;
  const { companyId, id: userId } = user;

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
      }) as unknown as Promise<ProjecTMaterialTest[]> | undefined
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

  const updateMutation = useMutation(
    ({ id, values }: { id: string; values: UpdateProjectMaterialDto }) =>
      operationsByTag.projectMaterial.projectMaterialControllerUpdate({
        pathParams: { id },
        body: {
          materialId: mIds?.mId,
          projectId: projectId,
          ...values,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["materialByProjectId"]);
      },
      onError: (error: AxiosError) => {
        console.log(error.message);
        console.log(error.status);
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

  const createMutation = useMutation(projectMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries(["materialByProjectId"]);
    },
  });

  // const projectName = data[0]?.project?.projectName;

  // const colTest = name(data, setMid, materials, updateMaterialStatus);

  const colTest = React.useMemo<MRT_ColumnDef<ProjecTMaterialTest>[]>(
    () => name(data, setMid, materials, updateMaterialStatus),

    []
  );
  if (!data || !materials) return null;
  const dataTable = data?.map((column) => {
    return {
      materialName: column?.material?.materialName,
      unit: column.material.unit,
      createdAt: new Date(column.createdAt).toLocaleDateString(),
      id: column.id,
      quantity: column.quantity,
      price: column.material.price,
      hourPerQuantity: column.material.hourPerQuantity,
    };
  });

  // const dataTable = React.useMemo(
  //   () =>
  //     data?.map((column) => {
  //       console.log(column);

  //       return {
  //         materialName: column?.material?.materialName,
  //         unit: column.material.unit,
  //         createdAt: new Date(column.createdAt).toLocaleDateString(),
  //         id: column.id,
  //         quantity: column.quantity,
  //         price: column.material.price,
  //         hourPerQuantity: column.material.hourPerQuantity,
  //       };
  //     }),
  //   []
  // );

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
      <Stack
        sx={{}}
        direction={{ xs: "column", sm: "column" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
      >
        <Item sx={{ flex: 20, overflow: "auto" }}>
          <Box
            sx={{
              height: "25rem",

              position: "relative",
            }}
          >
            <Viewer />
          </Box>
        </Item>
        <Box sx={{ flex: 1, mt: 1 }}>
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
            initialState={{
              columnVisibility: { id: false },
              density: "compact",
            }}
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
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
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
                <Fab
                  color="inherit"
                  onClick={() => {
                    alert(projectId);
                  }}
                  aria-label="add"
                  size="small"
                >
                  <SendIcon fontSize="small" />
                </Fab>
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
          {/* <TemporaryDrawer
            projectId={projectId}
            projectMaterialId={projectMaterialId}
            userId={userId}
            openDrawer={openDrawer}
            toggleSliderOpen={toggleSliderOpen}
            toggleSliderClose={toggleSliderClose}
          /> */}
        </Box>
      </Stack>
    </>
  );
};

export default ProjectMaterialTable;

function name(
  data: {
    materialId: string;
    id: string;
  }[],
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
      accessorKey: "quantity",
      header: "Quantity",

      size: 100,
    },
    {
      accessorKey: "price",
      header: "Total Price",
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      enableHiding: false,

      size: 100,

      Cell: ({ cell, column, row, table }) => {
        return row.original.quantity * row.original.price;
      },
      aggregationFn: "sum",

      Footer: ({ table, column, footer }) => {
        return (
          <Stack>
            Total:
            <Box color="#1B998B">{convertCurrency(200)}</Box>
          </Stack>
        );
      },
    },
    {
      accessorKey: "hourPerQuantity",
      header: "Total Hours",
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      enableHiding: false,
      size: 100,

      Cell: ({ cell, column, row, table }) => {
        // if (row.original.unit === "mm") {
        //   (row.original.quantity / 1000) * row.original.hourPerQuantity;
        // }

        return row.original.quantity * row.original.hourPerQuantity;
      },
      aggregationFn: "sum",

      Footer: ({ table, column, footer }) => {
        console.log({ table, column, footer });

        //I need to access the result of each row in the *hourPerQuantity* so can accumulate the result in the footer

        return (
          <Stack>
            Total:
            <Box color="#1B998B">{"Total hours"}</Box>
          </Stack>
        );
      },
    },
    // {
    //   accessorKey: "hours",
    //   header: "Total Hours",
    //   size: 100,

    //   Cell: ({ cell, column, row, table }) => {
    //     return row.original.quantity * row.original.material.;
    //   },
    // },

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

//Action to add comments

//  <Tooltip arrow placement="right" title="Add Comment">
//    <IconButton
//      color="primary"
//      onClick={() => {
//        setProjectMaterialId(row.original.id);

//        toggleSliderOpen();
//      }}
//    >
//      {/* variant="dot" */}
//      <Badge badgeContent={4} color="secondary">
//        <InsertCommentIcon />
//      </Badge>
//    </IconButton>
//  </Tooltip>;

export function convertCurrency(currency: number) {
  // return currency.toFixed(2);
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  }).format(currency);
}

// const { data: customFields } = useQuery(
//   ["customFieldsTable"],
//   () =>
//     operationsByTag.tableCustomFields.tableCustomFieldsControllerFindCustomFieldsByProjectId(
//       {
//         pathParams: { projectId },
//       }
//     ) as unknown as Promise<UpdateTableCustomFieldDto[]>
// );
