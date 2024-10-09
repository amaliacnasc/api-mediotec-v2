const swagger = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
const http = require ("http"); 
const express = require ("express"); 

const config = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerui.serve,
  swaggerui.setup(config)
);