import axios from "axios";
import { Material } from "../../reusableTable/interfaces/interface";

export async function getMaterialByCompany(
  companyId?: string
): Promise<Material[]> {
  try {
    const { data, status } = await axios.get(
      "http://localhost:3000/material/materialByCompany/" + companyId,
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
