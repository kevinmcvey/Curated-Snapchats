function Timer(divId) {
    if (window === this) {
        return new Timer();
    }

    if (divId == "") {
        console.error("Timer is expected to bind to a valid div");
        return;
    }

    this.divId = divId;
    return this;
}

Timer.prototype = {
    divId: "",

    setTimerDuration: function(timerDuration) {
        $("#" + this.divId).css({
            '-webkit-transition': `width ${timerDuration}s, -webkit-transform`,
            'transition': `width ${timerDuration}s, transform ${timerDuration}s`
        });
    },

    startTimer: function() {
        $("#" + this.divId).css({
            'width': '0px'
        });
    },

    resetTimer: function() {
        $("#" + this.divId).css({
            '-webkit-transition': 'width 0s, -webkit-transform',
            'transition': 'width 0s, transform 0s',
            'width': '100%'
        });
    }
}
