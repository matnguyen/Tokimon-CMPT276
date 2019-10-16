var homeBtn = document.getElementById("homeBtn")

homeBtn.onclick = function() {
    window.location.href = '/'
}

// Validates modification form
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
             parseInt(form['friendship'].value) < 0 || parseInt(form['experience'].value) <= 0) {
        alert("All attributes should be positive numbers")
        return false
    }
    else {
        return true
    }
}

// Get the contents of the editable table to update Tokimon
function getContent() {
    var tmpTextArea = document.getElementById("tmpTextArea")
    var name = document.getElementById("modName").innerHTML
    var weight = document.getElementById("modWeight").innerHTML
    var height = document.getElementById("modHeight").innerHTML
    var fly = document.getElementById("modFly").innerHTML
    var fight = document.getElementById("modFight").innerHTML
    var fire = document.getElementById("modFire").innerHTML
    var water = document.getElementById("modWater").innerHTML
    var electric = document.getElementById("modElectric").innerHTML
    var ice = document.getElementById("modIce").innerHTML
    var total = parseInt(fly) + parseInt(fight) + parseInt(fire) + parseInt(water) + 
                parseInt(electric) + parseInt(ice)
    var trainer = document.getElementById("modTrainer").innerHTML
    var gender = document.getElementById("modGender").innerHTML
    var friendship = document.getElementById("modFriendship").innerHTML
    var exp = document.getElementById("modExp").innerHTML

    // Validates modification form
    if (/\d/.test(name) || /\d/.test(trainer)) {
        alert("Names shouldn't contain any numbers!")
        return false
    }
    else if (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(name) || 
             /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trainer)) {
        alert("Names have to be alphanumeric")
        return false
    }
    else if (parseInt(weight) <= 0 || parseInt(height) <= 0) {
        alert("Weight and height should be greater than 0")
        return false
    }
    else if (parseInt(fly) < 0 || parseInt(fight) < 0 ||
             parseInt(fire) < 0 || parseInt(water) < 0 ||
             parseInt(electric) < 0 || parseInt(ice) < 0 ||
             parseInt(friendship) < 0 || parseInt(exp) < 0) {
        alert("All attributes should be positive numbers")
        return false
    }
    else if (gender != "M" && gender != "F") {
        alert("Gender should only be M or F")
        return false
    }
    else {
        var query = `UPDATE Tokimon SET name='${name}', weight=${weight}, height=${height}, fly=${fly}, fight=${fight}, fire=${fire}, water=${water}, electric=${electric}, ice=${ice}, total=${total}, trainer='${trainer}', gender='${gender}', friendship=${friendship}, experience=${exp} WHERE name='${name}'`
        tmpTextArea.innerHTML = query
        return true
    }
}

