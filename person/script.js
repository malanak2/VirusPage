const page = location.href;

const inp = document.createElement('input');
inp.setAttribute('type', 'text')
inp.setAttribute('id', 'cmdInput')
inp.setAttribute('class', 'cmInput')
inp.setAttribute('placeholder', 'Input commands here!')
const dv = document.getElementById('console');
dv.setAttribute('style', 'width:' + window.innerWidth + ';' + 'height:' + window.innerHeight + ';');
const dvInp = document.getElementById('consInp');
dvInp.appendChild(inp);
// Also possible : location.search
var id = parseInt(page.substring(page.indexOf("?")+4));
var a = parseInt(page.substring(page.indexOf("?")+10));
times = 1;
document.title = "Person " + id;

const input = document.querySelector("input");
input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        console.log('Added command ' + input.value)
        var command = document.createElement('p')
        command.setAttribute('class', 'consoleP')
        if (input.value == 'id') {
            var cmdText = document.createTextNode(id)
            command.appendChild(cmdText)
            dv.appendChild(command)
            times += 1;
        } else if (input.value != '') {
            var cmdText = document.createTextNode(input.value)
            command.appendChild(cmdText)
            dv.appendChild(command)
            times += 1;
        }
        input.value = '';
    }
  });