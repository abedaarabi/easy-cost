import { MenuItem, Select } from "@mui/material";
import React from "react";
import { MaterialEntity } from "../../api/easyCostSchemas";
import { findById } from "../helper/customFunctions";

export function MySelect({
  defaultValue,
  materials,
  onChange,
}: {
  defaultValue: string;
  materials: MaterialEntity[];
  onChange: (value: string) => void;
}) {
  const [selectedValue, setSelectedValue] =
    React.useState<string>(defaultValue);

  return (
    <Select
      label="materialId"
      value={selectedValue}
      renderValue={(value) => {
        console.log({ value }, "it's retrieving the old id ");

        return findById(materials, value)!.materialName;
      }}
      onChange={(e) => {
        console.log("changed", e.target);
        setSelectedValue(e.target.value);
        onChange(e.target.value);
      }}
    >
      {materials.map((state) => (
        <MenuItem key={state.id} value={state.id}>
          {state.materialName}
        </MenuItem>
      ))}
    </Select>
  );
}
