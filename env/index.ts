import { envLocal } from "./local"

type EnvironmentType = "development" | "production" | "test";

export interface IEnvironment {
  endpoint: string;
  api: string;
  endpointRefreshHour: number;
  endpointRefreshMinute: number;
}

const envFileRelationship: Record<EnvironmentType, any> = {
  'test': envLocal,
  'development': envLocal,
  'production': envLocal
}

const getEnvironment = (): IEnvironment => {
  const environment = process.env['NODE_ENV'];
  return envFileRelationship[environment]
};

export const env = getEnvironment();