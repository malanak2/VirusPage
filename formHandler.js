const form = document.getElementById("devForm");
const tabContent = document.getElementById("tabContent");
var curDiv = 0;
  // Add 'submit' event handler
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newDiv = document.createElement("div");
    const newIdDiv = document.createElement("div");
    const newInfFromDiv = document.createElement("div");
    const newNotesDiv = document.createElement("div");
    const newUserNameDiv = document.createElement("div");
    const newStatusDiv = document.createElement("div");
    newIdDiv.setAttribute('id', newId('ID', curDiv));
    newInfFromDiv.setAttribute('id', newId('infFrom', curDiv));
    newNotesDiv.setAttribute('id', newId('notes', curDiv));
    newUserNameDiv.setAttribute('id', newId('userName', curDiv));
    newStatusDiv.setAttribute('id', newId('status', curDiv));
    newDiv.appendChild(newIdDiv);
    newDiv.appendChild(newInfFromDiv);
    newDiv.appendChild(newNotesDiv);
    newDiv.appendChild(newUserNameDiv);
    newDiv.appendChild(newStatusDiv);
    curDiv += 1;
    tabContent.appendChild(newDiv);
    console.log("Done");
    const FData = new FormData(form);
    addType(newId("ID", curDiv),"p" , "id", FData);
    addType(newId("infFrom", curDiv), "p", "infFrom", FData)
    addType(newId("notes", curDiv), "p", "notes", FData)
    addType(newId("userName", curDiv), "p", "userName", FData)
    addType(newId("status", curDiv), "p", "status", FData)
})

function addType(id, typeToAdd, formId, FData) {
    const newOne = document.createElement(typeToAdd);
    const now = document.getElementById(id);
    newOne.appendChild(document.createTextNode(FData.get(formId)))
    now.appendChild(newOne);
}

function newId(og, curDiv) {
    newOne = toString(og) + toString(curDiv)
    return toString(newOne)
}