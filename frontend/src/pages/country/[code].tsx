import { Layout } from "@/components/layout/Layout";
import { queryCountry } from "@/graphql/client";
import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { use, useEffect } from "react";

type CountryType = {
  code: string;
  continent: {
    name: string;
  };
  emoji: string;
  id: string;
  name: string;
};

const Country: React.FC = () => {
  const router = useRouter();
  const countryCode = router.query.code;
  const { data, loading, error } = useQuery<{ country: CountryType }>(
    queryCountry,
    {
      variables: {
        code: countryCode,
      },
    }
  );
  console.log(data);
  return (
    <>
      <Layout title={`Country`}>
        <Box
          className="main-content"
          display={"flex"}
          justifyContent={"center"}
        >
          <Box>
            {loading && <p>Chargement...</p>}
            {data && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                p={1}
                gap={2}
                alignItems={"center"}
              >
                <Typography variant="h3">{data.country.emoji}</Typography>
                <Typography variant="h5">Name: {data.country.name}</Typography>
                <Typography variant="h5">Code: {data.country.code}</Typography>
                <Typography variant="h5">
                  Continent: {data.country?.continent?.name || "N/A"}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Country;
