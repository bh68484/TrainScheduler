# TrainScheduler

Project using firebase that will allow users to schedule trains and allow them to see up-to-date information about various trains schedules.

# Overview

This project is a train scheduler that allows a user to store train arrival and departure data. The application then allows for the user to see various information such as train name, destination, frequency, next arrival, and minutes away in real time. The application uses firebase to store the initial data, and the javascript is wrote to calculate the next arrival and minutes away using moments.js.

# Using

The user will input train name, destination, first train time (in military time), and the frequency of the train (in minutes). Next arrival and minutes away are calculated in the program and appended to the table along with the information the user submitted.
