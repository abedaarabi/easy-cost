import axios from "axios";
// import { signUp } from "../config/firebase";
// import { NewUser } from "./singupTypes";

// export async function createNewUser(userInfo: NewUser): Promise<NewUser> {
//   try {
//     console.log({ userInfo });

//     // const userDetails: any = await signUp(userInfo.email, userInfo.password);
//     // console.log({ userDetails });

//     const { data, status } = await axios.post(
//       "/user",

//   data:userInfo,

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
