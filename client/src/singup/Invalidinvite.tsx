import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

const Invalidinvite = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            variant="h3"
            mt={4}
            sx={{ color: "blue" }}
          >
            The page you are looking for isn’t here
          </Typography>
          {/* <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography> */}
          <Box sx={{ textAlign: "center" }}>
            <img
              alt="Under development"
              src="https://www.techquintal.com/wp-content/uploads/2022/08/400-Bad-Request-Error.jpg"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </Box>
          <Box>
            <Link to={"/login"}>
              <Button
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
              >
                Go back to dashboard
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  </>
);

export default Invalidinvite;
