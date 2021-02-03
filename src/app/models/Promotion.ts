export class Objectives {
    kode_promo: string;
    title : string;
    subtitle :  string ;
    description :  string ;
    current_amount :  number = -1;
    target_akumulasi : number = 0;
    cashback :  number ;
    date_available : string;
}

export class Promotions {
    kode_promo: string;
    title : string;
    subtitle :  string ;
    description :  string ;
    minimum_transaction: number;
    cashback: number;
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

