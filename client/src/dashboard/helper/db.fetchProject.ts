import axios from "axios";
import { CreateProjectDto } from "../../api/easyCostSchemas";
import { ColumnTypeProject } from "../types";

export async function projectsByCompany(
  value: CreateProjectDto
): Promise<CreateProjectDto[]> {
  try {
    const { data, status } = await axios.post(
      "http://localhost:3000/project",
      {
        companyId: value.companyId,
        projectName: value.projectName,
        userId: value.userId,
        workByhour: Number(value.workByhour),
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
