export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  [key: string]: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Health/status check for the Cloudflare Worker runtime
    if (url.pathname === '/worker-status') {
      return new Response(
        JSON.stringify({
          status: 'online',
          worker: 'sanai3i-3indak',
          mode: 'worker-with-assets',
          timestamp: new Date().toISOString(),
          configuredVariables: Object.keys(env).filter((k) => k !== 'ASSETS'),
        }),
        {
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
        }
      );
    }

    // Serve static Next.js assets from ./out
    return env.ASSETS.fetch(request);
  },
};
