import * as Sentry from "@sentry/react";
// import * as Integrations from '@sentry/integrations'
import { SENTRY_DSN } from "constants/env";

export const init = () => {
  return Sentry.init({
    dsn: `${SENTRY_DSN}`
    // integrations: [
    //     new Integrations.CaptureConsole({ levels: ['warn', 'error'] })
    // ]
  });
};
