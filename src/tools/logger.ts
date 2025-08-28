import winston, { format } from "winston";

import { getConfig } from "src/tools/config";

let Logger: winston.Logger;
const environment =
  process.env.ENV || process.env.NODE_ENV || process.env.NEXT_PUBLIC_ENV;

const FormatterPrintf = format.printf(
  (log: winston.Logform.TransformableInfo) => {
    const message = `${log.timestamp} level=${log.level} message=${log.message}`;

    const metadata = Object.entries(
      log.metadata as { [k: string]: string }
    ).reduce((prev, [label, text]) => {
      return prev ? `${prev} ${label}=${text}` : `${label}=${text}`;
    }, "");

    return `${message} ${metadata}`;
  }
);

export function logger(): winston.Logger {
  if (Logger) {
    return Logger;
  }

  const config = getConfig();

  let formatter: winston.Logform.Format;
  let logLevel = "info";

  if (["dev", "development"].includes(environment as string)) {
    logLevel = "debug";
    formatter = format.combine(
      format.label(),
      format.metadata(),
      format.timestamp(),
      FormatterPrintf
    );
  } else if (environment === "test") {
    logLevel = "error";
    formatter = winston.format.json();
  } else {
    formatter = format.combine(
      format.label(),
      format.metadata(),
      format.timestamp(),
      FormatterPrintf
    );
  }

  Logger = winston.createLogger({
    level: logLevel,
    format: formatter,
    defaultMeta: {
      environment,
      service: config.name,
    },
    transports: [new winston.transports.Console()],
  });

  return Logger;
}
