import express from "express"
import mongoose from "mongoose"
import routes from "./routes"

import morgan from "morgan";
import cors from "cors";

import swaggerUi from "swagger-ui-express"
// import swaggerJsDoc from "swagger-jsdoc"

import swaggerDocument from '../swagger.json'


import 'dotenv/config'


const app = express()
app.use(cors());
const port = process.env.PORT || 3000
const mode = process.env.NODE_ENV || 'development'
const server = async () => {
    try {
        if (mode === "development") {
            await mongoose.connect(process.env.DEVELOPMENT_DB, { useNewUrlParser: true })
        } else if (mode === "test") {
            await mongoose.connect(process.env.TEST_DB, { useNewUrlParser: true })
        } else if (mode === "production") {
            await mongoose.connect(process.env.PRODUCTION_DB, { useNewUrlParser: true })
        }

        app.use(express.json());
        
        app.use(morgan("dev"));

        app.get("/", (req, res) => {
            res.json({ message: "Welcome to my the API" });
        });
        app.use("/api/v1/", routes);
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use("*", (req, res, next) => {
            res.status(404).json({
                error: "NOT FOUND",
            });
        });
        app.listen(port, () => {
            console.log(`The server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
server()

export default app