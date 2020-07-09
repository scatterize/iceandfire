import React, { Component } from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt="error" />
      <span>Some goes wrong</span>
    </>
  );
};
export default ErrorMessage;
