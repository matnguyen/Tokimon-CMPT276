var homeBtn = document.getElementById("homeBtn")

homeBtn.onclick = function() {
    window.location.href = '/'
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

    var query = `UPDATE Tokimon SET name='${name}', weight=${weight}, height=${height}, fly=${fly}, fight=${fight}, fire=${fire}, water=${water}, electric=${electric}, ice=${ice}, total=${total}, trainer='${trainer}', gender='${gender}', friendship=${friendship}, experience=${exp} WHERE name='${name}'`
    tmpTextArea.innerHTML = query
}