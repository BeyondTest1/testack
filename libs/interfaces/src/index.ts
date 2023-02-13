export interface IDatabase {
  provider: string;
  host: string;
  port: number;
  user: string;
  password: string;
  reset: () => void;
  seed: () => void;
}

export type TestEnvConfig = {
  providers?: (IDatabase /*| IApi*/)[];
  actions?: {provider: string, method: string, event: string}[];

  // {
    // [eventName:string]: any[] ;
    // [eventName:string]: {provider: string, action: string}[] ;
    
    // [eventName in 'test_start'| 'test_done'| 'setup'| 'teardown']?: {provider: string, action: string}[];
  
    // [setup:string]: any[];
    // [add_hook:string]: any[];
    // [test_start:string]: any[];
    // [start_describe_definition:string]: any[];
    // [add_test:string]: any[];
    // [finish_describe_definition:string]: any[];
    // [run_start:string]: any[];
    // [run_describe_start:string]: any[];
    // [hook_start:string]: any[];
    // [hook_success:string]: any[];
    // [test_fn_start:string]: any[];
    // [test_fn_success:string]: any[];
    // [test_done:string]: any[];
    // [run_describe_finish:string]: any[];
    // [run_finish:string]: any[];
    // [teardown:string]: any[];
  // };
};
