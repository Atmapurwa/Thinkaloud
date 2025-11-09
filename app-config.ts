// import type { AppConfig } from "./lib/types";

import { AppConfig } from "@/lib/livekit/types";

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: "Thinkaloud",
  pageTitle: "Call",
  pageDescription: "Thinkaloud Assignment Feature",

  // supportsChatInput: true,
  // supportsVideoInput: true,
  // supportsScreenShare: true,

  supportsChatInput: false,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  // logo: "/lk-logo.svg",
  // accent: "#002cf2",
  // logoDark: "/lk-logo-dark.svg",
  // accentDark: "#1fd5f9",
  startButtonText: "Mulai Percakapan",

  agentName: undefined,
};
