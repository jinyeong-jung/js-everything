const timerForm = document.querySelector(".timer_form");
const timerText = document.querySelector(".timer_clock");
const startBtn = document.querySelector(".timer_btn");
const stopBtn = document.querySelector(".timer_btn_stop");
const saveBtn = document.querySelector(".timer_btn_save");
const historyBtn = document.querySelector(".timer_history_btn");
const historyWrap = document.querySelector(".timer_history_wrap"),
    historyExitBtn = historyWrap.querySelector(".timer_history_exit");

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

        // change button
        // stopBtn
        stopBtn.classList.add("hidden");
        // saveBtn
        saveBtn.classList.remove("hidden");
        saveBtn.addEventListener("click", function(e){
            console.log(sec, min, hour);
            e.preventDefault();
        });
        // startBtn
        startBtn.classList.remove("hidden");
        startBtn.addEventListener("click", function(){
            setInterval(addTime);
            saveBtn.classList.add("hidden");
        });

        // change time
        clearInterval(addTime);
        e.preventDefault();
    });

    e.preventDefault();
}

function hideHistory() {
    historyWrap.classList.add("hidden");
}

function openHistory(e) {
    historyWrap.classList.remove("hidden");
    historyExitBtn.addEventListener("click", hideHistory);
    e.preventDefault();
}

function init() {
    startBtn.addEventListener("click", startTimer);
    historyBtn.addEventListener("click", openHistory);
}

init();