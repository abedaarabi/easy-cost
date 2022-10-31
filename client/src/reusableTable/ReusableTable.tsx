import React, { FC, useMemo } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  MaterialReactTableProps,
} from "material-react-table";

type RecordType = Record<string, any>;

export type ColumnFromData<TData extends RecordType> = MRT_ColumnDef<TData>;

function ReusableTable<TData extends RecordType>({
  data,
  columns,
  ...props
}: MaterialReactTableProps<TData>) {
  //should be memoized or stable
  const memoColumns = useMemo(() => columns, []);
  return <MaterialReactTable columns={memoColumns} data={data} {...props} />;
}

export default ReusableTable;

type Obj<T> = { item: T[] };

// function returnFirst<T>(obj: Obj<T>) {
//   return obj.item[0];
// }

// // makeTuple({ x: 1, y: 2 });
// // makeTuple({ x: "dsds", y: "dsds" });

// returnFirst<number>({ item: ['dss'] });
