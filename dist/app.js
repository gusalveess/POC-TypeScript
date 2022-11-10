import express from "express";
import cors from 'cors';
import router from "./routes/index.js";
import dotenv from 'dotenv';
dotenv.config();
var server = express();
server.use(cors());
server.use(express.json());
server.use(router);
server.listen(process.env.PORT, function () {
    console.log("Server listening on port ".concat(process.env.PORT));
});
