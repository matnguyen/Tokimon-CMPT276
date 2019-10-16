var homeBtn = document.getElementById("homeBtn")

homeBtn.onclick = function() {
    window.location.href = '/'
}

// Drawing rectangles for each Tokimon
var canvas = document.getElementById("figures");
var curr = document.getElementById("name").innerHTML
var ctx = canvas.getContext("2d")
var max_height = 0
var max_weight = 0
var table = document.getElementById("allData")
var rows = table.rows

canvas.width = window.innerWidth / 1.2;
canvas.height = window.innerHeight / 2;
var width = canvas.width;
var height = canvas.height;

// Determine max weight and height
for (var i = 0; i < rows.length; i++) {
    if (parseInt(rows[i].getElementsByTagName("td")[1].innerHTML) > max_weight) {
        max_weight = parseInt(rows[i].getElementsByTagName("td")[1].innerHTML)
    }
    if (parseInt(rows[i].getElementsByTagName("td")[2].innerHTML) > max_height) {
        max_height = parseInt(rows[i].getElementsByTagName("td")[2].innerHTML)
    }
}

var x = 10
// Draw rectangles
for (var i = 0; i < rows.length; i++) {
    var curr_name = rows[i].getElementsByTagName("td")[0].innerHTML
    var curr_weight = parseInt(rows[i].getElementsByTagName("td")[1].innerHTML)
    var curr_height = parseInt(rows[i].getElementsByTagName("td")[2].innerHTML)
    var y = (height * (1 - (parseInt(curr_height) / parseInt(max_height)))) + 10
    var rect_height = height - y
    var rect_width = ((width - 120) * (parseInt(curr_weight) / parseInt(max_weight)))
    console.log(rect_width, width)
    ctx.beginPath()
    ctx.rect(x, y, rect_width, rect_height)
    ctx.font="12px Georgia";
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.fillText(curr_name, x, y)
    ctx.stroke()
    x  = (x + rect_width) + 10
}