let table = document.getElementById("table");
let username = document.getElementById("username");
let batch = document.getElementById("batch");
let city = document.getElementById("city");
let addBtn = document.getElementById("add");
let deleteBtn = document.getElementById("deleteBtn");
let deletingName = document.getElementById("deleteName");
let editBtn = document.getElementById("editBtn");
let editName = document.getElementById("editingPersonName");
let efield = document.getElementById("editingDeatils");
let ename = document.getElementById("ename");
let ebatch = document.getElementById("ebatch");
let ecity = document.getElementById("ecity");
let UpdateDetails = document.getElementById("UpdateDetails");
let totalStudents = document.getElementById("student-count");

let find_By_batch_input = document.getElementById("findByIdInput");
let find_By_batch_button = document.getElementById("findByIdButton");
let get_all_users = document.getElementById("getAllUsers");
let user_not_found = document.getElementById("userNotFound");

//SHIFTING BLOCKS

let tableSection = document.getElementById("right-home");
let addSection = document.getElementById("add-student");
let updateSection = document.getElementById("update-student");
let deleteSection = document.getElementById("delete-student");

// SHIFTING BLOCKS ITEMS ON LEFT
let itemView = document.getElementById("l-view");
let itemAdd = document.getElementById("l-add");
let itemUpdate = document.getElementById("l-update");
let itemDelete = document.getElementById("l-delete");

itemView.classList.add("navBar-style");
tableSection.style.display = "flex";

itemView.addEventListener("click", () => {
    itemView.classList.add("navBar-style");
    itemAdd.classList.remove("navBar-style");
    itemUpdate.classList.remove("navBar-style");
    itemDelete.classList.remove("navBar-style");
    tableSection.style.display = "flex";
    addSection.style.display = "none";
    updateSection.style.display = "none";
    deleteSection.style.display = "none";
})
itemAdd.addEventListener("click", () => {
    itemView.classList.remove("navBar-style");
    itemAdd.classList.add("navBar-style");
    itemUpdate.classList.remove("navBar-style");
    itemDelete.classList.remove("navBar-style");
    tableSection.style.display = "none";
    addSection.style.display = "flex";
    updateSection.style.display = "none";
    deleteSection.style.display = "none";
})
itemUpdate.addEventListener("click", () => {
    itemView.classList.remove("navBar-style");
    itemAdd.classList.remove("navBar-style");
    itemDelete.classList.remove("navBar-style");
    itemUpdate.classList.add("navBar-style");
    tableSection.style.display = "none";
    addSection.style.display = "none";
    updateSection.style.display = "flex";
    deleteSection.style.display = "none";
})
itemDelete.addEventListener("click", () => {
    itemUpdate.classList.remove("navBar-style");
    itemAdd.classList.remove("navBar-style");
    itemView.classList.remove("navBar-style");
    itemDelete.classList.add("navBar-style");
    tableSection.style.display = "none";
    addSection.style.display = "none";
    updateSection.style.display = "none";
    deleteSection.style.display = "flex";
})

let details = JSON.parse(localStorage.getItem("details")) || [];

//DISPLAYING STUDENT COUNT
function updatingStudentCount() {
    totalStudents.textContent = details.length;

}
updatingStudentCount();

//HEADING OF TABLE FUNCTIONALITY
function addingHeading() {
    let heading = document.createElement("tr");
    heading.style.height="50px"
    let td1 = document.createElement("th");
    td1.textContent = "Name";
    td1.style.backgroundColor = "rgba(118, 110, 221,1)";
    td1.style.color = "white";
    heading.appendChild(td1);
    let td2 = document.createElement("th");
    td2.textContent = "batch";
    td2.style.backgroundColor = "rgba(118, 110, 221,1)";
    td2.style.color = "white";
    heading.appendChild(td2);
    let td3 = document.createElement("th");
    td3.textContent = "city";
    td3.style.backgroundColor = "rgba(118, 110, 221,1)";
    td3.style.color = "white";
    heading.appendChild(td3);
    table.appendChild(heading);
    
}
addingHeading();


