import { CountryCard, CountryCardType } from "@/components/CountryCard";
import { CountryForm } from "@/components/CountryForm";
import { Layout } from "@/components/layout/Layout";
import { queryCountriesCard } from "@/graphql/client";
import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { Router, useRouter } from "next/router";
import React from "react";

const countriesList: React.FC = () => {
  const router = useRouter();
  const {
    data: dataCountries,
    error: errorCountries,
    loading: loadingCountries,
  } = useQuery<{ countries: CountryCardType[] }>(queryCountriesCard);
  console.log(dataCountries);
  return (
    <Layout title="Listes des pays">
      <div className="main-content">
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h3">Listes des pays</Typography>
        </Box>
        {loadingCountries && <p>Chargement...</p>}
        <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
          <Box
            width={"100%"}
            sx={{ border: "solid 1px grey", borderRadius: "2px" }}
            p={2}
          >
            <Typography variant="h5" fontWeight={"semi-bold"}>
              Ajouter un pays
            </Typography>
            <CountryForm />
          </Box>
          {dataCountries && (
            <Box display={"flex"} gap={2} flexWrap={"wrap"}>
              {dataCountries.countries.map((country) => (
                <CountryCard
                  key={country.id}
                  name={country.name}
                  emoji={country.emoji}
                  onClick={() => {
                    router.push(`/country/${country.code}`);
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </div>
    </Layout>
  );
};

export default countriesList;
