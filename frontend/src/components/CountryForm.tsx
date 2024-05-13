import {
  mutationAddCountry,
  queryContinents,
  queryCountriesCard,
} from "@/graphql/client";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

type ContinentsType = {
  name: string;
  id: string;
};

export const CountryForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    data: continentsData,
    loading: loadingContinents,
    error: errorContinents,
  } = useQuery<{ continents: ContinentsType[] }>(queryContinents);
  const [doCreateCountry, { loading }] = useMutation(mutationAddCountry, {
    refetchQueries: [queryCountriesCard],
    // CATCH ANY ERROR
    onError: (error) => {
      if (error.graphQLErrors[0]?.extensions?.code === "CODE_ALREADY_EXISTS") {
        setErrorMessage("Un pays avec ce code existe déjà.");
      } else {
        setErrorMessage("Une erreur est survenue lors de l'ajout du pays.");
      }
    },
    onCompleted: () => {
      // RESET FORM AND ERROR MESSAGE
      formik.resetForm();
      setErrorMessage("");
    },
  });
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Le nom est obligatoire")
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères"),
    code: yup
      .string()
      .required("Le code est obligatoire")
      .min(2, "Le code doit contenir au moins 2 caractères")
      .max(3, "Le code ne peut pas dépasser 3 caractères"),
    emoji: yup
      .string()
      .required("L'emoji est obligatoire")
      .max(4, "L'emoji ne peut pas dépasser 4 caractères"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      emoji: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      doCreateCountry({
        variables: {
          data: {
            name: values.name,
            code: values.code,
            emoji: values.emoji,
          },
        },
      }).then((res) => {
        if (res.data?.addCountry) {
          formik.resetForm();
        }
      });
    },
  });

  return (
    <>
      {errorMessage && <Box color="red">{errorMessage}</Box>}
      <form onSubmit={formik.handleSubmit}>
        <Box display={"flex"} gap={2} p={2}>
          <Box>
            <TextField
              fullWidth
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              size="small"
              variant="outlined"
              label="Name"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="code"
              name="code"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.code}
              size="small"
              variant="outlined"
              label="Code"
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="emoji"
              name="emoji"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.emoji}
              size="small"
              variant="outlined"
              label="Emoji"
              error={formik.touched.emoji && Boolean(formik.errors.emoji)}
              helperText={formik.touched.emoji && formik.errors.emoji}
            />
          </Box>
          <Button type="submit">Ajouter</Button>
        </Box>
      </form>
    </>
  );
};
