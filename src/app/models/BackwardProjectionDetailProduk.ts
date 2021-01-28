export class BackwardProjectionDetailProduk {
    id_produk:string="Loading Data";
    nama_produk:string="Loading Data";
    cagr_one_week:number=0;
    cagr_one_month:number=0;
    cagr_three_months:number=0;
    cagr_one_year:number=0;
    nab:number=0;
    expense_ratio:number=0;
    aum:number=0;
    manager_investasi:string="Loading Data";
    resiko:string="Loading Data";
    minimal_pembelian:string="Loading Data";
    bank_kustodian:string="Loading Data";
    bank_penampung:string="Loading Data";
    system_date:string="Loading Data";
    system_date_string:string="Loading Data";
    one_week_daily_nab:BackwardProjetionDailyNab[]=[];
    one_month_daily_nab:BackwardProjetionDailyNab[]=[];
    three_months_daily_nab:BackwardProjetionDailyNab[]=[];
    one_year_daily_nab:BackwardProjetionDailyNab[]=[];
}

export class BackwardProjetionDailyNab {
    date:string;
    datestring:string;
    nab_daily:number;
}