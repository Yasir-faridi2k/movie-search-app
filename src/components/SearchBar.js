// src/components/SearchBar.js - Input box for searching movies

import React from 'react';

function SearchBar({ query, setQuery }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
  },
  input: {
    width: '100%',
    maxWidth: '500px',
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
  },
};

export default SearchBar;