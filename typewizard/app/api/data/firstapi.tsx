"use client"
import React, { useEffect, useState } from 'react';
import cors from 'cors';

const api = "http://localhost:5000";

export function Test() {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch(api + "/api/data")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data');
      });
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
