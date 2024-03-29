// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tokenPrefix: 'Bearer ',
  apiUrl: 'https://api.start-time.kz',
  tokenKey: 'token',
  pusher: {
    key: '171ff90acf88b95a905d',
    cluster: 'ap2',
  },
  facebookAppId: '273693090676071',

  cloudPaymentsPublicId: 'pk_64fb8281513795a2e90874649a881'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
