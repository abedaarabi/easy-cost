//https://bobbyhadz.com/blog/typescript-http-request-axios#making-http-get-requests-with-axios-in-typescript

import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  userType: string;
  companyId: string;
}
interface GetUsersResponse {
  data: User[];
}

export async function getUserByEmail(email?: string) {
  try {
    const { data, status } = await axios.get<GetUsersResponse>(
      "http://localhost:3000/user/f7e3c247-2627-4dd6-82c5-72d40c7fec1f",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log(JSON.stringify(data, null, 4));

    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
