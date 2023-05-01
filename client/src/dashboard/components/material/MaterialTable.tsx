import React, { FC } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../authContext/components/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import {
  createMaterial,
  deleteMaterialById,
  getMaterialByCompany,
  updateMaterial,
} from "../../helper/db.fetchMaterial";
import ReusableTable, {
  ColumnFromData,
} from "../../../reusableTable/ReusableTable";
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
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { CellTower, ContentCopy, Delete, Edit } from "@mui/icons-material";

import { operationsByTag } from "../../../api/easyCostComponents";
import {
  CreateMaterialDto,
  MaterialEntity,
  UpdateMaterialDto,
} from "../../../api/easyCostSchemas";
import { AxiosError, AxiosResponse } from "axios";
import { DropzoneXlsx } from "./DropzoneXlsx";
import useDownloadFile from "../../../hooks/DownloadFileHook";
import DownloadingIcon from "@mui/icons-material/Downloading";
const MaterialTable = () => {
  const queryClient = useQueryClient();
  const { user, setLoading, loading, setLoginMsg } = useAuth();
  const [openAddXlsx, setOpenAddXlsx] = React.useState(false);
  const downloadFile = useDownloadFile();

  const { companyId, id: userId } = user;

  const { isLoading, isError, data, isFetching } = useQuery(
    ["materialByCompanyId_test"],

    () =>
      operationsByTag.material.materialControllerFindMaterialByCompanyId({
        headers: { authorization: `Bearer ${user.accessToken}` },
      }) as unknown as Promise<CreateMaterialDto[]>
  );

  const deleteMutation = useMutation(
    (id: string) =>
      operationsByTag.material.materialControllerRemove({
        pathParams: { id },
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),

    {
      onSuccess: (response) => {
        response && queryClient.invalidateQueries(["materialByCompanyId"]);
        setLoginMsg({
          code: 200,
          msg: `${response.materialName} Successfully deleted from Database.`,
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

  const updateMutation = useMutation(
    ({ id, value }: { id: string; value: UpdateMaterialDto }) =>
      operationsByTag.material.materialControllerUpdate({
        pathParams: { id },
        body: { ...value },

        headers: { authorization: `Bearer ${user.accessToken}` },
      }),

    {
      onSuccess: (response) => {
        console.log({ response });

        queryClient.invalidateQueries({
          queryKey: ["materialByCompanyId_test"],
        });
        setLoginMsg({
          code: 200,
          msg: `${response.materialName} Successfully Added to Database.`,
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
    ({ value }: { value: MaterialEntity }) =>
      operationsByTag.material.materialControllerCreate({
        body: { ...value },

        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: (response) => {
        console.log({ response });

        queryClient.invalidateQueries({
          queryKey: ["materialByCompanyId_test"],
        });
        setLoginMsg({
          code: 200,
          msg: `${response.materialName} Successfully Added to Database.`,
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

  const [createModalOpen, setCreateModalOpen] = React.useState(false);

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
      accessorKey: "materialName",
      header: "Material Name",
      size: 180,

      muiTableBodyCellEditTextFieldProps: {
        select: false, //change to select for a dropdown
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
    },
    {
      accessorKey: "co2e",
      header: "Co2e",
      size: 140,
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
      accessorKey: "hourPerQuantity",
      header: "Hour Per Quantity",
      size: 140,
    },
  ] as MRT_ColumnDef<CreateMaterialDto>[];

  const dataTable = data
    ? data.map((column) => {
        return {
          createdAt: column.createdAt,
          id: column.id,

          materialName: column.materialName,
          price: column.price,

          co2e: column.co2e,
          unit: column.unit,
          hourPerQuantity: column.hourPerQuantity,
        };
      })
    : [];

  //delete
  const handleDeleteRow = (
    row: MRT_Row<Omit<MaterialEntity, "companyId" | "userId" | "Id">>
  ) => {
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
    createMutation.mutate({
      value: {
        ...values,
      },
    });

    //send/receive api updates here, then refetch or update local table data for re-render Update
  };

  const handleSaveRowEdits: MaterialReactTableProps<
    (typeof dataTable)[0]
  >["onEditingRowSave"] = async ({ exitEditingMode, row, values }) => {
    //send/receive api updates here, then refetch or update local table data for re-render Update

    const validateResult = {
      price: +values.price,
      materialName: values.materialName,
      co2e: +values.co2e,
      unit: values.unit,
      hourPerQuantity: +values.hourPerQuantity,
    };
    updateMutation.mutate({
      id: values.id,
      value: { ...values, ...validateResult },
    });
    exitEditingMode();
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>Loading</h1>;
  }

  return (
    <Box>
      <Typography
        variant="overline"
        color={"#25291C"}
        mb={1}
        sx={{ fontSize: "18px" }}
      >
        Materials:
      </Typography>
      <ReusableTable
        enableStickyFooter
        initialState={{
          columnVisibility: { id: false },
          isLoading: isFetching,
        }}
        columns={colTest}
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
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Fab
              color="info"
              onClick={() => setCreateModalOpen(true)}
              aria-label="add"
              size="small"
            >
              <AddIcon />
            </Fab>

            <Fab
              aria-label="fingerprint"
              color="default"
              size="small"
              onClick={() => {
                setOpenAddXlsx(true);
                console.log("");
              }}
            >
              <DriveFolderUploadIcon />
            </Fab>
            <Fab
              aria-label="fingerprint"
              color="success"
              size="small"
              onClick={() =>
                downloadFile({
                  fileUrl:
                    "https://easy-cost.s3.eu-north-1.amazonaws.com/materials02.xlsx",
                  fileName: "material-template.xlsx",
                })
              }
            >
              <DownloadingIcon />
            </Fab>
          </Box>
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
        columns={colTest}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />

      {openAddXlsx && (
        <DropzoneXlsx
          openAddObject={openAddXlsx}
          setOpenAddObject={setOpenAddXlsx}
        />
      )}
    </Box>
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
    if (!values.materialName) {
      alert("fill the inputs");
      return;
    }
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
                      required
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
                      required
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
