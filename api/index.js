export default async function handler(req, res) {
  const server = await import('../dist/ecommerce-challenge/server/server.mjs');

  return server.reqHandler(req, res);
}
