import * as fb from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyDG2AoLosXoCT1LWSm10Y9vAp9XmxIoIgY',
  authDomain: 'project-cars-f591e.firebaseapp.com',
  databaseURL: 'https://project-cars-f591e.firebaseio.com',
  projectId: 'project-cars-f591e',
  storageBucket: 'project-cars-f591e.appspot.com',
  messagingSenderId: '843648664664',
  appId: '1:843648664664:web:bebc4b83c20fd970'
}
// eslint-disable-next-line no-unused-vars
let app = true
if (!fb.apps.length) {
  app = fb.initializeApp(firebaseConfig)
}
