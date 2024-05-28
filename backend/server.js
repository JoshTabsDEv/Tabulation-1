const express = require("express")
const db = require("./models")
const cors = require("cors")

const app = express()

app.use(express.json());
app.use(cors());

const testRouter  = require("./routes/Test")
const testRouter1 = require("./routes/Judge")
const testRouter2 = require("./routes/auth")
const testRouter3 = require("./routes/event")
app.use("/test", testRouter)
app.use("/setUp", testRouter1)
app.use("/auth", testRouter2)
app.use("/event", testRouter3)

db.sequelize.sync().then(() => {
    
    app.listen(8001,()=> {
        console.log(`Server is running at port 8001 `)
    });
})

