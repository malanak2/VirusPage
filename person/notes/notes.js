const page = location.href;
const searchParams = new URLSearchParams(window.location.search);
var id = parseInt(searchParams.get('id'));
const noteIn = document.createElement('span');

if (id !== null && id.length !== 0 && !isNaN(id)) {
    const noteDiv = document.getElementById('noteDiv');
    noteIn.setAttribute('contenteditable', 'true');
    noteIn.appendChild(document.createTextNode('Note for person ' + id + '!'));
    noteIn.setAttribute('class', 'noteIn')
    noteDiv.appendChild(noteIn);
    document.title = 'Person ' + id;
} else {
    const NOID = document.createElement('p');
    NOID.appendChild(document.createTextNode('No Id was supplied or it is string, please either contact the page admin, if you believe this is error, or access this page from the admin panel!'));
    const mainDiv = document.getElementById('allBox');
    mainDiv.innerHTML = '';
    mainDiv.appendChild(NOID)
    mainDiv.setAttribute('style', 'background-color: red !important;')
    document.title = 'Error!';
}

function rewriteNote(isConf) {
    const btn = document.getElementById('btnConf')
    if (isConf) {
        const txt = noteIn.innerHTML;
        const refTxt = txt.replace(/<br>/g, ' \n ');
        const finTxt = refTxt.replace(/{id}/g, id);
        console.log('Does backend stuff with note \"' + finTxt + '\"')
        btn.setAttribute('onclick', 'rewriteNote(false)')
        btn.setAttribute('class', 'confirmedBtn')
        btn.innerText = 'Done';
        setTimeout(() => {btn.setAttribute('class', 'confBtn');btn.innerText = 'Confirm';}, '1500');
    } else {
        btn.setAttribute('onclick', 'rewriteNote(true)')
        btn.setAttribute('class', 'btnConf')
        btn.innerText = 'Are you sure?';
    }}

function retToMain() {
    window.location.href = location.origin;
}