// LOADING DATA AFTER REFRESH
for (let i of details) {
    addRow(i.username, i.batch, i.city);
}

//ADD OPTION FUNCTIONALITY
function addRow(username, batch, city) {
    let heading = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = username;
    heading.appendChild(td1);
    let td2 = document.createElement("td");
    td2.textContent = batch;
    heading.appendChild(td2);
    let td3 = document.createElement("td");
    td3.textContent = city;
    heading.appendChild(td3);
    table.appendChild(heading);
    return;
}

//ADD OPTION

addBtn.addEventListener("click", () => {
    if (username.value == "" || batch.value == "" || city.value == "") {
        alert("enter input fields");
        return;
    }
    for (let i of details) {
        if (i.username == username.value) {
            let conformation = confirm("User is already exist, still wanna Add?");
            if (!conformation) {
                username.value = "";
                batch.value = "";
                city.value = "";
                return;
            }
        }
    }
    addRow(username.value, batch.value, city.value);
    let student_detail = {
        username: username.value,
        batch: batch.value,
        city: city.value
    }
    details.push(student_detail)
    localStorage.setItem("details", JSON.stringify(details));
    updatingStudentCount();
    alert("Success fully added student");
    username.value = "";
    batch.value = "";
    city.value = "";
})

//DELETE OPTION

deleteBtn.addEventListener("click", () => {
    if (deletingName.value == "") {
        alert("Enter field to delete");
        return;
    }
    let index;
    for (let i = 0; i < details.length; i++) {
        if (details[i].username == deletingName.value) {
            index = i;
            break;
        }
    }

    if (index == undefined) {
        alert("User not found");
        deletingName.value = "";
    }
    else {
        details.splice(index, 1);
        table.textContent = "";
        localStorage.setItem("details", JSON.stringify(details));
        alert("Successfully deleted!!");
        updatingStudentCount();
        deletingName.value = "";
        addingHeading();
        for (let i of details) {
            addRow(i.username, i.batch, i.city);
        }

    }
})

// EDIT OPTION

editBtn.addEventListener("click", () => {
    if (editName.value == "") {
        alert("Eneter name to edit");
        return;
    }
    let booleanFound = false;
    for (let i of details) {
        if (i.username == editName.value) {
            booleanFound = true;
            efield.style.display = "block";
            ename.value = i.username;
            ebatch.value = i.batch;
            ecity.value = i.city;
            UpdateDetails.addEventListener("click", () => {
                if (ename.value == "" || ebatch.value == "" || ecity.value == "") {
                    alert("Invalid");
                    return;
                }

                ename = document.getElementById("ename");
                ebatch = document.getElementById("ebatch");
                ecity = document.getElementById("ecity");
                i.username = ename.value;
                i.batch = ebatch.value;
                i.city = ecity.value;
                ename.value = "";
                ebatch.value = "";
                ecity.value = "";
                deletingName.textContent = "";

                table.textContent = "";
                localStorage.setItem("details", JSON.stringify(details));
                deletingName.textContent = "";
                addingHeading();
                for (let i of details) {
                    addRow(i.username, i.batch, i.city);
                }
                editName.value = "";
                alert("Updated student details successfully!");
                efield.style.display = "none";
            })
            break;

        }
    }
    if (!booleanFound) {
        editName.value = "";
        alert("User not found!");
        return;
    }
})


//FINDING BY BATCH

find_By_batch_button.addEventListener("click",()=>{
    if(find_By_batch_input.value == ""){
        alert("Enter the valid input man!!");
        return;
    }
    table.textContent="";
    addingHeading();
    let temp = false;
    for(let i of details){
        if(i.batch.toLowerCase() == find_By_batch_input.value.toLowerCase()){
            addRow(i.username,i.batch,i.city);
            temp=true;
        }

    }
    if(!temp){
        table.textContent="";
        user_not_found.style.display="block";
        find_By_batch_input.value="";
    }

})

get_all_users.addEventListener("click",()=>{
    find_By_batch_input.value="";
    user_not_found.style.display="none";
    table.textContent="";
    addingHeading();
    
    for(let i of details){
        addRow(i.username,i.batch,i.city);
    }
})



