import dotenv from "dotenv";
dotenv.config()
export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ATLP Aristide",
            description: "This is a backend APIs for my Capstone project",
            version: "1.0.0",
            contact: {
                name: "NIYONGABO Aristide",
                email: "niyongaboaristide17@mail.com",
            },
        },
        servers: [{
            url: process.env.DEVELOPMENT_URL,
            name: "Local server",
        }, ],
    },
    apis: ["./routes/api/*.js"],
}