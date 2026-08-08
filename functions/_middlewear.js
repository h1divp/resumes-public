// Automatically serve en/jp version depending on http Accept-Language header.
export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (/^\/(en|ja)(\/|$)/.test(url.pathname)) {
    return context.next();
  }

  const accept = context.request.headers.get('accept-language') || '';
  const locale = /(^|,)\s*ja([-,;]|$)/i.test(accept) ? 'ja' : 'en';

  return Response.redirect(`${url.origin}/${locale}/`, 302);
}
