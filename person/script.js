    const page = location.href;
    const searchParams = new URLSearchParams(window.location.search);
    const dv = document.getElementById('console');
    const dvInp = document.getElementById('consInp');
    const inp = document.createElement('input');
    id = searchParams.get('id');
    if (id !== null && id.length !== 0 && !isNaN(id)) {
        inp.setAttribute('type', 'text')
        inp.setAttribute('id', 'cmdInput')
        inp.setAttribute('class', 'cmInput')
        inp.setAttribute('placeholder', 'Input commands here!')
        dv.setAttribute('style', 'width:' + window.innerWidth + ';' + 'height:' + window.innerHeight + ';');
        dvInp.appendChild(inp);
        document.title = "Person " + id;
    } else {    
        const NOID = document.createElement('p')
        NOID.appendChild(document.createTextNode('No Id was supplied, please either contact the page admin, if you believe this is error, or access this page from the admin panel!'))
        const mainDiv = document.getElementById('allBox');
        mainDiv.innerHTML = '';
        mainDiv.appendChild(NOID)
        mainDiv.setAttribute('style', 'background-color: red !important;')
        document.title = 'Error!';
    }
    const input = document.querySelector("input");
    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            console.log('Added command ' + input.value)
            var command = document.createElement('p')
            command.setAttribute('class', 'consoleP')
            if (input.value.toLowerCase() == 'id') {
                var cmdText = document.createTextNode(id)
                command.appendChild(cmdText)
                dv.appendChild(command)
            } else if (input.value != '') {
                var cmdText = document.createTextNode(input.value)
                command.appendChild(cmdText)
                dv.appendChild(command)
            }
            input.value = '';
        }
    });