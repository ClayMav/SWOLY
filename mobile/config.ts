interface IConfig {
  AUTH0_CLIENT_ID: string;
  AUTH0_DOMAIN: string;
}

export const config: IConfig = {
  AUTH0_CLIENT_ID:
    process.env.AUTH0_CLIENT_ID || "Q8ZKeAO0064HRX6se50JL6pBOsefJAab",
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || "https://swoly.auth0.com"
};
