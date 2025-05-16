const { Sequelize } = require("sequelize");
require("dotenv").config();

// Sequelize Config for PostgreSQL
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  logging: false, // Set to true for SQL query logging
});

// PostgreSQL Connection (Sequelize)
async function connectToPostgres() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL via Sequelize");
  } catch (err) {
    throw new Error(`PostgreSQL connection error: ${err.message}`);
  }
}

// Combined Database Connection Function
async function connectToDB() {
  try {
    await connectToPostgres();
    return { sequelize }; // Return sequelize for model usage
  } catch (err) {
    console.error("Database connection failed:", err);
    if (sequelize) await sequelize.close();
    throw err;
  }
}

module.exports = { connectToDB, sequelize }; // Export sequelize for model definitions