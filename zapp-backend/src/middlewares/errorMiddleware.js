export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV !== "test") {
    console.error("Error:", status, message);
  }
  res.status(status).json({ message });
}
