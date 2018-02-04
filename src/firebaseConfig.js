import firebase from 'firebase'

var config = {
    apiKey: 'AIzaSyDt7EQc_GVKqPHWGtw_nT6osO63hOB4cIs',
    databaseURL: 'https://cartercapo-a6615.firebaseio.com/',
    storageBucket: 'cartercapo-a6615'
}

let db = firebase.initializeApp(config);

export default db;