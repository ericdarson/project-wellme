// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl:'http://10.8.0.5:1000/wellme/authentication/api/login-web',
  logoutUrl:'http://10.8.0.5:1000/wellme/authentication/api/logout-web',
  profileUrl:'http://10.8.0.5:1000/wellme/authentication/api/profile',
  plannerDetailUrl:'http://10.8.0.5:1000/wellme/financial-planner/api/financial-planner/details',
  plannerListUrl:'http://10.8.0.5:1000/wellme/financial-planner/api/list-planner',
  deletePlannerUrl:'http://10.8.0.5:1000/wellme/financial-planner/api/planner',
  insertPlannerUrl:'http://10.8.0.5:1000/wellme/financial-planner/api/planner',
  getJenisReksadanaUrl:'http://10.8.0.5:1000/wellme/backward-projection/api/reksadana',
  getReksadanaUrl:'http://10.8.0.5:1000/products',
  checkSessionUrl: 'http://10.8.0.5:1000/wellme/authentication/api/check-session-web',
  simulasiPlannerUrl:'http://10.8.0.5:1000/wellme/financial-planner/api/simulasi-planner',
  profileResikoUrl:'http://10.8.0.5:1000/wellme/financial-planner/api/financial-planner/resiko',
  listReksadanaPlannerUrl:'http://10.8.0.5:1000/wellme/transaction/api/financial-planner/products',
  promoPlannerUrl:'http://10.8.0.5:1000/wellme/promo/api/promo',
  promoUrl : 'http://10.8.0.5:1000/wellme/promo/api/promo',
  BackwaardProjectionUrl:'http://10.8.0.5:1000',
  claimPromoUrl : 'http://10.8.0.5:1000/wellme/promo/api/promo/claim',
  activedPromoUrl : 'http://10.8.0.5:1000/wellme/promo/api/promo/activate',
  plannerPembelianUrl:'http://10.8.0.5:1000/wellme/transaction/api/financial-planner/pembelian',
  updatePlannerUrl:'http://10.8.0.5:1000/wellme/financial-planner/api/planner',
  plannerPenjualanUrl:'http://10.8.0.5:1000/wellme/transaction/api/financial-planner/penjualan',
  tokenAPIGWUrl: 'http://10.8.0.5:1000/token',
  client_id : '9298123e',
  client_secret: '331b020fe96f47335a7658980512b1ee'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
