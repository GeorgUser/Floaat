$(document).ready(function () {
    let counter = 0;

    // Start the changing images
    setInterval(function () {
        if (counter === 9) {
            counter = 0;
        }

        changeImage(counter);
        counter++;
    }, 500);

    // Set the percentage off
    loading();
});

function changeImage(counter) {
    const images = [
        '<i class="fa fa-fighter-jet"></i>',
        '<i class="fa fa-gamepad"></i>',
        '<i class="fa fa-headphones"></i>',
        '<i class="fa fa-cubes"></i>',
        '<i class="fa fa-paw"></i>',
        '<i class="fa fa-rocket"></i>',
        '<i class="fa fa-ticket"></i>',
        '<i class="fa fa-pie-chart"></i>',
        '<i class="fa fa-codepen"></i>'
    ];

    $(".loader .image").html("" + images[counter] + "");
}

function loading() {
    let num = 0;

    for (let i = 0; i <= 100; i++) {
        setTimeout(function () {
            $('.loader span').html(num);
            num++;
        }, i * 40);
    }
}