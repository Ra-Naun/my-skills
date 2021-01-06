const handle = document.querySelector(".handle");
const img = document.querySelector(".img");

const setSize = () => {
    handle.setAttribute(
        "style",
        `
    cursor: grab; 
    position: absolute; 
    background: rgba(0, 0, 0, 0); 
    top: 0; 
    left: 0; 
    width: ${img.clientWidth}px; 
    height: ${img.clientHeight}px;`
    );
};

const idInterval = setInterval(() => {
    if (img.clientHeight) {
        setSize();
        clearInterval(idInterval);
    }
}, 1000);

function getPosition(e) {
    var x = (y = 0);

    if (!e) {
        var e = window.event;
    }

    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else if (e.clientX || e.clientY) {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: x, y: y };
}

let deltaX = 0,
    deltaY = 0,
    prevX = 0,
    prevY = 0;
let isTimeOut = false;

const move = (e) => {
    if (!isTimeOut) {
        isTimeOut = true;
        setTimeout(() => {
            let pos = getPosition(e);
            if (e.which && e.which == 1) {
                deltaX = pos.x - prevX;
                deltaY = pos.y - prevY;
                window.scrollTo(window.scrollX - deltaX, window.scrollY - deltaY);
            }
            prevX = pos.x - deltaX;
            prevY = pos.y - deltaY;
            isTimeOut = false;
        }, 5);
    }
};

const grabbing = (e) => {
    console.log("getPosition", getPosition(e));
};

handle.addEventListener("mousemove", move);

// ===========================================================
//начинает сильно лагать при большом приближении

const _scale = (e) => {
    console.log("scale");
    var delta = e.deltaY || e.detail || e.wheelDelta;

    // отмасштабируем при помощи CSS
    if (delta > 0) scale += 0.05;
    else scale -= 0.05;

    document.body.style.transform = document.body.style.WebkitTransform = document.body.style.MsTransform = "scale(" + scale + ")";

    // отменим прокрутку
    e.preventDefault();
};

function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
        if ("onwheel" in document) {
            // IE9+, FF17+
            elem.addEventListener("wheel", handler);
        } else if ("onmousewheel" in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", handler);
        } else {
            // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
            elem.addEventListener("MozMousePixelScroll", handler);
        }
    } else {
        // IE8-
        elem.attachEvent("onmousewheel", handler);
    }
}

var scale = 1;

addOnWheel(window, _scale);
