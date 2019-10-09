// This function dynamically updates the "Percent" field in the table
// If an invalid calculation is performed, "N/A" is shown 
function updatePercentage(cell) {
    var input_cell = (cell).closest('tr').cells[3];
    var numerator = input_cell.children[0].value
    var denominator = input_cell.children[1].value
    var percent = (numerator / denominator) * 100

    // Update "Percent" with grade percentage
    var percent_cell = (cell).closest('tr').cells[4]
    if (numerator.length == 0 && denominator.length == 0) {
        percent_cell.innerHTML = ""
    }
    else if (numerator.length == 0 || denominator.length == 0 || denominator == 0) {
        percent_cell.innerHTML = "N/A"
    }
    else {
        percent_cell.innerHTML = percent.toFixed(2) + "%"
    }
}

// This function computes the mean of all grades
function mean() {
    var sum = 0
    var numGrades = 0
    var table = document.getElementById("calculator_table")
    var result = document.getElementById("result")
    for (var i = 1, row; row = table.rows[i]; i++) {
        var inputs = row.cells[3]
        var numerator = inputs.children[0].value
        var denominator = inputs.children[1].value
        // Grades cannot be negative
        if (numerator < 0 || denominator < 0) {
            window.alert("Grades should only be positive")
            return
        }
        // Check if input fields are empty
        if (numerator.length != 0 && denominator.length != 0) {
            sum += (numerator / denominator)
            numGrades++
        }
    }
    // If no grades have been entered
    if (numGrades == 0) {
        result.innerHTML = ""
    }
    else {
        result.innerHTML = "Mean of grades: " + (sum / numGrades).toFixed(2)
    }
}

// This function computes the weighted mean of all grades
function weighted() {
    var total = 0 
    var totalWeights = 0
    var table = document.getElementById("calculator_table")
    var result = document.getElementById("result")
    for (var i = 1, row; row = table.rows[i]; i++) {
        var weight = row.cells[2].children[0].value
        var inputs = row.cells[3]
        var numerator = inputs.children[0].value
        var denominator = inputs.children[1].value

        // Check if weight field is empty
        if (weight.length != 0) {
            // Weights cannot be negative
            if (weight < 0) {
                window.alert("Weights should only be positive")
                return
            }
            // Grades cannot be negative
            if (numerator < 0 || denominator < 0) {
                window.alert("Grades should only be positive")
                return
            }
            // Check if input fields are empty
            if (numerator.length != 0 && denominator.length != 0) {
                total += ((numerator / denominator) * weight)
                totalWeights += parseInt(weight)
            }
        }
    }

    // If no grades have been entered
    if (totalWeights == 0) {
        result.innerHTML = ""
    }
    else {
        result.innerHTML = "Weighted grades: " + (total / totalWeights).toFixed(3)
        if (!document.getElementById("final_grade")) {
            additionalGrade()
        }
    }
    return total / totalWeights
}

// This function adds rows (activities) to the table
function addRow() {
    var table = document.getElementById("calculator_table")
    var newRow = table.insertRow(-1)
    var name = newRow.insertCell(0)
    var shortName = newRow.insertCell(1)
    var weight = newRow.insertCell(2)
    var grade = newRow.insertCell(3)
    var percent = newRow.insertCell(4)
    percent.setAttribute("class", "percent")
    var rowCount = table.rows.length

    name.innerHTML = "Activity " + (rowCount - 1)
    shortName.innerHTML = "A" + (rowCount - 1)
    
    var weight_inputBox = document.createElement("input")
    weight_inputBox.setAttribute("type", "number")
    weight.appendChild(weight_inputBox)

    var numerator_inputBox = document.createElement("input")
    var denominator_inputBox = document.createElement("input")
    numerator_inputBox.setAttribute("type", "number")
    numerator_inputBox.setAttribute("onkeyup", "updatePercentage(this)")
    denominator_inputBox.setAttribute("type", "number")
    denominator_inputBox.setAttribute("onkeyup", "updatePercentage(this)")
    grade.appendChild(numerator_inputBox)
    grade.appendChild(document.createTextNode("/"))
    grade.appendChild(denominator_inputBox)
}

// This function adds the ability to calculate additional grade needed to reach x%
function additionalGrade() {
    var div = document.getElementById("calculator_content")
    var gradeInputBox = document.createElement("input")
    gradeInputBox.setAttribute("type", "number")
    gradeInputBox.setAttribute("min", "1")
    gradeInputBox.setAttribute("max", "100")
    gradeInputBox.setAttribute("id", "final_grade")
    gradeInputBox.setAttribute("style", "width: 23px; height: 5px;")

    var weightInputBox = document.createElement("input")
    weightInputBox.setAttribute("type", "number")
    weightInputBox.setAttribute("min", "1")
    weightInputBox.setAttribute("max", "100")
    weightInputBox.setAttribute("id", "final_exam_weight")
    weightInputBox.setAttribute("style", "width: 23px; height: 5px;")

    div.appendChild(document.createTextNode("Minimum grade on "))
    div.appendChild(weightInputBox)
    div.appendChild(document.createTextNode("% "))
    div.appendChild(document.createTextNode("weighted final to achieve a final grade of "))
    div.appendChild(gradeInputBox)
    div.appendChild(document.createTextNode("%"))
    div.appendChild(document.createElement("p"))

    var calculateButton = document.createElement("input")
    calculateButton.setAttribute("type", "button")
    calculateButton.setAttribute("value", "CALCULATE")
    calculateButton.setAttribute("id", "additional_grade_button")
    calculateButton.setAttribute("onclick", "additionalGradeCalc()")
    div.appendChild(calculateButton)
}

// This function calculates the additional grade needed
function additionalGradeCalc() {
    var div = document.getElementById("calculator_content")
    var finalGrade = document.getElementById("final_grade").value / 100
    var finalWeight = document.getElementById("final_exam_weight").value / 100
    var currentGrade = weighted()

    // Final grade and weight should be positive
    if (finalWeight < 0 || finalGrade < 0) {
        window.alert("The final weight and grade should be positive")
        return
    }

    var examGrade = (finalGrade - (1 - finalWeight) * currentGrade) / finalWeight
    if (!document.getElementById("final_exam_grade")) {
        var result = document.createElement("h3")
        result.setAttribute("id", "final_exam_grade")
        result.innerHTML = "You need " + (examGrade * 100).toFixed(0) + "% on the final exam" 
        div.appendChild(document.createElement("p"))
        div.appendChild(result)
    }
    else {
        var result = document.getElementById("final_exam_grade")
        result.innerHTML = "You need " + (examGrade * 100).toFixed(0) + "% on the final exam"
    }
}