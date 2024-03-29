import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import { Params, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Invalidinvite from "./Invalidinvite";
// import { createNewUser } from "./singupHelper";
import { operationsByTag } from "../api/easyCostComponents";
import { useAuth } from "../authContext/components/AuthContext";
import { CreateUserDto } from "../api/easyCostSchemas";
import { signUp } from "../config/firebase";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  // get the tokenId for url and the user type form url
  const { tokenId } = useParams<Params<string>>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, setLoginMsg } = useAuth();
  var decoded = jwt_decode(tokenId as string) as any;
  // console.log(decoded, "#####");

  if (!decoded) {
    return <Invalidinvite />;
  }

  const createMutation = useMutation(
    (values: CreateUserDto) =>
      operationsByTag.user.userControllerCreate({
        body: {
          companyId: values.companyId,
          name: values.name,
          email: values.email,
          id: values.id,
          userType: values.userType,
        },

        // headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: (response) => {
        // queryClient.invalidateQueries(["userByCompanyId"]);
        console.log({ response });

        navigate("/login");
      },
      onError: (err) => console.log(err),
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const formInfo = {
      name: data.get("fullName"),
      password: data.get("password"),
    } as { name: string; password: string };

    const userDetails: any = await signUp(decoded.email, formInfo.password);

    if (userDetails.error) {
      setLoginMsg({
        code: 400,

        msg: `Code Error: ${userDetails.error}`,
      });
    }

    const info: CreateUserDto = {
      email: decoded.email,
      id: userDetails.uid,
      userType: decoded.userType,
      companyId: decoded.companyId,
      name: formInfo.name,
    };
    console.log(info);

    createMutation.mutate(info);

    // console.log(createMutation);

    // createMutation.isSuccess && navigate("/project");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
