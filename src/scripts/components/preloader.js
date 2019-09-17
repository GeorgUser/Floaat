(function () {
    const images = document.images;
    const preloader = document.getElementById("page-preloader");
    const percent_display = document.getElementById("percent_display");
    const image_display = document.getElementById("image_display");
    let images_total_count = images.length;
    let images_loaded_count = 0;
    let counter = 0;
    const imgTag = [
        "<img src='./images/star.png' alt='star'>",
        "<img src='./images/camera.png' alt='star'>",
        "<img src='./images/headphone.png' alt='star'>"
    ];

    const imgSetInt = setInterval(() =>{
        if (counter === 3) counter = 0;
        image_display.innerHTML = imgTag[counter];
        counter++;
    }, 500);

    for (let i = 0; i < images_total_count; i++) {
        image_clone = new Image();
        image_clone.onload = image_loaded;
        image_clone.onerror = image_loaded;
        image_clone.src = images[i].src;
    }

    function image_loaded() {
        images_loaded_count++;

        percent_display.innerHTML = (((100 / images_total_count) * images_loaded_count) << 0);

        if (images_loaded_count >= images_total_count) {
            setTimeout(() => {
                if (!preloader.classList.contains("done")) {
                    preloader.classList.add("done");
                    clearInterval(imgSetInt);
                }
            }, 3200)
        }
    }
})();
