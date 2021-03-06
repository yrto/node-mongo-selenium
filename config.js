import dotenv from "dotenv";
dotenv.config();

// process.end deconstruction

const { DOMAIN, MONGO_PORT } = process.env;

export const MONGO_URL = `mongodb://${DOMAIN}:${MONGO_PORT}/test`;
