// Initialize Firebase
var config = {
  apiKey: "AIzaSyDJLr7-7wWPfPo9LaGkQpIg84TnJyUkxFQ",
  authDomain: "traintracker-dd557.firebaseapp.com",
  databaseURL: "https://traintracker-dd557.firebaseio.com",
  projectId: "traintracker-dd557",
  storageBucket: "traintracker-dd557.appspot.com",
  messagingSenderId: "413872472783"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var initialTrainTime = 0;
var frequency = 0;

// Capture Button Click
$("#submit").on("click", function() {
  // Don't refresh the page!
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  name = $("#trainName")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  initialTrainTime = $("#firstTrainTime")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  database.ref().push({
    name: name,
    destination: destination,
    initialTrainTime: initialTrainTime,
    frequency: frequency
  });
});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on(
  "value",
  function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().initialTrainTime);
    console.log(snapshot.val().frequency);
    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
