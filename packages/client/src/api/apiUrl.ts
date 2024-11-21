import { getCodeSandboxHost } from "@codesandbox/utils";

const codeSandboxHost = getCodeSandboxHost(3001);
export const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}:3001`
  : "http://localhost:3001";
