export type UrlInputInfo = {
  url: string;
  isSecure: boolean;
  redirectUrl: string | null;
}

export type KeyInfo = UrlInputInfo & {
  alias: string;
  createdAt: Date;
  expiresAt: Date;
};

export type KeyInputInfo = {
  url: string;
  expiration: number;
}
