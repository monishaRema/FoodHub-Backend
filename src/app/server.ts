import { app } from "./app";
import { config } from "./config/env";

app.listen(config.PORT,() => {
    console.log(`server is running on ${config.PORT}`)
})