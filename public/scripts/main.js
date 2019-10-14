var addModal = document.getElementById("addModal")
var addBtn = document.getElementById("addBtn")
var deleteBtn = document.getElementById("delBtn")
var addSubmit = document.getElementById("addSubmit")

addBtn.onclick = function() {
    addModal.style.display = "block"
}

window.onclick = function() {
    if (event.target == addModal) {
        this.addModal.style.display = "none"
    }
    if (event.target == delModal) {
        this.delModal.style.display = "none"
    }
}

deleteBtn.onclick = function() {
    delModal.style.display = "block"
}
