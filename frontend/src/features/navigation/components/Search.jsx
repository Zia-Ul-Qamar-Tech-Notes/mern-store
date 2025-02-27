import React, { useState } from "react";
import { TextField, List, ListItem, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
    if (e.target.value.length > 1) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/products/search/?q=${e.target.value}`
        );
        const data = await response.json();
        setResults(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <TextField
        fullWidth
        label="Search..."
        variant="outlined"
        size="small"
        value={query}
        onChange={handleSearch}
      />
      {results.length > 0 && (
        <Paper sx={{ position: "absolute", width: "100%", zIndex: 10 }}>
          <List>
            {results.map((item) => (
              <ListItem
                key={item._id}
                onClick={() => navigate(`/product-details/${item._id}`)}
              >
                {item.title}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default Search;
