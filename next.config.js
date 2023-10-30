/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    THE_MOVIE_DB_API_KEY: process.env.THE_MOVIE_DB_API_KEY,
    LOCAL_URL_PREFIX: process.env.LOCAL_URL_PREFIX
  }
}

module.exports = nextConfig
