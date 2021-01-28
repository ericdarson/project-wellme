export class BackwardProjectionDetailProduk {
    id_produk:string;
    nama_produk:string;
    cagr_one_week:Float64Array;
    cagr_one_month:Float64Array;
    cagr_three_months:Float64Array;
    cagr_one_year:Float64Array;
    nab:Float64Array;
    expense_ratio:Float64Array;
    aum:Float64Array;
    manager_investasi:string;
    resiko:string;
    minimal_pembelian:string;
    bank_kustodian:string
    bank_penampung:string;
    system_date:string;
    system_date_string:string;
    one_week_daily_nab:BackwardProjetionDailyNab[];
    one_month_daily_nab:BackwardProjetionDailyNab[];
    three_months_daily_nab:BackwardProjetionDailyNab[];
    one_year_daily_nab:BackwardProjetionDailyNab[];
}

export class BackwardProjetionDailyNab {
    date:string;
    datestring:string;
    nab_daily:number;
}