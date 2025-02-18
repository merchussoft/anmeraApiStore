export interface MYSQLROOT {
    host: string | undefined
    user: string | undefined
    password: string | undefined
    database: string | undefined
    port: number | undefined
}

export interface QUERYRESPONSE {
    statusCode: number;
    message: string;
    data: any[];
}