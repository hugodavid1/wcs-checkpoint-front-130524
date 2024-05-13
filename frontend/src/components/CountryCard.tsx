import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ButtonBase } from "@mui/material";

export type CountryCardType = {
  id?: number;
  name: string;
  emoji: string;
  code?: string;
  onClick: () => void;
};

export function CountryCard(props: CountryCardType) {
  const { id, name, emoji, onClick } = props;
  return (
    <Box sx={{ border: "solid 1px black" }}>
      <ButtonBase onClick={onClick} style={{ width: "100%", display: "block" }}>
        <Card>
          <CardContent>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="h6" color="text.secondary">
                {name}
              </Typography>
            </Box>
            <Box
              sx={{
                width: { xs: 50, lg: 100 },
              }}
              display="flex"
              justifyContent={"center"}
            >
              {emoji}
            </Box>
          </CardContent>
        </Card>
      </ButtonBase>
    </Box>
  );
}
