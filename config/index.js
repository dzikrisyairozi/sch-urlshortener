import dotenv from "dotenv"

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file  ");
}

const config = {
  dbUrl: process.env.DB_CONNECT,
  PORT: process.env.PORT || 4000,
};

export default config;