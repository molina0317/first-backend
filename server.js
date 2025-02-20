const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(cors({
  origin: "https://webgrid.djpgroup.co.uk",  // Frontend URL (Vercel)
  credentials: true,  // If you are using cookies or credentials
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/grid", require("./routes/gridRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
