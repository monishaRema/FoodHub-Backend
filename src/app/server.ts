import { app } from "./app.js";
import { config } from "./config/env.js";

app.listen(config.PORT,() => {
    console.log(`server is running on ${config.PORT}`)
})
