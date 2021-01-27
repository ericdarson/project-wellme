
export class ResponseApi{
    error_schema : ERROR_SCHEMA;
    output_schema : any;
}

export class ERROR_MESSAGE{
    english : string;
    indonesian : string;
}

export class ERROR_SCHEMA{
    error_code:string;
    error_message: ERROR_MESSAGE;
}

