import swaggerAutogen from "swagger-autogen";

const outputFile = "./swager_output.json";
const endpointsFiles = ["./src/routers/fischcardRouter.ts"];

swaggerAutogen(outputFile, endpointsFiles);
