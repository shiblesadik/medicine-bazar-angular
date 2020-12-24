export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyDmYl429JF-yuNNv-io7wwNYage36IyUT4',
    authDomain: 'medicines-bazar.firebaseapp.com',
    databaseURL: 'https://medicines-bazar.firebaseio.com',
    projectId: 'medicines-bazar',
    storageBucket: 'medicines-bazar.appspot.com',
    messagingSenderId: '923227293329',
    appId: '1:923227293329:web:738e4805df4569d82c2130',
    measurementId: 'G-63KW32X1T9'
  },
  authKey: {
    AUTH_SECRET_KEY1: '5749fc84d3cbb27af460a7e594b2791a5ac007bda5de91ca5d5f1825b68e5320187830656f5543578c3853ae46d89c2a0408244efa1c61b28828eb20e15a4f1c',
    AUTH_SECRET_KEY2: 'd60eeb48f57bef919d56109800707687252440e88c6623c23d767c55658398c6623c43578c3853c203062f547d9ae46d8923d767c5853853853c20306c20306c',
    AUTH_SECRET_KEY3: 'c105caf287773d17fedadbd60eeb48f57bef919d56109800707687252440e88c6623c23d767c556583902fa45a7ea6e0aabd917f3bbc20d37225d90f9914760a',
    AUTH_SECRET_KEY4: '7878356ab0b095198628e2bb0a3c3ce8bd0041387d44834af3d6723c00ecd2df3a6821e31705dd92a1f47d8ad41836266a1d9b8b1c88a6e9f9ab3cfc48792ed1',
    AUTH_SECRET_KEY5: '2c17ae8855b19f4ae9dd0b465013b94b96b6915f14aaeb36eb7c3b008bb743c4c7370ad87da2063f18a4f648ac203062f547d97cbea92a1f7e2a22751fdcbfeb',
  },
  // server: 'http://localhost:11211/',
  server: 'https://medicine-bazar-backend.herokuapp.com/',
  http: {
    auth: {
      user: {
        register: 'api/auth/user/register',
        login: 'api/auth/user/login',
      },
      admin: 'api/auth/admin/register'
    },
    medicine: {
      all: 'api/medicine/all',
      single: 'api/medicine/single/',
      insert: 'api/medicine/insert',
      update: 'api/medicine/update/',
      delete: 'api/medicine/delete/',
    }
  }
};
