import { KeyInfo } from './interfaces';

export const Get = async (alias: string): Promise<KeyInfo> => {
  return {
    alias: alias,
    expiration: new Date().toString(),
    url: {
      href: 'https://www.google.com',
      secure: true,
      favicon: 'https://www.google.com/favicon',
    },
  };
};
