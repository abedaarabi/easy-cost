import { AxiosError } from "axios";
import { QueryClient } from "react-query";

interface LoginMsg {
  code: number ;
  msg: string;
}

function handleResponse(
  response: any,
  queryClient: QueryClient,
  setLoginMsg: React.Dispatch<React.SetStateAction<LoginMsg>>
) {
  queryClient.invalidateQueries(["materialByCompanyId"]);

  setLoginMsg({
    code: 200,
    msg: `${response.materialName} Add to Database`,
  });
}

// function handleError(
//   error: AxiosError,
//   setLoginMsg: React.Dispatch<React.SetStateAction<LoginMsg>>
// ) {
//   if (error) {
//     setLoginMsg({
//     //   code: error?.code,
//       msg: error?.message,
//     });
//   }
// }

// Example usage:
// handleResponse(response, queryClient, setLoginMsg);
// handleError(error, setLoginMsg);
