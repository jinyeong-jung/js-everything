const body = document.querySelector("body");

const IMG_NUM = 8;

function printImg(num) {
    const image = new Image;
    image.src = `images/${num}.jpg`;
    image.classList.add("background");
    body.appendChild(image);
}

function randNum() {
    return Math.ceil(Math.random() * IMG_NUM);
}

function init() {
    const num = randNum();
    printImg(num);
}

init();