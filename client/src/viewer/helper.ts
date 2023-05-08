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
  data: any[];
}

export async function getUserToken(email: any) {
  try {
    const { data } = await axios.get("/token", {
      headers: {
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    }
  }
}
