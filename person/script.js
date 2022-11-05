const page = location.href;

// From here it is from StackOverflow, for better resolution canvas
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

// Still from stack overwolf
createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

//Create canvas with the device resolution.
var canv = createHiDPICanvas(500, 250);
// To here from stack overflow

const inp = document.createElement('input');
inp.setAttribute('type', 'text')
inp.setAttribute('id', 'cmdInput')
inp.setAttribute('class', 'cmInput')
inp.setAttribute('placeholder', 'Input commands here!')
const dv = document.getElementById('Canv');
canv.setAttribute('class', 'canv')
dv.appendChild(canv)
dv.appendChild(inp)
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
        var cmdText = document.createTextNode(input.value)
        command.appendChild(cmdText)
        command.setAttribute('class', 'consoleP')
        var ctx = canv.getContext("2d");
        ctx.font = "30px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText(input.value, 10, 30 * times);
        times += 1;
        input.value = '';
    }
  });