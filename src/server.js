import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();

var app = express();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Attendance API",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Guimarães Mahota",
      url: "https://github.com/gmahota",
    },
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development Local PC",
    },
    {
      url: "https://agnusinvoiceapi.herokuapp.com/api",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 5000, function () {
  console.log(`Listening ${process.env.PORT || 5000}`);
});
