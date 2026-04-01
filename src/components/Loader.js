// src/components/Loader.js - Loading spinner shown while fetching data

import React from 'react';

function Loader() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '60px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '5px solid #ccc',
    borderTop: '5px solid #e94560',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  text: {
    marginTop: '16px',
    color: '#aaa',
    fontSize: '16px',
  },
};

export default Loader;