import axios from "axios";
import { CreateUserDto } from "../../api/easyCostSchemas";
import { sendPasswordReset, signUp } from "../../config/firebase";
import { ColumnTypeUser } from "../types";

// // export async function getUserByCompany(
// //   companyId?: string
// // ): Promise<ColumnTypeUser[]> {
// //   try {
// //     const { data, status } = await axios.get(
// //       "/user/userByCompany/" + companyId,
// //       {
// //         headers: {
// //           authorization: `Bearer ${localStorage.getItem("access_token")}`,

// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //         },
// //       }
// //     );

// //     return data;
// //   } catch (error) {
// //     if (axios.isAxiosError(error)) {
// //       console.log("error message: ", error.message);
// //     }
// //     throw error;
// //   }
// // }

// export async function updateUser(
//   user: ColumnTypeUser
// ): Promise<ColumnTypeUser> {
//   try {
//     const { data, status } = await axios.patch(
//       "/user/" + user.id,

//       {
//         email: user.email,
//         avatar: user.avatar,
//         userType: user.userType,

//         name: user.name,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );

//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("error message: ", error.message);
//     }
//     throw error;
//   }
// }

export async function createUserToken(
  userInfo: CreateUserDto
): Promise<CreateUserDto> {
  try {
    // const userDetails: any = await signUp(material.email);

    const { data, status } = await axios.post(
      "/invited-user",

      {
        userId: userInfo.id,
        // name: userInfo.name,
        email: userInfo.email,

        companyId: userInfo.companyId,

        role: userInfo.userType,
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
