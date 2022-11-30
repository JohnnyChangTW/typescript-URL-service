export interface IHandlerValidateIPRequest {
  ip: string;
}

export interface IHandlerValidateIPResponse {
  status: boolean;
}

export interface IModelRoot {
  version: string;
  date: number;
  kubernetes: boolean;
}

export interface IModelAddress {
  ip: string;
}

export interface IModelQuery {
  addresses: IModelAddress[];
  client_ip: string;
  created_at?: number;
  domain: string;
}

export interface IUtilsHTTPError {
  message: string;
}