import axios from "axios";
import { CreateUserDto } from "../../api/easyCostSchemas";
import { sendPasswordReset, signUp } from "../../config/firebase";
import { ColumnTypeUser } from "../types";

export async function getUserByCompany(
  companyId?: string
): Promise<ColumnTypeUser[]> {
  try {
    const { data, status } = await axios.get(
      "http://localhost:3000/user/userByCompany/" + companyId,
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

export async function updateUser(
  user: ColumnTypeUser
): Promise<ColumnTypeUser> {
  try {
    const { data, status } = await axios.patch(
      "http://localhost:3000/user/" + user.id,

      {
        email: user.email,
        avatar: user.avatar,
        userType: user.userType,

        name: user.name,
      },
      {
        headers: {
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

export async function createUser(
  material: CreateUserDto
): Promise<CreateUserDto> {
  try {
    const userDetails: any = await signUp(material.email);

    const { data, status } = await axios.post(
      "http://localhost:3000/user",

      {
        id: userDetails.uid,
        name: material.name,
        email: material.email,

        userType: material.userType,
        companyId: material.companyId,
      },

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    await sendPasswordReset(data.email);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    }
    throw error;
  }
}
