import axios from "axios";
import { Material } from "../../reusableTable/interfaces/interface";

export async function getMaterialByCompany(
  companyId?: string
): Promise<Material[]> {
  try {
    const { data, status } = await axios.get(
      "/material/materialByCompany/" + companyId,
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

export async function deleteMaterialById(materialId?: string): Promise<any> {
  try {
    const { data, status } = await axios.delete("/material/" + materialId, {
      headers: {
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    }
    throw error;
  }
}
export async function updateMaterial(
  material: Omit<Material, "companyId" | "userId">
): Promise<Omit<Material, "companyId" | "userId">> {
  try {
    const { data, status } = await axios.patch(
      "/material/" + material.id,

      {
        price: +material.price,
        materialName: material.materialName,

        unit: material.unit,
        hourPerQuantity: +material.hourPerQuantity,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,

          "Content-Type": "application/json",
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

export async function createMaterial(material: Material): Promise<Material> {
  try {

    const { data, status } = await axios.post(
      "/material",

      {
        // companyId: material.companyId,
        unit: material.unit,

        co2e: Number(material.co2e),
        hourPerQuantity: Number(material.hourPerQuantity),
        materialName: material.materialName,

        price: Number(material.price),
        // userId: material.userId,
      },

      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,

          "Content-Type": "application/json",
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
