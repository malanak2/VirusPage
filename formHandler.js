const form = document.getElementById("devForm");
const tabContent = document.getElementById("tabContent");
var curDiv = 100;
const page = location.href;
  // Add 'submit' event handler
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const FData = new FormData(form);
    curDiv += 1;
    const newDiv = document.createElement("div");
    const newIdDiv = document.createElement("div");
    const newInfFromDiv = document.createElement("div");
    const newNotesDiv = document.createElement("div");
    const newUserNameDiv = document.createElement("div");
    const newActionBtn = document.createElement("button");
    const newStatusDiv = document.createElement("div");
    newDiv.setAttribute('id', 'hackList')
    newIdDiv.setAttribute('id', "ID" + curDiv);
    newIdDiv.setAttribute('class', 'speDiv');
    newInfFromDiv.setAttribute('id', "infFrom" + curDiv);
    newInfFromDiv.setAttribute('class', 'speDiv');
    newNotesDiv.setAttribute('id', 'notes' + curDiv);
    newNotesDiv.setAttribute('class', 'speDiv');
    newUserNameDiv.setAttribute('id', 'userName' + curDiv);
    newUserNameDiv.setAttribute('class', 'speDiv');
    newActionBtn.setAttribute('id', 'actButton');
    newActionBtn.setAttribute('class', 'actButton');
    newActionBtn.setAttribute('onclick', 'bringUp(' + curDiv + ");");
    newActionBtn.appendChild(document.createTextNode('Otevřít'));
    if (FData.get('status') == 'Deactivated') {
        newActionBtn.disabled = true;
        newStatusDiv.setAttribute('class', 'notActive');
    } else {
        newStatusDiv.setAttribute('class', 'Active');
    }
    newStatusDiv.setAttribute('id', 'status' + curDiv);
    newDiv.appendChild(newIdDiv);
    newDiv.appendChild(newInfFromDiv);
    newDiv.appendChild(newNotesDiv);
    newDiv.appendChild(newUserNameDiv);
    newDiv.appendChild(newActionBtn);
    newDiv.appendChild(newStatusDiv);
    tabContent.appendChild(newDiv);
    console.log("Done");
    addType(newId("ID", curDiv),"p" , "id", FData);
    addType(newId("infFrom", curDiv), "p", "infFrom", FData);
    addType(newId("notes", curDiv), "p", "notes", FData);
    addType(newId("userName", curDiv), "p", "username", FData);
    addType(newId("status", curDiv), "p", "status", FData);
})

function addType(id, typeToAdd, formId, FData,) {
    const newOne = document.createElement(typeToAdd);
    const now = document.getElementById(String(id));
    newOne.appendChild(document.createTextNode(FData.get(formId)));
    now.appendChild(newOne);
}

function newId(og, curDiv) {
    newOne = og + curDiv
    return newOne
}

function bringUp(id) {
    window.location.replace(page + "person/person.html?id=" + id);
}