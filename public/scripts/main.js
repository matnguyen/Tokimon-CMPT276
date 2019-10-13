var addModal = document.getElementById("addModal")
var addBtn = document.getElementById("addBtn")
var addSubmit = document.getElementById("addSubmit")

addBtn.onclick = function() {
    addModal.style.display = "block"
}

window.onclick = function() {
    if (event.target == addModal) {
        this.addModal.style.display = "none"
    }
}
