const timerForm = document.querySelector(".timer_form");
const timerText = document.querySelector(".timer_clock");
const startBtn = document.querySelector(".timer_btn");
const stopBtn = document.querySelector(".timer_btn_stop");

function startTimer(e) {
    // change time
    let sec = 0;
    let min = 0;
    let hour = 0;
    let addTime = setInterval(function(){
        sec += 1;
        timerText.innerHTML = `${hour}h ${min}m ${sec}s`;
        if (sec === 60) {
            min += 1;
            sec = 0;
        }
        if (min === 60) {
            hour += 1;
            min = 0;
        }
    }, 1000);

    // change button
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");

    // stopTimer
    stopBtn.addEventListener("click", function(e){

        // change time
        clearInterval(addTime);

        // change button
        // stopBtn
        stopBtn.classList.add("hidden");
        // startBtn
        startBtn.classList.remove("hidden");
        startBtn.innerHTML = "RESET";
        startBtn.addEventListener("click", function(){
            setInterval(addTime);
        });

        e.preventDefault();
    });

    e.preventDefault();
}

function init() {
    startBtn.addEventListener("click", startTimer);
}

init();