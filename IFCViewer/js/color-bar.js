let color_wrapper = $('.color-wrapper');

let title;

//Color pool
let color_pool = [
    // #0000FF,#2424FF,#4949FF,#6D6DFF,#9292FF,#B6B6FF,#B6B6FF
    // ,#FFFFFF,#FFDBDB,#FFB6B6,#FF9292,#FF6D6D,#FF4949,#FF2424,#FF0000];


    "rgb(0, 0, 255)",
    "rgb(25,25,255)",
    "rgb(50,50,255)",
    "rgb(75,75,255)",
    "rgb(100,100,255)",
    "rgb(125,125,255)",
    "rgb(150,150,255)",
    "rgb(175,175,255)",
    "rgb(200,200,255)",
    "rgb(225,225,255)",
    "rgb(255,255,255)",
    "rgb(255,225,225)",
    "rgb(255,200 ,200)",
    "rgb(255,175,175)",
    "rgb(255,150,150)",
    "rgb(255,125,125)",
    "rgb(255,100,100)",
    "rgb(255,75,75)",
    "rgb(255,50,50)",
    "rgb(255,25,25)",
    "rgb(255,0,0)",];

// "rgb(73,73,255)",
// "rgb(175, 46, 90)",
// "rgb(229, 109, 83)",
// "rgb(234, 164, 62)",
// "rgb(235, 215, 53)",
// "rgb(190, 228, 61)",
// "rgb(89, 208, 73)",
// "rgb(75, 182, 152)"];

//Threshold pool
let ColorThreshold = [-5.0, -4.5, -4.0, -3.5, -3.0, -2.5, -2.0, -1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];


function ColorBar() {

}

//Set color pool
ColorBar.prototype.setColorPool = function (param) {
    color_pool = param;
};

//Set Threshold pool
ColorBar.prototype.setColorThreshold = function (param) {
    ColorThreshold = param;
};
//Set title
ColorBar.prototype.setTitle = function (param) {
    title = param;
};

//Generate colorbar
ColorBar.prototype.generateColorBar = function (param) {

    const color_length = color_pool.length;
    const Threshold_length = ColorThreshold.length;

    let length = 0;
    let Threshold_Text;

    if (color_length > Threshold_length)
        length = Threshold_length;
    else if (color_length < Threshold_length)
        length = color_length;
    else if (color_length === Threshold_length)
        length = color_length;

    generateSpan("text_black", title, "#ffffff");

    for (let i = 0; i < length; i++) {
        if (ColorThreshold[i] < param)
            generateSpan("text_black", ColorThreshold[i], color_pool[i]);
        else
            generateSpan("text_white", ColorThreshold[i], color_pool[i]);
    }


};

//Generate color span
function generateSpan(type, value, color) {

    let span_one;

    if (type === "text_white")
        span_one = $('<span class = "color-one text_white">' + value + '</span>');
    else
        span_one = $('<span class = "color-one text_black">' + value + '</span>');

    span_one.css('background-color', color);
    span_one.appendTo(color_wrapper);

}