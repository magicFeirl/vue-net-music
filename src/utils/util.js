export const timeFormat = function(duration) {
    let sec = duration % 60;
    let min = Math.floor((duration / 60) % 60);

    sec = (sec < 10 ? "0" : "") + sec;
    min = (min < 10 ? "0" : "") + min;

    return `${min}:${sec}`;
}