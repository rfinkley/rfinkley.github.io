let database = firebase.database();

database.ref().orderByChild('frequency').on("value", function (snapshot) {
    $("#trainSchedule").empty();

    snapshot.forEach(function (childSnapshot) {

        let databaseTrainName = childSnapshot.val().trainName;
        let databaseTrainDestination = childSnapshot.val().trainDestination;
        let databaseFirstTrain = childSnapshot.val().firstTrain;
        let databaseFrequency = childSnapshot.val().frequency;

        var tFrequency = databaseFrequency;
        var firstTime = databaseFirstTrain;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        $("#trainSchedule").append(
            $("<tr>").append(
                $("<td>").text(databaseTrainName),
                $("<td>").text(databaseTrainDestination),
                $("<td>").text(databaseFrequency),
                $("<td>").text(moment(nextTrain).format("hh:mm A")),
                $("<td>").text(tMinutesTillTrain)
            )
        );
    });

});

$('#submit').on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var firstTrain = $("#trainFirstTime").val().trim();
    var frequency = $("#trainFrequency").val().trim();

    if (trainName == "" || trainDestination == "" || firstTrain == "" || frequency == "") {
            $('#emptyInput').modal('show');
    } else {

        var newTrain = {
            trainName: trainName,
            trainDestination: trainDestination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        console.log(newTrain);
        

        database.ref().push(newTrain);

        database.ref().on("child_added", function (childSnapshot, prevChildKey) {
            let databaseTrainName = childSnapshot.val().trainName;
            let databaseTrainDestination = childSnapshot.val().trainDestination;
            let databaseFirstTrain = childSnapshot.val().firstTrain;
            let databaseFrequency = childSnapshot.val().frequency;

            var tFrequency = databaseFrequency;
            var firstTime = databaseFirstTrain;
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            var currentTime = moment();
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            var tRemainder = diffTime % tFrequency;
            var tMinutesTillTrain = tFrequency - tRemainder;
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");

            $("#trainName").val("");
            $("#trainDestination").val("");
            $("#trainFirstTime").val("");
            $("#trainFrequency").val("");
        });

    }

});