// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl:'http://10.8.0.5:8071/login-web',
  profileUrl:'http://10.8.0.5:8071/profile',
  plannerDetailUrl:'http://10.8.0.5:8071/financial-planner/details',
  plannerListUrl:'http://10.8.0.5:8071/list-planner',
  deletePlannerUrl:'http://19.8.0.5:8071/deletePlanner',
  insertPlannerUrl:'http://10.8.0.5:8071/planner',
  getJenisReksadanaUrl:'http://10.8.0.5:8071/reksadana',
  getReksadanaUrl:'http://10.8.0.5:8071/products',
  checkSessionUrl: 'http://10.8.0.5:8071/check-session-web',
  simulasiPlannerUrl:'http://10.8.0.5:8071/simulasi-planner',
  profileResikoUrl:'http://10.8.0.5:8071/financial-planner/resiko',
  listReksadanaPlannerUrl:'http://10.8.0.5:8071/financial-planner/products',
  promoPlannerUrl:'http://10.8.0.5:8071/promo',
  promoUrl : 'http://10.8.0.5:8071/promo',
  BackwaardProjectionUrl:'http://10.8.0.5:8071',
  claimPromoUrl : 'http://10.8.0.5:8071/promo/claim',
  activedPromoUrl : 'http://10.8.0.5:8071/promo/activate',
  plannerPembelianUrl:'http://10.8.0.5:8071/financial-planner/pembelian',
  updatePlannerUrl:'http://10.8.0.5:8071/planner',
  plannerPenjualanUrl:'http://10.8.0.5:8071/financial-planner/penjualan'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
