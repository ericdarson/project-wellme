export class Objectives {
    kode_promo: string;
    title : string;
    subtitle :  string ;
    description :  string ;
    current_amount :  number ;
    target_akumulasi : number  ;
    cashback :  string ;
    date_available : string;
}

export class Promotions {
    kode_promo: string;
    title : string;
    subtitle :  string ;
    description :  string ;
    minimum_transaction: number;
    cashback: string;
    date_available: string;
}

export class History {
    kode_promo: string;
    title : string;
    type :  string ;
    end_date : string;
}

export class PromotionResponse {
    objectives: Objectives[];
    promotions: Promotions[];
    history: History[];
}

