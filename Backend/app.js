const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const main = require("./db");
const bodyParser = require("body-parser");
const router = require("./Routes/authRouter");
const productRouter = require("./Routes/ProductRouter");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", router);
app.use("/product",productRouter);
app.get("/", (req, res) => {
  res.send("At Home");
});
const PORT = process.env.PORT | 3000;

main()
.then(() => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log("on port 3000");
  });
})
.catch((error)=>{
    console.log(error);
})
