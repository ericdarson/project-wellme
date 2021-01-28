export class BackwardProjectionResult{
    id_produk:string="";
    nama_produk:string="";
    date:string="";
    datestring:string="";
    current_nab:number=0;
    cagr_one_year:number=0;
    cagr_three_months:number=0;
    cagr_one_month:number=0;
    cagr_one_week:number=0;
    cart_data_one_year:BackwardProjectionResultDetails[]=[];
    cart_data_three_months:BackwardProjectionResultDetails[]=[];
    cart_data_one_month:BackwardProjectionResultDetails[]=[];
    cart_data_one_week:BackwardProjectionResultDetails[]=[];
    bank_kustodian:string;
    bank_penampung:string;
}

export class BackwardProjectionResultDetails{
    date_daily:string;
    datestring_daily:string;
    nab_daily:number;
}