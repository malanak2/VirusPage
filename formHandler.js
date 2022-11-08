const form = document.getElementById("devForm");
const tabContent = document.getElementById("tabContent");
var curId = 100;
const page = location.protocol;
  // Add 'submit' event handler
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const FData = new FormData(form);
    curId += 1;
    const newDiv = document.createElement("div");
    const newIdDiv = document.createElement("div");
    const newInfFromDiv = document.createElement("div");
    const newNotesDiv = document.createElement("div");
    const newUserNameDiv = document.createElement("div");
    const newActionBtn = document.createElement("button");
    const newStatusDiv = document.createElement("div");
    newDiv.setAttribute('id', 'hackList')
    newIdDiv.setAttribute('id', "ID" + curId);
    newIdDiv.setAttribute('class', 'speDiv');
    newInfFromDiv.setAttribute('id', "infFrom" + curId);
    newInfFromDiv.setAttribute('class', 'speDiv');
    newNotesDiv.setAttribute('id', 'notes' + curId);
    newNotesDiv.setAttribute('class', 'speDiv');
    newUserNameDiv.setAttribute('id', 'userName' + curId);
    newUserNameDiv.setAttribute('class', 'speDiv');
    newActionBtn.setAttribute('id', 'actButton');
    newActionBtn.setAttribute('class', 'actButton');
    newActionBtn.setAttribute('onclick', 'bringUp(' + curId + ");");
    newActionBtn.appendChild(document.createTextNode('Otevřít'));
    if (FData.get('status') == 'Not Active') {
        newActionBtn.disabled = true;
        newStatusDiv.setAttribute('class', 'notActive');
    } else {
        newStatusDiv.setAttribute('class', 'Active');
    }
    newStatusDiv.setAttribute('id', 'status' + curId);
    newDiv.appendChild(newIdDiv);
    newDiv.appendChild(newInfFromDiv);
    newDiv.appendChild(newNotesDiv);
    newDiv.appendChild(newUserNameDiv);
    newDiv.appendChild(newActionBtn);
    newDiv.appendChild(newStatusDiv);
    tabContent.appendChild(newDiv);
    console.log("Done");
    addId(newId('ID', curId), 'p', curId)
    addType(newId("infFrom", curId), "p", "infFrom", FData);
    addType(newId("notes", curId), "p", "notes", FData);
    addType(newId("userName", curId), "p", "username", FData);
    addType(newId("status", curId), "p", "status", FData);
})

function addType(id, typeToAdd, formId, FData) {
    const newOne = document.createElement(typeToAdd);
    const now = document.getElementById(String(id));
    newOne.appendChild(document.createTextNode(FData.get(formId)));
    now.appendChild(newOne);
}

function addId(id, typeToAdd, curId) {
    const newOne = document.createElement(typeToAdd);
    const now = document.getElementById(String(id));
    newOne.appendChild(document.createTextNode(curId));
    now.appendChild(newOne);
}

function newId(og, curId) {
    newOne = og + curId
    return newOne
}

function bringUp(id) {
    window.location.href = page + "person/person.html?id=" + id;
}