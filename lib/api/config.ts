// API Configuration - Update these values when integrating with real backends
// Environment variables take precedence over defaults

export const API_CONFIG = {
  // Shopify Configuration (server-side only for sensitive values)
  shopify: {
    storeUrl: process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || "",
    storefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN || "",
    apiVersion: process.env.SHOPIFY_API_VERSION || "2024-01",
  },

  // Strapi Configuration (server-side only for sensitive values)
  strapi: {
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL || "",
    apiToken: process.env.STRAPI_API_TOKEN || "",
  },

  // Feature flags
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false",

  // API timeouts
  timeout: 10000,
}

// Helper to check if we should use real APIs
export const shouldUseMockData = (): boolean => {
  return API_CONFIG.useMockData || !API_CONFIG.shopify.storeUrl || !API_CONFIG.strapi.baseUrl
}
