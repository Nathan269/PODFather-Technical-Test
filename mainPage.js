// When user uploads file
$( ".upload-csv" ).submit(function( event ) {
    const fileInput = document.getElementById('csvFile');
    event.preventDefault();
    // If user did not upload a file
    if(fileInput.files.length == 0 ){
        alert("No file selected");
        console.log("No file selected");
    }
    else {
        const reader = new FileReader()

        var html = "";
        reader.onload = () => {
            const lines = reader.result.split('\n')
            // Headers of the csv file
            var headers = lines[0].split(",");

            html = html + '<table id="display-table" class="sortable display-table table table-striped">'
            html = html + "<thead><tr>";
            // For each header
            for(var x = 0; x < headers.length; x++){
                // Adds the CSV headers to the table
                html = html + '<th>' + headers[x] + '</th>';
            }

            html = html + "</tr></thead><tbody>"
            // Loops through each row from the CSV file
            for (var i = 1; i < lines.length; i++) {
                if (!lines[i]) {
                    console.log("Empty line in CSV found.");
                    continue;
                }
                const currentline = lines[i].split(',');

                html = html + '<tr class = "item bg-light">';
                // Loops through each entity in current row
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                    html = html + '<td class = "'+headers[j]+'">' + currentline[j] + '</td>';
                }

                html = html + '</tr>';

                // Adds row to JSON
                result.push(obj);
            }
            html = html + "</tbody></table>"
            $("#table-box").append(html);
        }
        // Reads through file uploaded by user
        reader.readAsBinaryString(fileInput.files[0]);
    }
});


// Used to filter table by search
function searchTable() {
    // User input
    var input = document.getElementById("searchTable");
    // Remove if search wants to be case sensitive
    var filter = input.value.toUpperCase();

    var table = document.getElementById("display-table");
    var row = table.getElementsByTagName("tr");
    // Loops through each row
    for (var i = 0; i < row.length; i++) {
        // Gets the first column in the row
        var td = row[i].getElementsByTagName("td")[0];
        if (td) {
            var txtValue = td.textContent || td.innerText;
            // If the column is equal to the user input
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                // Display row
                row[i].style.display = "";
            } else {
                // Don't display row
                row[i].style.display = "none";
            }
        }
    }
}