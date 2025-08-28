import {
  pgTable as Table,
  timestamp,
  varchar,
  boolean,
  serial,
  index,
  text,
} from "drizzle-orm/pg-core";
import { v4 as uuidV4 } from "uuid";
import { eq } from "drizzle-orm";

import { DatabaseConnectionType } from "src/database";

import { KeyInfo, UrlInputInfo } from "src/modules/key";

// keys table database schema
const KeySchema = {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid", { length: 36 }).unique().notNull(),
  alias: text("alias").unique().notNull(),
  url: text("url").unique().notNull(),
  isSecure: boolean("is_secure").default(false).notNull(),
  redirectUrl: text("redirect_url").unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
};

export const KeyTable = Table("keys", KeySchema, (t) => [
  index("alias_idx").on(t.alias),
]);

// return value for the keys table
const KeyReturn = {
  id: KeyTable.uuid,
  url: KeyTable.url,
  uuid: KeyTable.uuid,
  alias: KeyTable.alias,
  isSecure: KeyTable.isSecure,
  expiresAt: KeyTable.expiresAt,
  createdAt: KeyTable.createdAt,
  redirectUrl: KeyTable.redirectUrl,
};

export interface KeyRepositoryInterface {
  deleteKey(uuid: string): Promise<void>;
  getKeyByUuid(uuid: string): Promise<KeyInfo | null>;
  getKeyByAlias(alias: string): Promise<KeyInfo | null>;
  insertKey(alias: string, urlInfo: any, expiresAt: Date): Promise<KeyInfo>;
}

class KeyRepository implements KeyRepositoryInterface {
  private db: DatabaseConnectionType;

  constructor(connection: DatabaseConnectionType) {
    this.db = connection;
  }

  async deleteKey(keyUuid: string): Promise<void> {
    await this.db.delete(KeyTable).where(eq(KeyTable.uuid, keyUuid));
  }

  async getKeyByAlias(alias: string): Promise<KeyInfo | null> {
    const [result] = await this.db
      .select(KeyReturn)
      .from(KeyTable)
      .where(
        eq(KeyTable.alias, alias)
      );

    return result ? result : null;
  }

  async getKeyByUuid(keyUuid: string): Promise<KeyInfo | null> {
    const [result] = await this.db
      .select(KeyReturn)
      .from(KeyTable)
      .where(eq(KeyTable.uuid, keyUuid));

    return result ? result : null;
  }

  async insertKey(alias: string, urlInfo: UrlInputInfo, expiresAt: Date): Promise<KeyInfo> {
    const input = {
      alias,
      uuid: uuidV4(),
      url: urlInfo.url,
      expiresAt: expiresAt,
      secure: urlInfo.isSecure,
      redirect:  urlInfo.redirectUrl,
    };

    const [result] = await this.db
      .insert(KeyTable)
      .values(input)
      .returning(KeyReturn);

    return result;
  }
}

export default KeyRepository;
