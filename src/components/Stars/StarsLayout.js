import { Box } from "@mui/material";
import React from "react";
import StarsCard from "./StarsCard";
import Loading from "../Loading/Loading";

const StarsLayout = ({ words, loading }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          words.map((item) => <StarsCard key={item.id} word={item} />)
        )}
      </Box>
    </>
  );
};

export default StarsLayout;
