// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Auth', function($firebaseAuth){
	// Initialize Firebase
	  var config = {
		apiKey: "AIzaSyBqDw7sYpT_ZBOXdIFhGfCE_UDjz4HzlaY",
		authDomain: "ionicloginteste-7d895.firebaseapp.com",
		databaseURL: "https://ionicloginteste-7d895.firebaseio.com",
		projectId: "ionicloginteste-7d895",
		storageBucket: "ionicloginteste-7d895.appspot.com",
		messagingSenderId: "696039273094"
	  };
	  firebase.initializeApp(config);

	var  rootRef = firebase.database().ref();
	
	// var endPoint = "https://ionicloginteste-7d895.firebaseio.com/users";
	//var usersRef = new Firebase(endPoint);
	
	//return rootRef$firebaseAuth(usersRef);
	
	return rootRef;
})

.controller('AppCtrl', function($scope, Auth){

	var user;
	var provider = new firebase.auth.FacebookAuthProvider();
	$scope.login = function(){
		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  user = result.user;
		  // ...
		  console.log(token);
		  console.log(user);
		  document.getElementById("imgPerfil").src = user.photoURL;
		  document.getElementById("nome").innerHTML = user.displayName;
		  document.getElementById("email").innerHTML = user.email;
		  		  
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
	};
	
})