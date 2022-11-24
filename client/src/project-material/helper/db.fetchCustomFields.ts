import axios from "axios";
import {
  CreateProjectDto,
  CreateProjectMaterialDto,
  CreateTableCustomFieldDto,
} from "../../api/easyCostSchemas";

export async function createTableCustomField(
  value: Omit<CreateTableCustomFieldDto, "id">
): Promise<CreateTableCustomFieldDto> {
  try {
    const { data, status } = await axios.post(
      "http://localhost:3000/table-custom-fields",
      {
        projectId: value.projectId,
        columnName: value.columnName,
        columnType: value.columnType,
        customFieldValue: value.customFieldValue,
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
