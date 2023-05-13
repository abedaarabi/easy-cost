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
        return findById(materials, value)!.materialName;
      }}
      onChange={(e) => {
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
