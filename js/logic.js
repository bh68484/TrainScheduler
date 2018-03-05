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
var initialTrainTime = "";

// Capture Button Click
$("#submit").on("click", function() {
  // Don't refresh the page!
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  var name = $("#trainName")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var initialTrainTime = $("#firstTrainTime")
    .val()
    .trim();
  var frequency = $("#frequency")
    .val()
    .trim();

  database.ref().push({
    name: name,
    destination: destination,
    initialTrainTime: initialTrainTime,
    frequency: frequency
  });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on(
  "child_added",
  function(childSnapshot) {
    // Log everything that's coming out of snapshot
    var newTrainName = childSnapshot.val().name;
    var newLocationDestination = childSnapshot.val().destination;
    var newFirstTrainTime = childSnapshot.val().initialTrainTime;
    var newFrequencyTime = childSnapshot.val().frequency;

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().initialTrainTime);
    console.log(childSnapshot.val().frequency);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(newFirstTrainTime, "hh:mm").subtract(
      1,
      "years"
    );
    console.log(startTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log(currentTime);

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    console.log("Diff between the times " + diffTime);

    // Time apart
    var tRemainder = diffTime % newFrequencyTime;
    console.log("Time Remaining " + tRemainder);

    // Minutes Until Train arrives
    var tMinutesTillTrain = newFrequencyTime - tRemainder;
    console.log("Time Until Next Train " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Next Train " + nextTrain);
    var catchTrain = moment(nextTrain).format("HH:mm");
    console.log("Next Train Time " + catchTrain);

    var snap = childSnapshot.val();
    var tableRef = $("#trainSchedule");
    var newRow = $("<tr>");
    var nameDiv = $("<td>");
    nameDiv.append(snap.name);
    var destinationDiv = $("<td>");
    destinationDiv.append(snap.destination);
    var frequencyDiv = $("<td>");
    frequencyDiv.append(snap.frequency);
    var arrivalDiv = $("<td>");
    arrivalDiv.append(catchTrain);
    var minutesAwayDiv = $("<td>");
    minutesAwayDiv.append(tMinutesTillTrain);
    newRow.append(
      nameDiv,
      destinationDiv,
      frequencyDiv,
      arrivalDiv,
      minutesAwayDiv
    );
    tableRef.append(newRow);

    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
