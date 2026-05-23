export interface QueryRequest {

    databaseType: string;

    userQuery: string;
}

export interface QueryResponse {

    sql: string;

    result: any[];

    requiresConfirmation?: boolean;
}
