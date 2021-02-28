// Create fragrance
form.on("submit",findPopularity);

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
                topNotesDropDown.append("option").text(item).attr("value",item);
            });
        }
    }).catch(function (error) {
        console.log(error);
    });
}

// List the number of Middle Notes
function listMiddleNotes(middleNoteCount) {
    // div for middle note
    var middleNoteSel = d3.select("#middle-note-sel")
    middleNoteSel.html("");
    d3.json("/perfume_notes").then(function (perfumeNotesData, err) {
        if (err) { throw err };
        if (!perfumeNotesData) {
            console.log("I wasn't able to get data from the Web API you selected.");
            return;
        }

        var perfumeNotes = [];

        perfumeNotesData.forEach(data => perfumeNotes.push(data["Note Name"]));
        perfumeNotes.sort();

        console.log(perfumeNotes);
        for (i = 0; i < middleNoteCount; i++) {
            var middleNotesID = "middleNote" + i;
            var middleNotesDropDown = middleNoteSel.append("select")
                .attr('id', middleNotesID);
            perfumeNotes.forEach(item => {
                middleNotesDropDown.append("option").text(item).attr("value",item);
            });
        }
    }).catch(function (error) {
        console.log(error);
    });
}

// List the number of Base Notes
function listBaseNotes(baseNoteCount) {
    var baseNoteSel = d3.select("#base-note-sel")
    baseNoteSel.html("");
    d3.json("/perfume_notes").then(function (perfumeNotesData, err) {
        if (err) { throw err };
        if (!perfumeNotesData) {
            console.log("I wasn't able to get data from the Web API you selected.");
            return;
        }

        var perfumeNotes = [];

        perfumeNotesData.forEach(data => perfumeNotes.push(data["Note Name"]));
        perfumeNotes.sort();

        console.log(perfumeNotes);
        for (i = 0; i < baseNoteCount; i++) {
            var baseNotesID = "middleNote" + i;
            var baseNotesDropDown = baseNoteSel.append("select")
                .attr('id', baseNotesID);
            perfumeNotes.forEach(item => {
                baseNotesDropDown.append("option").text(item).attr("value",item);
            });
        }
    }).catch(function (error) {
        console.log(error);
    });

}

