var addModal = document.getElementById("addModal")
var addBtn = document.getElementById("addBtn")
var deleteBtn = document.getElementById("delBtn")
var modBtn = document.getElementById("modBtn")
var modAction = document.getElementById("modForm")
$("table th").addClass("headerSortUp");

// Closes the modal when the page is clicked
window.onclick = function() {
    if (event.target == addModal) {
        this.addModal.style.display = "none"
    }
    if (event.target == delModal) {
        this.delModal.style.display = "none"
    }
    if (event.target == modModal) {
        this.modModal.style.display = "none"
    }
}

// Add Tokimon modal
addBtn.onclick = function() {
    addModal.style.display = "block"
}

// Delete Tokimon modal
deleteBtn.onclick = function() {
    delModal.style.display = "block"
}

// Modify Tokimon modal
modBtn.onclick = function() {
    modModal.style.display = "block"
}

// Change the action of the modify Tokimon form
modAction.modName.onchange = function() {
    modAction.action = "modify/" + this.value
}

// Sorts the table by column (n)
function sort(n) {
    var table = document.getElementById("database")
    var rows = table.rows
    var direction = ""
    var curr_direction = rows[0].getElementsByTagName("th")[n].getAttribute("value")

    if (curr_direction == "" || curr_direction == "descending") {
        direction = "ascending"
    }
    else {
        direction = "descending"
    }
    rows[0].getElementsByTagName("th")[n].setAttribute("value", direction)
    for (i = 0; i < rows[0].getElementsByTagName("th").length; i++) {
        if (i != n) {
            rows[0].getElementsByTagName("th")[i].setAttribute("value", "")
        }
    }

    for (i = 1; i < (rows.length - 1); i++) {
        var row1 = rows[i].getElementsByTagName("td")[n]
        var row1_val = row1.innerHTML
        var opt_val = row1_val

        var toSwap_idx = i

        for (j = i + 1; j < (rows.length); j++) {
            var row2 = rows[j].getElementsByTagName("td")[n]
            var row2_val = row2.innerHTML

            if (direction == "ascending") {
                if (n != 0 && n != 10 && n != 11) {
                    if (parseInt(opt_val) > parseInt(row2_val)) {
                        opt_val = row2_val
                        toSwap_idx = j
                    }
                }
                else {
                    if (opt_val.toLowerCase() > row2_val.toLowerCase()) {
                        opt_val = row2_val
                        toSwap_idx = j
                    }
                }
            }
            else {
                if (n != 0 && n != 10 && n != 11) {
                    if (parseInt(opt_val) < parseInt(row2_val)) {
                        opt_val = row2_val
                        toSwap_idx = j
                    }
                }
                else {
                    if (opt_val.toLowerCase() < row2_val.toLowerCase()) {
                        opt_val = row2_val
                        toSwap_idx = j
                    }
                }
            }
        }
        rows[i].parentNode.insertBefore(rows[toSwap_idx], rows[i])
    }
}

// Validates add form
function validate() {
    var form = document.forms["addForm"]
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    if (form["name"].value.length == 0 || form["weight"].value.length == 0 ||
        form["height"].value.length == 0 || form["fly"].value.length == 0 ||
        form["fight"].value.length == 0 || form["fire"].value.length == 0 ||
        form["electric"].value.length == 0 || form["water"].value.length == 0 ||
        form["ice"].value.length == 0 || form["trainer"].value.length == 0 || 
        form["friendship"].value.length == 0 || form["experience"].value.length == 0) {
        alert("All fields must be filled")
        return false
    }
    else if (/\d/.test(form["name"].value) || /\d/.test(form["trainer"].value)) {
        alert("Names shouldn't contain any numbers!")
        return false
    }
    else if (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form["name"].value) || 
             /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form["trainer"].value)) {
        alert("Names have to be alphanumeric")
        return false
    }
    else if (parseInt(form['weight'].value) <= 0 || parseInt(form['height']) <= 0) {
        alert("Weight and height should be greater than 0")
        return false
    }
    else if (parseInt(form['fly'].value) < 0 || parseInt(form['fight'].value) < 0 ||
             parseInt(form['fire'].value) < 0 || parseInt(form['water'].value) < 0 ||
             parseInt(form['electric'].value) < 0 || parseInt(form['ice'].value) < 0 ||
             parseInt(form['friendship'].value) < 0 || parseInt(form['experience'].value) < 0) {
        alert("All attributes should be positive numbers")
        return false
    }
    else {
        return true
    }
}
