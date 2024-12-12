export const basePath = process.env.BASE_PATH
  ? process.env.BASE_PATH.startsWith("/")
    ? process.env.BASE_PATH
    : `/${process.env.BASE_PATH}`
  : "";
