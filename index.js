//? DEPENDENCIES
import  express  from "express";
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"


//? ROUTES AND MIDDLEWARE IMPORTSs
import login from "./routes/login.js"
import locations from "./routes/locations.js"
import logOut from "./routes/logOut.js"
import globalErrorHandler from "./middleware/globalErrorHandler.js";

dotenv.config()

//? CONNECT TO MONGOOSE
mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PW}@100best.h23zo.mongodb.net/100best`)
mongoose.connection.on("open", ()=> console.log("Database connection established!"))
mongoose.connection.on("error", ()=> console.error)


dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors({origin: "http://localhost:3000", credentials: true})); 
app.use(cookieParser())


app.use("/login", login)
app.use("/locations", locations)
app.use("/logout", logOut)


//? Global Error Handler
app.use(globalErrorHandler)

app.listen(process.env.PORT || 4000, () => {
    console.log("Server Listening in PORT: ", process.env.PORT)
})