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
          height: { xs: "140px", lg: "71px" },
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          // border: "1px yellow solid",
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
