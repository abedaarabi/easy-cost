import React, { FC, useMemo } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  MaterialReactTableProps,
} from "material-react-table";
import { Box, Paper } from "@mui/material";

type RecordType = Record<string, any>;

export type ColumnFromData<TData extends RecordType> = MRT_ColumnDef<TData>;

type Props<TData extends RecordType> = MaterialReactTableProps<TData> & {
  isLoading?: boolean;
};

function ReusableTable<TData extends RecordType>({
  isLoading,
  data,
  columns,
  ...props
}: Props<TData>) {
  //should be memoized or stable
  const memoColumns = useMemo(() => columns, [columns]);
  return (
    <MaterialReactTable
      muiTableHeadCellProps={{
        align: "center",
      }}
      muiTableBodyCellProps={{
        align: "center",
      }}
      enableStickyFooter
      initialState={{ columnVisibility: { id: false }, density: "compact" }}
      enableColumnFilterModes
      enableColumnOrdering
      enableGrouping
      enablePinning
      columns={memoColumns}
      state={{ isLoading }}
      data={data}
      {...props}
      muiTableContainerProps={{
        sx: { maxHeight: "600px" },
      }}
      enableStickyHeader
      pageCount={10}
    />
  );
}

export default ReusableTable;

// type Obj<T> = { item: T[] };

// function returnFirst<T>(obj: Obj<T>) {
//   return obj.item[0];
// }

// // makeTuple({ x: 1, y: 2 });
// // makeTuple({ x: "dsds", y: "dsds" });

// returnFirst<number>({ item: ['dss'] });
