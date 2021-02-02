import { PlannerPortfolio } from "./planner-portfolio";

export class PlannerDetail {
    nama_plan:string;
    target_plan:number;
    current_amount:number;
    category:string;
    gambar:string;
    puzzle_sequence:string;
    due_date:string;
    rekomendasi_pembelian:number;
    portfolio:PlannerPortfolio[];
    periodic:string;
}
