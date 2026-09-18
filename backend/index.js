const connectToMongo = require("./database/db");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

connectToMongo();

const port = process.env.PORT || 4000;

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_API_LINK || "*",
  })
);

// JSON parser
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Hello 👋 I am Working Fine 🚀",
    status: "Backend is running successfully",
    path: req.path,
  });
});

// Static media files
app.use("/media", express.static(path.join(__dirname, "media")));

// Admin routes
app.use("/api/admin", require("./routes/details/admin-details.route"));

// Faculty routes
app.use("/api/faculty", require("./routes/details/faculty-details.route"));

// Student routes
app.use("/api/student", require("./routes/details/student-details.route"));

// Other API routes
app.use("/api/branch", require("./routes/branch.route"));
app.use("/api/subject", require("./routes/subject.route"));
app.use("/api/notice", require("./routes/notice.route"));
app.use("/api/timetable", require("./routes/timetable.route"));
app.use("/api/material", require("./routes/material.route"));
app.use("/api/exam", require("./routes/exam.route"));
app.use("/api/marks", require("./routes/marks.route"));

// Fallback route for Vercel testing
app.use((req, res) => {
  res.status(200).json({
    message: "Backend is working",
    requestedPath: req.path,
    method: req.method,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server Listening On port ${port}`);
});

// Export Express app for Vercel
module.exports = app;