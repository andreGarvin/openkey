import { NextRequest, NextResponse } from "next/server";

import { KeyTable } from "src/database/repositories/key";
import connection from "src/database";

import { logger } from "src/tools/logger";
import { unwrap } from "src/tools/unwrap";

async function databaseConnectionCheck() {
  const database = connection(process.env.DATABASE_CONNECTION_STRING);

  const result = await unwrap(database.$count(KeyTable));
  if (!result.ok) {
    logger().error({
      message: "failed to count keys table",
      error_message: result.error.message,
    });
    return false;
  }

  return true;
}

export async function GET(req: NextRequest) {
  const heavy = req.nextUrl.searchParams.get("heavy");
  if (heavy) {
    const check = await databaseConnectionCheck();
    if (check) {
      return NextResponse.json({ message: "service is running!" });
    }

    return NextResponse.json({ message: "service is running." });
  }

  return NextResponse.json({ message: "service is running" });
}
