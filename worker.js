/**
 * Lumi AI Proxy — Cloudflare Worker
 * ----------------------------------
 * This Worker sits between your public Mind Vault site and the Google
 * Gemini API. It keeps your API key secret (never shipped to the browser)
 * and forwards chat requests from Lumi to Gemini.
 *
 * SETUP:
 * 1. Go to https://dash.cloudflare.com -> Workers & Pages -> Create -> Worker
 * 2. Replace the default code with this file's contents, then Deploy.
 * 3. In the Worker's Settings -> Variables -> add an Environment Variable
 *    secret named GEMINI_API_KEY with your Gemini API key
 *    (get a free one at https://aistudio.google.com/app/apikey).
 * 4. In Settings -> Variables, optionally add ALLOWED_ORIGIN set to your
 *    site's URL (e.g. https://yourname.github.io) to restrict who can call it.
 * 5. Copy the Worker's URL (e.g. https://lumi-proxy.yourname.workers.dev)
 *    and paste it into LUMI_WORKER_URL near the top of index.html's script.
 */

const GEMINI_MODEL = 'gemini-2.0-flash';

export default {
  async fetch(request, env) {
    // Allow the browser's CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(env) });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response('Server is missing GEMINI_API_KEY', { status: 500, headers: corsHeaders(env) });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response('Invalid JSON body', { status: 400, headers: corsHeaders(env) });
    }

    // Basic sanity limits so a single user can't burn through your free quota
    if (Array.isArray(payload.contents) && payload.contents.length > 30) {
      payload.contents = payload.contents.slice(-30);
    }
    if (payload.generationConfig) {
      payload.generationConfig.maxOutputTokens = Math.min(
        payload.generationConfig.maxOutputTokens || 400,
        500
      );
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;

    const upstream = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(env),
      },
    });
  },
};

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
