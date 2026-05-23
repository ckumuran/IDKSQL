import { SupportedDatabase } from "./database";

export interface QueryRequest {

    databaseType: SupportedDatabase;

    userQuery: string;
}

export interface QueryResponse {

    sql: string;

    result?: any;

    requiresConfirmation?: boolean;

    error?: string;
}
