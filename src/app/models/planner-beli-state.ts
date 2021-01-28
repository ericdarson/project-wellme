export class PlannerBeliState {
    pembelian:StatePembelian[];
    nominal_pembelian?:number;
    kode_promo?:string;
}
export class StatePembelian{
    id_jenis_reksadana:number;
    nama_plan:string;//nama jenis reksadana
    id_produk?:number;
    nama_produk?:string;
    percentage?:number;
    minimum_pembelian?:number;

}