// import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  // maxWidth: 480,
  margin: "auto",
  // minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(8, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Container>
        <StyledContent sx={{}}>
          {/* <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography> */}

          <Box
            component="img"
            src="https://miro.medium.com/max/750/0*QOZm9X5er1Y0r5-t"
            sx={{ height: 360, mx: "auto", my: { xs: 5, sm: 10 } }}
          />

          <Button
            to="/login"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
