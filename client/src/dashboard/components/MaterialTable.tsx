import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../authContext/components/AuthContext";
import { getMaterialByCompany } from "../helper/db.fetchMaterial";
import ReusableTable, {
  ColumnFromData,
} from "../../reusableTable/ReusableTable";
import Box from "@mui/material/Box"; // import ReusableTable from "../../reusableTable/ReusableTable";
import { Material } from "../../reusableTable/interfaces/interface";
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTableProps,
} from "material-react-table";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { ContentCopy, Delete, Edit } from "@mui/icons-material";
const MaterialTable = () => {
  const { user } = useAuth();

  // console.log(user, "Table");
  // const { companyId } = user[0];
  // const { isLoading, error, data } = useQuery(["materialByCompanyId"], () =>
  //   getMaterialByCompany(companyId)
  // );

  // if (!data) return null;
  const [tableData, setTableData] = React.useState<typeof testData>(testData);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const dataTable = tableData.map((column) => {
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
  });

  const colTest = [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "image",
      header: "Image",
      size: 140,
    },

    {
      accessorKey: "materialName",
      header: "Material Name",
      size: 180,
      muiTableBodyCellEditTextFieldProps: {
        select: true, //change to select for a dropdown
        children: testData.map((state) => (
          <MenuItem key={state.id} value={state.materialName}>
            {state.materialName}
          </MenuItem>
        )),
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
      accessorKey: "priceUnit",
      header: "Price Unit",
      size: 140,
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      size: 140,
    },
    {
      accessorKey: "workByhour",
      header: "Work Hour",
      size: 140,
    },
  ] as unknown as MRT_ColumnDef<typeof dataTable[0]>[];

  //delete
  const handleDeleteRow = React.useCallback(
    (row: MRT_Row<typeof dataTable[0]>) => {
      console.log(row.original.id);

      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("materialName")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );
  const handleCreateNewRow = (values: typeof dataTable[0]) => {
    tableData.push(values);
    setTableData([...tableData]);
  };
  return (
    <Box sx={{ width: "70rem" }}>
      {
        <ReusableTable
          enableClickToCopy
          columns={colTest}
          data={dataTable}
          // onEditingRowSave={handleSaveRowEdits}

          enableEditing
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteRow(row)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Account
            </Button>
          )}
        />
      }
      <CreateNewAccountModal
        columns={colTest}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </Box>
  );
};

export default MaterialTable;
function getCommonEditTextFieldProps(cell: any) {
  throw new Error("Function not implemented.");
}

const testData = [
  {
    id: "245fd063-2d30-44e0-bb10-a127ae3574ba",
    materialName: "Bonga shad",
    unit: "area",
    supplier: "Sparks",
    createdAt: "2022-10-30T15:57:04.437Z",
    price: 9,
    priceUnit: "dkk",
    image: "image- Johns Creek",
    userId: null,
    workByhour: 6,
    companyId: "78a13972-1c63-4dd7-80f9-a3a157f4dc64",
  },
  {
    id: "4f8eba45-187a-4351-94b3-725eb6de8bc1",
    materialName: "Pacific sand lance",
    unit: "area",
    supplier: "North Las Vegas",
    createdAt: "2022-10-30T15:57:04.437Z",
    price: 8,
    priceUnit: "dkk",
    image: "image- Reno",
    userId: null,
    workByhour: 8,
    companyId: "78a13972-1c63-4dd7-80f9-a3a157f4dc64",
  },
  {
    id: "72191332-407b-4420-9dc5-8c5f3efb004e",
    materialName: "Amur catfish",
    unit: "area",
    supplier: "Hialeah",
    createdAt: "2022-10-30T15:57:04.437Z",
    price: 9,
    priceUnit: "dkk",
    image: "image- Danville",
    userId: null,
    workByhour: 5,
    companyId: "78a13972-1c63-4dd7-80f9-a3a157f4dc64",
  },
  {
    id: "929e2c3e-07b6-4061-948e-c504deaa6e75",
    materialName: "Chinese softshell turtle",
    unit: "area",
    supplier: "La Crosse",
    createdAt: "2022-10-30T15:57:04.437Z",
    price: 6,
    priceUnit: "dkk",
    image: "image- Loveland",
    userId: null,
    workByhour: 6,
    companyId: "78a13972-1c63-4dd7-80f9-a3a157f4dc64",
  },
  {
    id: "cdd7b183-959b-4a18-912e-2c0326cb0ec3",
    materialName: "Jumbo flying squid",
    unit: "area",
    supplier: "Lynn",
    createdAt: "2022-10-30T15:57:04.437Z",
    price: 5,
    priceUnit: "dkk",
    image: "image- Rio Rancho",
    userId: null,
    workByhour: 6,
    companyId: "78a13972-1c63-4dd7-80f9-a3a157f4dc64",
  },
];

export const CreateNewAccountModal: FC<{
  columns: MRT_ColumnDef<any>[];
  onClose: () => void;
  onSubmit: (values: any) => void;
  open: boolean;
}> = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = React.useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );
  console.log({ values });

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
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};
