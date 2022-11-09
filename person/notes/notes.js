const page = location.href;
var id = parseInt(page.substring(page.indexOf("?")+4));
const noteDiv = document.getElementById('noteDiv');
const note = document.createElement('p');
const noteCont = document.createTextNode('Note for ' + id);
const noteIn = document.createElement('input');
noteIn.setAttribute('placeholder', 'Put your note here!');
note.appendChild(noteCont);
noteDiv.appendChild(note)
noteDiv.appendChild(noteIn);
const input = document.querySelector("input");
input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (confirm('Are you sure? This will overwrite the current message') == true) {
        note.innerText = '';
        noteContNew = document.createTextNode(input.value);
        note.appendChild(noteContNew)
        input.value = '';
    } else {
        alert('Aborted!');
    }}
  });