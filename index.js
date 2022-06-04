const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const nodeCron = require("node-cron");
const { deleteExpiredEntries } = require("./cronjobs/scheduledScripts");

const app = express();
app.use(express.json({ extended: false }));
connectDB();
app.use(express.static("client/build"));

app.get("/", function (_req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use("/", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

// cronjobs makes an assumption that the server has constant uptime
nodeCron.schedule("0 0 0 * * *", deleteExpiredEntries);
