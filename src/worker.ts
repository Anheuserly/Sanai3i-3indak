export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  APK_DOWNLOAD_URL?: string;
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

    // Handle large APK downloads: Cloudflare Workers enforces a 25 MiB asset limit.
    // Redirect requests for the APK to the release host / external storage.
    if (
      url.pathname === '/downloads/sanai3i-3indak.apk' ||
      url.pathname === '/sanai3i-3indak.apk' ||
      url.pathname.endsWith('.apk')
    ) {
      const apkUrl =
        env.APK_DOWNLOAD_URL ||
        'https://github.com/Anheuserly/Sanai3i-3indak/releases/latest/download/sanai3i-3indak.apk';
      return Response.redirect(apkUrl, 302);
    }

    // Serve static Next.js assets from ./out
    return env.ASSETS.fetch(request);
  },
};
