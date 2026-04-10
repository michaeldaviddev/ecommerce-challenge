export default async function handler(req, res) {
  const { createRequestHandler } = await import('@angular/ssr/node');
  const { default: serverApp } = await import('../dist/ecommerce-challenge/server/server.mjs');

  const handlerFn = createRequestHandler(serverApp);

  return handlerFn(req, res);
}
