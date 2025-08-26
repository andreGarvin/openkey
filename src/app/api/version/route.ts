import { NextResponse } from "next/server";

import { getConfig } from "src/tools/config";

export async function GET() {
  const config = getConfig();

  const commitSha = process.env.COMMIT_SHA || "no revision";
  const appName = process.env.APP_NAME || config.name;

  return NextResponse.json({ appName, commitSha });
}
