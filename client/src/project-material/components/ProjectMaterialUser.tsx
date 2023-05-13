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
import { CreateNewAccountModal } from "./CreateNewAccountModal";
import { findById } from "../helper/customFunctions";
import { MySelect } from "./MySelect";
import { CustomFields } from "./CustomFields";
import CommentDialog from "./CommentDialog";
import TemporaryDrawer from "./CommentsDrawer";

const ProjectMaterialUser = () => {
  const { user } = useAuth();
  const projectId = "ca807e25-6253-4f03-9428-99142d051c9b";
  const { isLoading, error, data, isFetching } = useQuery(
    ["materialByProjectId"],
    () =>
      operationsByTag.projectMaterial.projectMaterialControllerFindByProjectId({
        pathParams: { projectId },
      }) as unknown as Promise<ProjecTMaterialTest[]>
  );

  if (!data) return null;
  const projectName = data[0]?.project?.projectName;

  const colTest = name(data);
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
          enableEditing
          renderTopToolbarCustomActions={() => (
            <Box sx={{ pl: 2, display: "flex", gap: 2 }}></Box>
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
      </Paper>
    </>
  );
};

export default ProjectMaterialUser;

function name(data: any) {
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
