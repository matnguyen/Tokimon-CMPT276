var addModal = document.getElementById("addModal")
var addBtn = document.getElementById("addBtn")
var deleteBtn = document.getElementById("delBtn")
var modBtn = document.getElementById("modBtn")
var modAction = document.getElementById("modForm")

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
