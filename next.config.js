/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    THE_MOVIE_DB_API_KEY: process.env.THE_MOVIE_DB_API_KEY
  }
}

module.exports = nextConfig
