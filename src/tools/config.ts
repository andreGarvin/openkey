const packageJSON = require("../../package.json");

type ProjectConfig = {
  name: string;
  description: string;
};

export const getConfig = () => {
  return packageJSON as ProjectConfig;
};
