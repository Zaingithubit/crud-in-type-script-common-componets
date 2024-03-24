import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const Home = () => {
  return (
    <Grid container spacing={2} mt={4} style={{ minHeight: "61vh" }}>
      <Grid item xs={12} sm={6}>
        <Box textAlign="center" mt={4}>
          <Typography variant="h4" fontWeight="bold">
            Car
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body1" align="center" m={7} marginTop={0}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            commodo tellus nec justo venenatis, ac malesuada nisl aliquet.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.jZplHkT2Ef3_KPFOEhM91wHaEK&pid=Api&P=0&h=220"
          alt="car"
          style={{
            width: "70%",
            height: "auto",
            boxShadow: "rgba(0, 0, 0, 0.3) 10px 9px 12px",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{ position: "fixed", width: "100%", bottom: "0px" }}
      ></Grid>
    </Grid>
  );
};

export default Home;
