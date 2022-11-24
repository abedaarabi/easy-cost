import React, { FC } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useAuth } from "../../authContext/components/AuthContext";
// import AddIcon from "@mui/icons-material/Add";
// import Avatar from "@mui/material/Avatar";

// import { createMaterial, deleteMaterialById } from "../helper/db.fetchMaterial";
// import ReusableTable, {
//   ColumnFromData,
// } from "../../reusableTable/ReusableTable";
// import Box from "@mui/material/Box";

// import MaterialReactTable, {
//   MRT_ColumnDef,
//   MRT_Row,
//   MaterialReactTableProps,
// } from "material-react-table";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Fab,
//   IconButton,
//   MenuItem,
//   Paper,
//   Select,
//   Stack,
//   TextField,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import Button from "@mui/material/Button";
// import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
// import { CellTower, ContentCopy, Delete, Edit } from "@mui/icons-material";

// import { getUserByCompany, updateUser } from "../helper/db.fetchUser";
// import { projectsByCompany } from "../helper/db.fetchProject";
// import { operationsByTag } from "../../api/easyCostComponents";
// import {
//   CreateProjectDto,
//   CreateProjectMaterialDto,
//   MaterialEntity,
//   ProjectEntity,
//   UpdateProjectDto,
//   UpdateProjectMaterialDto,
// } from "../../api/easyCostSchemas";

// import { Link, Outlet, useLocation, useParams } from "react-router-dom";
// import { projectMaterial } from "../helper/db.fetchProjectmaterial";
// import { ProjecTMaterialTest } from "../types";

// const ProjectMaterialTable = () => {
//   const [createModalOpen, setCreateModalOpen] = React.useState(false);

//   const { projectId }: { projectId: string } = useParams();
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   if (user.length < 1) return null;
//   const { companyId, id: userId } = user[0];

//   const { isLoading, error, data, isFetching } = useQuery(
//     ["materialByProjectId"],
//     () =>
//       operationsByTag.projectMaterial.projectMaterialControllerFindByProjectId({
//         pathParams: { projectId },
//       }) as unknown as Promise<ProjecTMaterialTest[]>
//   );

//   const updateMutation = useMutation(
//     (value: CreateProjectMaterialDto) =>
//       operationsByTag.projectMaterial.projectMaterialControllerUpdate({
//         pathParams: { id: value.id },
//         body: {
//           materialId: value.materialName,
//           profit: +value.profit,
//           projectId,
//         },
//       }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["materialByProjectId"]);
//       },
//     }
//   );
//   const deleteMutation = useMutation(
//     (id: string) =>
//       operationsByTag.projectMaterial.projectMaterialControllerRemove({
//         pathParams: { id },
//       }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["materialByProjectId"]);
//       },
//     }
//   );
//   const {
//     isLoading: materialIsLoading,
//     error: materialError,
//     data: materials,
//     isFetching: materialIsFetching,
//   } = useQuery(
//     ["materialByCompanyId"],
//     () =>
//       operationsByTag.material.materialControllerFindMaterialByCompanyId({
//         pathParams: { companyId },
//       }) as unknown as Promise<MaterialEntity[]>
//   );

//   const createMutation = useMutation(projectMaterial, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["materialByProjectId"]);
//     },
//   });

//   if (!data || !materials) return null;
//   const projectName = data[0]?.project?.projectName;
//   console.log({ projectName });

//   const colTest = [
//     {
//       accessorKey: "id",
//       header: "ID",
//       enableColumnOrdering: false,
//       enableEditing: false, //disable editing on this column
//       enableSorting: false,
//       enableHiding: true,
//       size: 80,
//     },

//     {
//       accessorKey: "materialName",
//       header: "Material Name",
//       size: 160,

//       muiTableBodyCellEditTextFieldProps: ({ cell, column, row, table }) => (
//         console.log(row.original.materialId),
//         {
//           select: true, //change to select for a dropdown
//           defaultValue: row.original.materialId,
//           children: materials
//             ? materials
//                 .sort((a, b) => (a.materialName > b.materialName ? 1 : -1))
//                 .map((material) => (
//                   <MenuItem key={material.id} value={material.id}>
//                     {material.materialName}
//                   </MenuItem>
//                 ))
//             : [],
//         }
//       ),

//       muiTableBodyCellCopyButtonProps: {
//         fullWidth: true,
//         startIcon: <ContentCopy />,
//         sx: { justifyContent: "flex-start" },
//       },
//     },
//     {
//       accessorKey: "profit",
//       header: "Profit",
//       size: 80,
//     },
//   ] as MRT_ColumnDef<ProjecTMaterialTest>[];

//   // const [stateColumn, setStateColumn] = React.useState(() => colTest) as any;

//   const dataTable = data
//     ? data.map((column) => {
//         return {
//           //ts-ignore
//           materialName: column?.material?.materialName,
//           materialId: column.materialId,
//           id: column.id,
//           profit: column.profit,
//         };
//       })
//     : [];

//   //Actions
//   //delete
//   const handleDeleteRow = (row: MRT_Row<UpdateProjectMaterialDto>) => {
//     console.log(row.original.id);

//     if (!confirm(`Are you sure you want to delete ${row.getValue("id")}`)) {
//       return;
//     }

