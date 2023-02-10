import axios from "axios";
import {
  CreateProjectDto,
  CreateProjectMaterialDto,
} from "../../api/easyCostSchemas";
import { ColumnTypeProject } from "../types";

export async function projectMaterial(
  value: CreateProjectMaterialDto
): Promise<CreateProjectMaterialDto> {
  try {
    console.log({ value });

    const { data, status } = await axios.post(
      "http://localhost:3000/project-material",
      {
        projectId: value.projectId,
        materialId: value.materialId,
        quantity: value.quantity,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    }
    throw error;
  }
}
