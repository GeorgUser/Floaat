import './autoload/_slick';
import './components/preloader';

// ----- SLICK ------ //

$('#slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: '<button type="button" class="slick-prev hover-js red">Prev</button>',
    nextArrow: '<button type="button" class="slick-next hover-js red">Next</button>'
});


// ----- CURSOR ------ //

// set the starting position of the cursor outside of the screen
let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--small");

const initCursor = () => {

    document.addEventListener("mousemove", e => {
        clientX = e.clientX;
        clientY = e.clientY;
    });

    const render = () => {
        innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
};
initCursor();

const hoverCursor = () => {

    function handleMouseEnter() {
        if (this.classList.contains('white')) innerCursor.classList.add('cursor-white');
        if (this.classList.contains('red')) innerCursor.classList.add('cursor-red');
        if (this.classList.contains('shadow')) innerCursor.classList.add('cursor-shadow');
    }

    function handleMouseLeave() {
        if (this.classList.contains('white')) innerCursor.classList.remove('cursor-white');
        if (this.classList.contains('red')) innerCursor.classList.remove('cursor-red');
        if (this.classList.contains('shadow')) innerCursor.classList.remove('cursor-shadow');
    }

    document.querySelectorAll(".hover-js").forEach(el => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
    });

};
hoverCursor();

//--------Title parallax

(function () {
    // Init
    const container = document.getElementById("hero_block"),
        inner = document.getElementById("inner");

    // Mouse
    const mouse = {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        updatePosition: function(event) {
            let e = event || window.event;
            this.x = (e.clientX - (this._x)) * 5;
            this.y = (e.clientY - (this._y / 3.5)) * 5;
        },
        setOrigin: function(e) {
            this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
            this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
        },
    };

    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(container);

    //----------------------------------------------------

    let counter = 0;
    let refreshRate = 10;
    const isTimeToUpdate = function () {
        return counter++ % refreshRate === 0;
    };

    //----------------------------------------------------

    const onMouseEnterHandler = (event) => {
        update(event);
    };

    const onMouseLeaveHandler = () => {
        inner.style = "";
    };

    const onMouseMoveHandler = (event) => {
        if (isTimeToUpdate()) {
            update(event);
        }
    };

    //----------------------------------------------------

    const update = (event) => {
        mouse.updatePosition(event);
        updateTransformStyle(
            (mouse.y / inner.offsetHeight / 2).toFixed(2),
            (mouse.x / inner.offsetWidth / 2).toFixed(2)
        );
    };

    const updateTransformStyle = (x, y) => {
        let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        inner.style.transform = style;
        inner.style.webkitTransform = style;
        inner.style.mozTranform = style;
        inner.style.msTransform = style;
        inner.style.oTransform = style;
    };

    //--------------------------------------------------------

    container.onmousemove = onMouseMoveHandler;
    container.onmouseleave = onMouseLeaveHandler;
    container.onmouseenter = onMouseEnterHandler;
})();


