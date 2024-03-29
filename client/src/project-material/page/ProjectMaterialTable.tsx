import React, { FC } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
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
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTableProps,
  MRT_Column,
} from "material-react-table";
import { SiAutodesk } from "react-icons/si";
import { ImPencil2 } from "react-icons/im";

import {
  Badge,
  Button,
  CircularProgress,
  darken,
  Fab,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { ContentCopy, Delete, Edit } from "@mui/icons-material";

import { operationsByTag } from "../../api/easyCostComponents";
import {
  CreateDocumentMeasureDto,
  CreateMarkupDto,
  CreateProjectMaterialDto,
  MaterialEntity,
  ProjectMaterialEntity,
  UpdateDocumentMeasureDto,
  UpdateFileVersionDto,
  UpdateMarkupDto,
  UpdateProjectMaterialDto,
  UpdateTableCustomFieldDto,
} from "../../api/easyCostSchemas";
import { Params, useParams, useSearchParams } from "react-router-dom";

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
import FolderModel from "../../folderModel/FolderModel";
import { Retryer } from "react-query/types/core/retryer";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.primary,
}));

const ProjectMaterialTable = () => {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [folderModel, setFolderModel] = React.useState(false);
  const [path, setPath] = React.useState<{
    urlPath: string;
    id: string;
    unit: string;
    size: number;
    scale: number;
  }>({
    urlPath: "",
    id: "",
    unit: "",
    size: 0,
    scale: 0,
  });
  const [pageNumber, setPageNumber] = React.useState<number>();
  const [versionNumber, setVersionNumber] =
    React.useState<
      Partial<UpdateFileVersionDto & { fileName: string | undefined }>
    >();
  const [mIds, setMid] = React.useState<{ mId: string }>();

  const forwardViewer = React.useRef<
    Autodesk.Viewing.GuiViewer3D | undefined
  >();

  const { projectId } = useParams<Params<string>>();
  const { user, setLoginMsg } = useAuth();
  const queryClient = useQueryClient();
  if (user.length < 1 || !projectId) return null;
  const { companyId, id: userId } = user;
  //checked

  const [isCheckedState, setIsCheckedState] = React.useState({
    viewer: true,
    table: true,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedState({
      ...isCheckedState,
      [event.target.name]: event.target.checked,
    });
  };

  //Model
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isLoading, error, data, isFetching } = useQuery(
    ["materialByProject"],
    () =>
      operationsByTag.projectMaterial.projectMaterialControllerFindByProjectId({
        pathParams: { projectId },
        headers: { authorization: `Bearer ${user.accessToken}` },
      }) as unknown as Promise<ProjecTMaterialTest[]> | undefined
  );
  const { data: projectById, isLoading: projectIdIsLoading } = useQuery(
    ["projectById"],
    () =>
      operationsByTag.project.projectControllerFindOne({
        pathParams: { id: projectId },
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
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
        headers: { authorization: `Bearer ${user.accessToken}` },
      }) as unknown as Promise<MaterialEntity[]>
  );

  const updateMutation = useMutation(
    ({ id, values }: { id: string; values: UpdateProjectMaterialDto }) =>
      operationsByTag.projectMaterial.projectMaterialControllerUpdate({
        pathParams: { id },
        headers: { authorization: `Bearer ${user.accessToken}` },

        body: {
          materialId: mIds?.mId,
          projectId: projectId,
          quantity: values.quantity,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["materialByProject"]);
      },
      onError: (error: AxiosError) => {

      },
    }
  );

  const deleteMutation = useMutation(
    (id: string) =>
      operationsByTag.projectMaterial.projectMaterialControllerRemove({
        pathParams: { id },
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["materialByProject"]);
      },
    }
  );

  const createMutation = useMutation(
    (values: CreateProjectMaterialDto) =>
      operationsByTag.projectMaterial.projectMaterialControllerCreate({
        body: values,
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["materialByProject"]);

        setLoginMsg({
          code: 200,
          msg: `Material Successfully Added to Database.`,
        });
      },

      onError: (error: AxiosError) => {
        console.log({ error });

        setLoginMsg({
          code: error.response?.status,

          msg: `Code Error:  ${
            error.response?.status
          }. ${error.response?.statusText.toLocaleLowerCase()}`,
        });
      },
    }
  );

  // Markups

  const createMarkups = useMutation(
    (values: CreateMarkupDto) =>
      operationsByTag.markups.markupsControllerCreate({
        body: values,
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: (response) => {
        setLoginMsg({
          code: 200,
          msg: `Measures Successfully Added to Database.`,
        });
      },

      onError: (error: AxiosError) => {
        console.log({ error });

        setLoginMsg({
          code: error.response?.status,

          msg: `Code Error:  ${
            error.response?.status
          }. ${error.response?.statusText.toLocaleLowerCase()}`,
        });
      },
    }
  );

  if (isLoading || projectIdIsLoading || materialIsLoading) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-50px",
          marginLeft: "-50px",
          width: "100px",
          height: "100px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data || !materials || !projectById) {
    return null;
  }

  const colTest = name(data, setMid, materials);

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
      materialId: values.materialId,
      projectId,
      createdAt: values.createdAt,
      quantity: values.quantity,
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

  function getFilePath(filePath: any) {
    setVersionNumber(filePath);
    setPath({
      urlPath: filePath.urlPath,
      id: filePath.id,
      size: filePath.size,
      scale: filePath.scale,
      unit: filePath.unit,
    });
  }

  return (
    <>
      <Box
        sx={{
          borderRadius: "5px",
          bgcolor: "#e9ecef",
          mb: 1,

          display: "flex",
          px: 2,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ fontWeight: "bold", ml: 2, color: "#353535" }}
          >
            | {projectById?.projectName} |
          </Typography>
          <FormControlLabel
            value="Table"
            control={
              <Switch
                color="primary"
                size="small"
                name="table"
                checked={isCheckedState.table}
                onChange={handleChange}
              />
            }
            label={<Typography variant="overline">Table</Typography>}
            labelPlacement="start"
          />
          <FormControlLabel
            value="Viewer"
            control={
              <Switch
                color="primary"
                size="small"
                onChange={handleChange}
                name="viewer"
                checked={isCheckedState.viewer}
              />
            }
            label={<Typography variant="overline">Viewer</Typography>}
            labelPlacement="start"
          />

          <IconButton
            sx={{
              ml: 2,
            }}
            aria-label="fingerprint"
            onClick={() => setFolderModel(true)}
          >
            <FolderOpenIcon color="primary" sx={{ color: "#9BC53D" }} />
          </IconButton>
        </Box>
        <Box>
          {versionNumber?.scale == 0.01 && (
            <Typography
              variant="overline"
              color={"white"}
              sx={{ fontWeight: "bold", bgcolor: "red", p: 1, borderRadius: 2 }}
            >
              {" "}
              File Version is not Calibrated
            </Typography>
          )}
        </Box>
        <Box>
          {versionNumber && (
            <Typography
              variant="subtitle2"
              sx={{ color: "#1E2019", textDecoration: "underline" }}
            >
              {versionNumber?.fileName?.split("=projectId=")[1] +
                " " +
                "v:" +
                versionNumber.versionNumber}
            </Typography>
          )}
        </Box>
      </Box>
      <Stack
        sx={{ mb: 2, height: "83vh", width: "100%" }}
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
      >
        <Box sx={{ flex: isCheckedState.table ? 5 : 0, overflow: "auto" }}>
          <>
            {isCheckedState.table && (
              <ReusableTable
                enableColumnDragging
                muiTableHeadCellProps={{
                  align: "center",
                }}
                muiTableBodyCellProps={{
                  color: "white",
                  align: "center",
                }}
                isLoading={isFetching}
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
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconButton
                      onClick={() => setCreateModalOpen(true)}
                      aria-label="add"
                      size="medium"
                      color="success"
                    >
                      <AddIcon />
                    </IconButton>

                    <IconButton color="inherit" aria-label="add" size="medium">
                      <SendIcon fontSize="medium" color="action" />
                    </IconButton>
                  </Box>
                )}
                muiTablePaperProps={{
                  sx: {
                    borderRadius: "5px",
                    border: "1px  #e0e0e0 ",
                    height: "100%",
                  },
                }}
                muiTopToolbarProps={{
                  sx: {
                    borderRadius: "5px",
                    bgcolor: "#654C4F",
                    height: 40,
                    border: "5px  #e0e0e0 ",
                  },
                }}
                muiBottomToolbarProps={{
                  sx: {
                    borderRadius: "5px",
                    bgcolor: "#B26E63",
                    border: "5px  #e0e0e0 ",
                  },
                }}
                muiTableContainerProps={{
                  sx: { height: "85%" },
                }}
              />
            )}
          </>
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
        </Box>
        {isCheckedState.viewer && (
          <Item
            sx={{
              flex: isCheckedState.viewer ? 5 : 0,
              overflow: "auto",
              width: "100%",
              margin: 0,
            }}
          >
            <Box
              sx={{
                height: "100%",
                position: "relative",
                margin: 0,
              }}
            >
              <Viewer
                path={path}
                key={path.id}
                forwardViewer={forwardViewer}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
              />
            </Box>
          </Item>
        )}
      </Stack>

      {folderModel && (
        <FolderModel
          openModel={folderModel}
          setOpenModel={setFolderModel}
          getFilePath={getFilePath}
        />
      )}
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
  materials: MaterialEntity[]
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
        const totalHours = getTotalFooter(column, "price");

        return (
          <Stack>
            Total:
            <Box color="#1B998B">{convertCurrency(totalHours)}</Box>
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
        const totalHours = getTotalFooter(column, "hourPerQuantity");

        return (
          <Stack>
            Total:
            <Box color="#1B998B">{totalHours} hours</Box>
          </Stack>
        );
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
      accessorKey: "createdAt",
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      enableHiding: false,
      header: "Create Date",
      size: 100,
    },
  ] as MRT_ColumnDef<ProjecTMaterialTest>[];
}