//     deleteMutation.mutate(row.original.id);
//     //send api delete request here, then refetch or update local table data for re-render Delete
//   };
//   //Create

//   const handleCreateNewRow = (values: CreateProjectMaterialDto) => {
//     console.log(values);
//     // createMutation.mutate({
//     //   materialId: values.materialId,
//     //   projectId,
//     //   profit: Number(values.profit),
//     // });
//     //send/receive api updates here, then refetch or update local table data for re-render Update
//   };
//   const handleSaveRowEdits: MaterialReactTableProps<UpdateProjectMaterialDto>["onEditingRowSave"] =
//     async ({ exitEditingMode, row, values }) => {
//       //send/receive api updates here, then refetch or update local table data for re-render Update

//       console.log({ values });
//       updateMutation.mutate(values);
//       exitEditingMode();
//     };

//   return (
//     <>
//       <Paper sx={{ mb: 3, p: 1, textAlign: "center" }}>
//         <Typography variant="h4" component="h4" color={"#011627"}>
//           {projectName}
//         </Typography>
//       </Paper>
//       <Paper>
//         <ReusableTable
//           isLoading={isLoading}
//           enableStickyFooter
//           initialState={{ columnVisibility: { id: false } }}
//           columns={colTest}
//           data={dataTable}
//           onEditingRowSave={handleSaveRowEdits}
//           enableEditing
//           renderRowActions={({ row, table }) => (
//             <Box sx={{ display: "flex", gap: "0.5rem" }}>
//               <Tooltip arrow placement="left" title="Edit">
//                 <IconButton
//                   onClick={() => table.setEditingRow(row)}
//                   color="info"
//                 >
//                   <Edit />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip arrow placement="right" title="Delete">
//                 <IconButton color="error" onClick={() => handleDeleteRow(row)}>
//                   <Delete />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           )}
//           renderTopToolbarCustomActions={() => (
//             <Box sx={{ pl: 2, display: "flex", gap: 2 }}>
//               <Fab
//                 color="info"
//                 onClick={() => setCreateModalOpen(true)}
//                 aria-label="add"
//                 size="small"
//               >
//                 <AddIcon />
//               </Fab>
//               <Fab
//                 color="success"
//                 onClick={() => {
//                   // setStateColumn((prv) => [
//                   //   ...prv,
//                   //   {
//                   //     accessorKey: "test",
//                   //     header: "test",
//                   //     size: 80,
//                   //   },
//                   // ]);
//                 }}
//                 aria-label="add"
//                 size="small"
//               >
//                 <LibraryAddIcon />
//               </Fab>
//             </Box>
//           )}
//         />

//         <CreateNewAccountModal
//           columns={colTest}
//           open={createModalOpen}
//           onClose={() => setCreateModalOpen(false)}
//           onSubmit={handleCreateNewRow}
//           materials={materials}
//         />
//       </Paper>
//     </>
//   );
// };

// export default ProjectMaterialTable;

// export const CreateNewAccountModal: FC<{
//   columns: MRT_ColumnDef<ProjecTMaterialTest>[];
//   onClose: () => void;
//   materials: MaterialEntity[];
//   onSubmit: (values: CreateProjectMaterialDto) => void;
//   open: boolean;
// }> = ({ open, columns, onClose, onSubmit, materials }) => {
//   const [values, setValues] = React.useState<any>(() =>
//     columns.reduce((acc, column) => {
//       acc[column.accessorKey ?? ""] = "";
//       return acc;
//     }, {} as any)
//   );

//   const handleSubmit = () => {
//     //put your validation logic here
//     onSubmit(values);
//     onClose();
//   };
//   if (!columns) {
//     return null;
//   }
//   return (
//     <Dialog open={open}>
//       <DialogTitle textAlign="center">Create New Material</DialogTitle>
//       <DialogContent>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <Stack
//             sx={{
//               width: "100%",
//               minWidth: { xs: "400px", sm: "360px", md: "400px" },
//               gap: "1.5rem",
//             }}
//           >
//             {columns
//               .filter((i) => i.accessorKey !== "id")
//               .map((column, i) => {
//                 console.log(column);
//                 if (column.accessorKey === "materialName") {
//                   return (
//                     <Select
//                       key={column.accessorKey}
//                       label="materialId"
//                       value={values["materialId"]}
//                       onChange={(e) =>
//                         setValues({
//                           ...values,
//                           materialId: e.target.value,
//                         })
//                       }
//                       renderValue={(value) => {
//                         // console.log(value);
//                         const m = materials.find(
//                           (aMaterial) => aMaterial.id === value
//                         );
//                         return m?.materialName;
//                         // return value;
//                       }}
//                     >
//                       {materials.map((state) => (
//                         <MenuItem key={state.id} value={state.id}>
//                           {state.materialName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   );
//                 }
//                 return (
//                   <TextField
//                     key={column.accessorKey}
//                     label={column.header}
//                     name={column.accessorKey}
//                     onChange={(e) =>
//                       setValues({ ...values, [e.target.name]: e.target.value })
//                     }
//                   />
//                 );
//               })}
//           </Stack>
//         </form>
//       </DialogContent>
//       <DialogActions sx={{ p: "1.25rem" }}>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button color="secondary" onClick={handleSubmit} variant="contained">
//           Select Material
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
