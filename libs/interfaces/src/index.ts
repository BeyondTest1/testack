export interface IDatabase {
  type: string;
  host: string;
  port: number;
  user: string;
  password: string;
  reset: () => void;
}

export type TestEnvConfig = {
  providers?: (IDatabase | IApi)[];

  actions?: {
    BeforeEach?: any[];
    AftereEach?: any[];
    BeforeAll?: any[];
    AfterAll?: any[];
  }
}