export function convertCurrency(currency: number) {
  // return currency.toFixed(2);
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  }).format(currency);
}

function getTotalFooter(
  values: MRT_Column<ProjecTMaterialTest>,
  hourPerQuantity: string
) {
  const totalHoursRows = values.getFacetedRowModel().rows;

  values.getFacetedRowModel().rows;
  return totalHoursRows.reduce((acc: any, val) => {
    const { quantity } = val.original;
    //@ts-ignore
    const total = val.original[hourPerQuantity];

    return acc + total * +quantity;
  }, 0);
}

function getAllMarkups(viewer: Autodesk.Viewing.GuiViewer3D | undefined) {
  if (!viewer) {
    return;
  }
  const extension = viewer?.getExtension("Autodesk.Viewing.MarkupsCore");
  //@ts-ignore
  // const markupsStringData = extension?.generateData();
  //@ts-ignore
  extension?.enterEditMode("layer_1");
  // return markupsStringData;
}

function getUnitAndScale(viewer: Autodesk.Viewing.GuiViewer3D | undefined) {

  if (!viewer) {
    return;
  }

  const unit = viewer
    .getExtension("Autodesk.Measure")
    //@ts-ignore

    //  .calibrationTool.getCalibrationFactor();
    .calibrationTool.getCurrentUnits();

  const scale = viewer
    .getExtension("Autodesk.Measure")
    //@ts-ignore

    .calibrationTool.getCalibrationFactor();

  // viewer.getExtension("Autodesk.Measure");
  //@ts-ignore

  // .calibrationTool.setCalibrationFactor(alibrationFactor);

  //stackoverflow.com/questions/73970804/saving-pdf-calibration-in-autodesk-forge-viewer
  return { unit, scale };
}

function deleteAllMeasurements(
  viewer: Autodesk.Viewing.GuiViewer3D | undefined
) {

  if (!viewer) {
    return;
  }
  viewer
    .getExtension("Autodesk.Measure")
    //@ts-ignore

    .measureTool.deleteAllMeasurements();
}
