import { Layout } from "@/components/layout/Layout";
import { Box, Typography } from "@mui/material";
import React from "react";

const index: React.FC = () => {
  return (
    <Layout title="Accueil">
      <Box className="main-content" display={"flex"} justifyContent={"center"}>
        <Typography variant="h4">CHECKPOINT : FRONTEND </Typography>
      </Box>
    </Layout>
  );
};

export default index;
