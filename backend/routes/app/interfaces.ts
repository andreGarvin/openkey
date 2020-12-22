export interface KeyInfo {
  alias: string;
  expiration: string;
  url: {
    href: string;
    secure: boolean;
    favicon: string;
  };
}
