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

export async function getUserByEmail(email?: string | null) {
  try {
    const { data, status } = await axios.get(
      "http://localhost:3000/user/email/" + email,
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
  }
}
