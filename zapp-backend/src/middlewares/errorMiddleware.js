export const errorHandler = (err, _req, res, _next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
};