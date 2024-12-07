// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// In other files that need Sentry
import { Sentry } from "@/lib/sentry";

Sentry.init({
  dsn: "https://b77614e5ce4d6fb4f0ba9955d397df05@o4508400149594112.ingest.us.sentry.io/4508400153591808",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
