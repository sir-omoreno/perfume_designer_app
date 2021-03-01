// Select the form
var form = d3.select("form");

// Create fragrance
form.on("submit", findPopularity);

form.on("reset", clearForm);

// List the number of Top Notes
function listTopNotes(topNoteCount) {
    // div for top note
    var topNoteSel = d3.select("#top-note-sel")
    topNoteSel.html("");
    // get the perfume notes data
    d3.json("/perfume_notes").then(function (perfumeNotesData, err) {
        if (err) { throw err };
        if (!perfumeNotesData) {
            console.log("I wasn't able to get data from the Web API you selected.");
            return;
        }

        var perfumeNotes = [];

        // find the names of the notes and sort them
        perfumeNotesData.forEach(data => perfumeNotes.push(data["Note Name"]));
        perfumeNotes.sort();
        

        console.log(perfumeNotes);
        // add drop downs for the number of notes selected
        for (i = 0; i < topNoteCount; i++) {
            var topNotesID = "topNote" + i;
            var topNotesDropDown = topNoteSel.append("select")
                .attr('id', topNotesID);
            perfumeNotes.forEach(item => {
                topNotesDropDown.append("option")
                    .text(item)
                    .attr("value", item);
            });
        }
        // Get the images
        var selectGroup = d3.selectAll("select");
        selectGroup.on('change', function () {
            console.log("newData");
            var newData = d3.select(this).property('value');
            var index = perfumeNotesData.findIndex(function (note) {
                return note["Note Name"] == newData;
            })
            var perf = perfumeNotesData[index]
            console.log(perf);
            var imgDiv = d3.select("top-note-img");
            imgDiv.append("img")
                .attr("href", perf["Note Image"])
                // .attr("x", "60")
                // .attr("y", "60")
                // .attr("width", "50")
                // .attr("height", "50");
        })
    }).catch(function (error) {
        console.log(error);
    });
}

// List the number of Middle Notes
function listMiddleNotes(middleNoteCount) {
    // div for middle note
    var middleNoteSel = d3.select("#middle-note-sel")
    middleNoteSel.html("");
    // get the perfume notes data
    d3.json("/perfume_notes").then(function (perfumeNotesData, err) {
        if (err) { throw err };
        if (!perfumeNotesData) {
            console.log("I wasn't able to get data from the Web API you selected.");
            return;
        }

        var perfumeNotes = [];

        // find the names of the notes and sort them
        perfumeNotesData.forEach(data => perfumeNotes.push(data["Note Name"]));
        perfumeNotes.sort();

        console.log(perfumeNotes);
        // add drop downs for the number of notes selected
        for (i = 0; i < middleNoteCount; i++) {
            var middleNotesID = "middleNote" + i;
            var middleNotesDropDown = middleNoteSel.append("select")
                .attr('id', middleNotesID);
            perfumeNotes.forEach(item => {
                middleNotesDropDown.append("option").text(item).attr("value", item);
            });
        }
    }).catch(function (error) {
        console.log(error);
    });
}

// List the number of Base Notes
function listBaseNotes(baseNoteCount) {
    // div for base note
    var baseNoteSel = d3.select("#base-note-sel")
    baseNoteSel.html("");
    // get the perfume notes data
    d3.json("/perfume_notes").then(function (perfumeNotesData, err) {
        if (err) { throw err };
        if (!perfumeNotesData) {
            console.log("I wasn't able to get data from the Web API you selected.");
            return;
        }

        var perfumeNotes = [];

        // find the names of the notes and sort them
        perfumeNotesData.forEach(data => perfumeNotes.push(data["Note Name"]));
        perfumeNotes.sort();

        console.log(perfumeNotes);
        // add drop downs for the number of notes selected
        for (i = 0; i < baseNoteCount; i++) {
            var baseNotesID = "baseNote" + i;
            var baseNotesDropDown = baseNoteSel.append("select")
                .attr('id', baseNotesID);
            perfumeNotes.forEach(item => {
                baseNotesDropDown.append("option").text(item).attr("value", item);
            });
        }
    }).catch(function (error) {
        console.log(error);
    });

}

// function to find the popularity for selected features
function findPopularity() {
    // Prevent the page from refreshing if event is not null
    d3.event.preventDefault();
    var topNoteCount = d3.select("#top-note-count").property("value");
    var middleNoteCount = d3.select("#middle-note-count").property("value");
    var baseNoteCount = d3.select("#base-note-count").property("value");
    console.log(topNoteCount);
    console.log(middleNoteCount);
    console.log(baseNoteCount);

    // find all the top notes selected
    var notesList = [];
    for (i = 0; i < topNoteCount; i++) {
        var topNotesID = "#topNote" + i;
        var topNoteFeature = "top_note_" + d3.select(topNotesID).property("value");
        console.log(topNoteFeature);
        notesList.push(topNoteFeature);
    }
    // find all the middle notes selected
    for (i = 0; i < middleNoteCount; i++) {
        var middleNotesID = "#middleNote" + i;
        var middleNoteFeature = "middle_note_" + d3.select(middleNotesID).property("value");
        console.log(middleNoteFeature);
        notesList.push(middleNoteFeature);
    }
    // find all the base notes selected
    for (i = 0; i < baseNoteCount; i++) {
        var baseNotesID = "#baseNote" + i;
        var baseNoteFeature = "base_note_" + d3.select(baseNotesID).property("value");
        console.log(baseNoteFeature);
        notesList.push(baseNoteFeature);
    }
    console.log(notesList);
}

function clearForm() {
    d3.select("#top-note-sel").html("");
    d3.select("#middle-note-sel").html("");
    d3.select("#base-note-sel").html("");

}