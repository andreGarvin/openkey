import {
  pgTable as Table,
  timestamp,
  integer,
  varchar,
  serial,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { v4 as uuidV4 } from "uuid";
import { eq } from "drizzle-orm";

import { DatabaseConnectionType } from "src/database";

import { RecordNotFoundError } from "src/database/repositories";
import { KeyTable } from "src/database/repositories/key";
import { ReportInfo } from "src/modules/report";

export const reportLabelEnums = pgEnum(
  "label",
  [
    "MALWARE",
    "PHISHING",
    "ILLEGAL_CONTENT",
    "ADULT_CONTENT",
    "SPAM",
    "HARASSMENT",
    "HATE_SPEECH",
    "SCAM",
    "COPYRIGHT",
    "MISLEADING",
    "BROKEN_LINK",
    "OTHER"
  ]
);

// Reports table database schema
const ReportSchema = {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid", { length: 36 }).unique().notNull(),
  keyId: integer("key_id")
  .references(() => KeyTable.id, { onDelete: "cascade" })
  .notNull(),
  label: varchar("label", { length: 36 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
};

export const ReportTable = Table("reports", ReportSchema);

const ReportReturn = {
  id: ReportTable.uuid,
  uuid: ReportTable.uuid,
  label: ReportTable.label,
  createdAt: ReportTable.createdAt,
};

export interface ReportRepositoryInterface {
  getReportsByKeyUuid(uuid: string): Promise<ReportInfo[]>;
  insertReport(uuid: string, label: string): Promise<ReportInfo>;
}

class ReportRepository implements ReportRepositoryInterface {
  private db: DatabaseConnectionType;

  constructor(connection: DatabaseConnectionType) {
    this.db = connection;
  }

  async getReportsByKeyUuid(keyUuid: string): Promise<ReportInfo[]> {
    const [key] = await this.db
      .select({ id: KeyTable.id })
      .from(KeyTable)
      .where(eq(KeyTable.uuid, keyUuid));

    if (!key) throw RecordNotFoundError;

    const results = await this.db
      .select(ReportReturn)
      .from(ReportTable)
      .where(eq(ReportTable.keyId, key.id));

    return results;
  }

  async insertReport(
    keyUuid: string,
    label: string
  ): Promise<ReportInfo> {
    const [key] = await this.db
      .select({ id: KeyTable.id })
      .from(KeyTable)
      .where(eq(KeyTable.uuid, keyUuid));

    if (!key) throw RecordNotFoundError;

    const input = {
      label,
      keyId: key.id,
      uuid: uuidV4()
    };

    const [result] = await this.db
      .insert(ReportTable)
      .values(input)
      .returning(ReportReturn);

    return result;
  }
}

export default ReportRepository;
