const express = require("express")
const db = require("./models")
const cors = require("cors")

const app = express()

app.use(express.json());
app.use(cors());

const testRouter  = require("./routes/Test")
app.use("/test", testRouter)

db.sequelize.sync().then(() => {
    
    app.listen(8001,()=> {
        console.log(`Server is running at port 8001 `)
    });
})

