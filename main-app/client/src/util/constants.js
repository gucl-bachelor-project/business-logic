export const getBaseEndpoint = () => process.env.NODE_ENV === "development" ? "localhost:8000" : window.location.origin;
