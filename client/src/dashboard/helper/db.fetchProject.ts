import axios from "axios";
import { ColumnTypeProject } from "../types";

export async function projectsByCompany(
  companyId?: string
): Promise<ColumnTypeProject[]> {
  try {
    const { data, status } = await axios.get(
      "http://localhost:3000/project/projectByCompany/" + companyId,
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
