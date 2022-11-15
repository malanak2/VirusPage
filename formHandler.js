const form = document.getElementById("devForm");
const tabContent = document.getElementById("tabContent");
const page = location.protocol;
let idUsed = [];
  // Add 'submit' event handler
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const FData = new FormData(form);
    let curId = FData.get('id');
    if (!idUsed.includes(curId)) {
        idUsed.push(curId);
        console.log(idUsed, curId)
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
        newActionBtn.setAttribute('class', 'actButton speDiv');
        newActionBtn.setAttribute('onclick', 'bringUp(' + curId + ");");
        newActionBtn.appendChild(document.createTextNode('Otevřít'));
        if (FData.get('status') == 'Not Active') {
            newActionBtn.disabled = true;
            newStatusDiv.setAttribute('class', 'notActive speDiv');
        } else {
            newStatusDiv.setAttribute('class', 'Active speDiv');
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
        addType(newId('ID', curId), 'p', 'id', FData)
        addType(newId("infFrom", curId), "p", "infFrom", FData);
        addNotes(newId("notes", curId), curId);
        addType(newId("userName", curId), "p", "username", FData);
        addType(newId("status", curId), "p", "status", FData);
    } else {
        alert('Id ' + curId + " is already in use!")
    }
})

function addType(id, typeToAdd, formId, FData) {
    const newOne = document.createElement(typeToAdd);
    const now = document.getElementById(String(id));
    newOne.appendChild(document.createTextNode(FData.get(formId)));
    now.appendChild(newOne);
}

function addNotes(id, curId) {
    const newOne = document.createElement('button');
    newOne.setAttribute('onClick', 'window.open(\'/person/notes/?id=' + curId + '\')');
    newOne.setAttribute('class', 'noteAttr');
    newOne.appendChild(document.createTextNode('Open notes'))
    const now = document.getElementById(id)
    now.appendChild(newOne);
}

function newId(og, curId) {
    newOne = og + curId
    return newOne
}

function bringUp(id) {
    window.location.href = page + "person/person?id=" + id;
}