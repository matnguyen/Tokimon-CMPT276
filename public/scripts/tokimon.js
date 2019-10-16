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
var total_height = 0
var total_weight = 0
var table = document.getElementById("allData")
var rows = table.rows

canvas.width = window.innerWidth / 1.2;
canvas.height = window.innerHeight / 2;
var width = canvas.width;
var height = canvas.height;

// Determine max weight and height
for (var i = 0; i < rows.length; i++) {
    total_weight += parseInt(rows[i].getElementsByTagName("td")[1].innerHTML)
    total_height += parseInt(rows[i].getElementsByTagName("td")[2].innerHTML)
    if (parseInt(rows[i].getElementsByTagName("td")[1].innerHTML) > max_weight) {
        max_weight = parseInt(rows[i].getElementsByTagName("td")[1].innerHTML)
    }
    if (parseInt(rows[i].getElementsByTagName("td")[2].innerHTML) > max_height) {
        max_height = parseInt(rows[i].getElementsByTagName("td")[2].innerHTML)
    }
}

var x = 10
var horizontal_bin = width / total_weight
var vertical_bin = height / total_height
// Draw rectangles
for (var i = 0; i < rows.length; i++) {
    var curr_name = rows[i].getElementsByTagName("td")[0].innerHTML
    var curr_weight = parseInt(rows[i].getElementsByTagName("td")[1].innerHTML)
    var curr_height = parseInt(rows[i].getElementsByTagName("td")[2].innerHTML)
    var y = (vertical_bin * (max_height - curr_height)) + 20
    var rect_height = height - y
    var rect_width = (horizontal_bin * curr_weight) - 15
    ctx.beginPath()
    if (curr_name == curr) {
        console.log(curr_name)
        ctx.fillStyle = "#ccf9fc"
        ctx.fillRect(x, y, rect_width, rect_height)
        ctx.fillStyle = "#000000"
        ctx.rect(x - 1, y - 1, rect_width + 2, rect_height + 1)
        ctx.font="20px Georgia";
        ctx.textAlign="center"; 
        ctx.textBaseline = "middle";
        ctx.fillText(curr_name, (x + (rect_width / 2)), (y + (rect_height / 2)))
        ctx.stroke()
        x  = (x + rect_width) + 10
    }
    else {
        console.log(curr_name)
        ctx.rect(x, y, rect_width, rect_height)
        ctx.font="20px Georgia";
        ctx.textAlign="center"; 
        ctx.textBaseline = "middle";
        ctx.fillText(curr_name, (x + (rect_width / 2)), (y + (rect_height / 2)))
        ctx.stroke()
        x  = (x + rect_width) + 10
    }
}