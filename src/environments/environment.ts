// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl:'http://10.8.0.5:8080/login-web',
  profileUrl:'http://10.8.0.5:8096/profile',
  plannerDetailUrl:'http://10.8.0.3:8083/financial-planner/details',
  plannerListUrl:'http://10.8.0.3:8090/list-planner',
  deletePlannerUrl:'http://localhost:8083/deletePlanner',
  insertPlannerUrl:'http://10.8.0.3:8090/planner',
  getJenisReksadanaUrl:'http://localhost:8083/reksadana',
  getReksadanaUrl:'http://localhost:8083/products',
  checkSessionUrl: 'http://10.8.0.3:8080/check-session-web',
  simulasiPlannerUrl:'http://10.8.0.3:8090/simulasi-planner',
  profileResikoUrl:'http://10.8.0.3:8084/financial-planner/resiko',
  listReksadanaPlannerUrl:'http://10.8.0.3:8085/financial-planner/products',
  promoUrl : 'http://10.8.0.5:8093/promo',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
