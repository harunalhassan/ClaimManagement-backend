// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Claim Management System API',
//       version: '1.0.0',
//       description: 'API documentation for the Claim Management System',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3001',
//         description: 'Development server',
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//   },
//   apis: ['./src/routes/*.js'], // Path to the API docs
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

// module.exports = { swaggerUi, swaggerDocs };