import "./components/preloader";
import "./autoload/_slick";
import "imports-loader?define=>false!animation.gsap";
import ScrollMagic from "ScrollMagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import {TweenMax, TweenLite} from "gsap";


window.onload = function () {

    // --- MENU --- //
    (function () {
        const menuBody = document.getElementById("menu_body");
        const menuClose = document.getElementById("close_menu");
        const menu = document.getElementById("menu");
        const body = document.body;

        document.body.addEventListener("click", function ({target}) {
            if (target.parentNode.classList.contains("open-menu") || target.classList.contains("open-menu")) {
                body.style.overflow = "hidden";
                menuBody.style.height = "100%";
                setTimeout(function () {
                    menu.style.opacity = "1";
                    menuClose.style.opacity = "1";
                }, 1600)
            }
            if (target.classList.contains("close-menu")) {
                menuBody.style = "";
                menuClose.style = "";
                menu.style = "";
                setTimeout(function () {
                    body.style.overflow = "auto";
                }, 1600)
            }
        });
    })();


    // --- SCROLL ANIMATION --- //
    if ($(window).width() > 1024) {
        const controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onLeave",
                duration: "100%"
            }
        });
        const controller2 = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onEnter",
                duration: "100%"
            }
        });


        const slides = ["section.panel.hero_block", "section.panel.we_do"];

        for (let i = 0; i < slides.length; i++) {
            const wipeAnimatioSection = new TimelineMax()
                .fromTo(slides[i], 1, {opacity: 1}, {opacity: 0});

            new ScrollMagic.Scene({
                triggerElement: slides[i]
            })
                .setPin(slides[i], {pushFollowers: false})
                .setTween(wipeAnimatioSection)
                .addTo(controller);
        }

        const wipeAnimatioSection = new TimelineMax()
            .fromTo("section.panel.clients", 1, {opacity: 1}, {opacity: 0});

        new ScrollMagic.Scene({
            triggerElement: "section.panel.we_do"
        })
            .setPin("section.panel.clients", {pushFollowers: false})
            .setTween(wipeAnimatioSection)
            .addTo(controller2);

        const wipeAnimationGallery = new TimelineMax()
            .fromTo("section.panel.clients .clients__gallery__col", 1, {y: "0%"}, {
                y: "-60%",
                ease: Linear.easeNone
            });
        new ScrollMagic.Scene({
            triggerElement: "section.panel.clients",
        })
            .setPin("section.panel.clients")
            .setTween(wipeAnimationGallery)
            .addTo(controller);


        window.scrollTo(0, 0);


// --- COUNTER HERO-SECTION --- ///
        let date = Date.parse("2019-09-05T07:10:50.784Z");
        setInterval(function () {
            let dateNow = new Date().getTime();
            let counter = dateNow - date;
            document.getElementById("counter").innerHTML = counter.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
        }, 40);
    }

// ----- SLICK WE-DO ------ //
    $("#slider1").slick({
        draggable: false,
        fade: true,
        cssEase: "linear",
        arrows: false,
        string: $("#dots"),
    });

// ---- SLICK MOVE ---- //

    document.getElementById("we_do")
        .addEventListener("click", function ({target}) {
            if (target.parentNode.classList.contains("tab")) {
                // --- go to slide --- //
                $("#slider1")
                    .on("afterChange", function () {
                        // ---- delete class active on tab ---- //
                        if (document.querySelector(".active-tab")) {
                            document.querySelector(".active-tab")
                                .classList.remove("active-tab");
                        }
                        document.querySelector(".bg-0").classList.remove("bg-0");
                    })
                    .slick("slickGoTo", target.parentNode.dataset.num, false)
                    .on("afterChange", function () {
                        // ---- add class active on tab ----//
                        target.parentNode.classList.add("active-tab");

                        document.querySelector(".slick-active")
                            .childNodes[0].childNodes[0].childNodes[3]
                            .classList.add("bg-0");
                    });
            }
        });


// ----- SLICK TEAM ------ //
    $("#slider2").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<button type="button" data-atr="prev" class="slick-prev hover-js red">Prev</button>',
        nextArrow: '<button type="button" data-atr="next" class="slick-next hover-js red">Next</button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ],
    });


// ----- CURSOR ------ //

// set the starting position of the cursor outside of the screen

    if ($(window).width() > 1024) {
        let clientX = -100;
        let clientY = -100;
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;
        window.onresize = function () {
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        };

        const innerCursor = document.querySelector(".cursor--small");

        window.onscroll = function () {
            innerCursor.style.boxShadow = "none"
        };

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
                if (this.classList.contains("white")) innerCursor.classList.add("cursor-white");
                if (this.classList.contains("red")) {
                    innerCursor.dataset.atr = this.dataset.atr;
                    innerCursor.classList.add("cursor-red");
                }
                if (this.classList.contains("shadow")) shadowMouse();
            }

            function handleMouseLeave() {
                if (this.classList.contains("white")) innerCursor.classList.remove("cursor-white");
                if (this.classList.contains("red")) innerCursor.classList.remove("cursor-red");
                if (this.classList.contains("shadow")) innerCursor.style.boxShadow = "none";
            }

            document.querySelectorAll(".hover-js").forEach(el => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
            });

            function shadowMouse() {
                document.getElementById("hero_block").addEventListener("mousemove", e => {
                    let sizeShadow = Math.abs((+clientX - (+width / 2)) + (+clientY - (+height / 2))) / 2;
                    innerCursor.style.boxShadow = `0 0 70px ${width / 3.5 - sizeShadow}px rgba(86,24,56, 0.4)`;
                });
            }

            requestAnimationFrame(shadowMouse);
        };

        hoverCursor();
    }
// ---- TITLE PARALLAX ---- //

    if ($(window).width() > 1024) {
        (function () {
            // Init
            const container = document.getElementById("hero_block");
            const inner = document.getElementById("inner");


            // Mouse
            const mouse = {
                _x: 0,
                _y: 0,
                x: 0,
                y: 0,
                updatePosition: function (event) {
                    let e = event || window.event;
                    this.x = (e.clientX - (this._x)) * 5;
                    this.y = (e.clientY - (this._y * 1.3)) * 4;
                },
                setOrigin: function (e) {
                    this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
                    this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
                },
            };

            // Track the mouse position relative to the center of the container.
            mouse.setOrigin(container);

            let counter = 0;
            let refreshRate = 10;
            const isTimeToUpdate = function () {
                return counter++ % refreshRate === 0;
            };

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

            const update = (event) => {
                mouse.updatePosition(event);
                updateTransformStyle(
                    (mouse.y / inner.offsetHeight / 2).toFixed(2),
                    (mouse.x / inner.offsetWidth / 2).toFixed(2)
                );
            };

            const updateTransformStyle = (x, y) => {
                if (x < -8) x = -8;
                if (x > 3) x = 3;
                if (y > 2.5) y = 2.5;
                if (y < -2.5) y = -2.5;
                let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
                inner.style.transform = style;
                inner.style.webkitTransform = style;
                inner.style.mozTranform = style;
                inner.style.msTransform = style;
                inner.style.oTransform = style;
            };

            container.onmousemove = onMouseMoveHandler;
            container.onmouseleave = onMouseLeaveHandler;
            container.onmouseenter = onMouseEnterHandler;
        })();
    }
};




