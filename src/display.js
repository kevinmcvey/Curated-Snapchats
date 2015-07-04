function Display() {
    if (window === this) {
        return new Display();
    }
    return this;
}

Display.prototype = {

    DEFAULT_BUFFER_INDEX: 0,
    REDRAW_DELAY_MS: 50,
    S_TO_MS: 1000,

    buffers: [],
    liveBufferIndex: undefined,
    lastBufferIndex: undefined,

    allMedia: [],

    rotationTimeoutId: undefined,

    addNewBuffersToParentDiv: function(bufferCount, parentDivId) {
        for (var i = 0; i < bufferCount; i++) {
            this.addNewBufferToParentDiv(parentDivId);
        }
    },

    addNewBufferToParentDiv: function(parentDivId) {
        var newBuffer = new Buffer();
        newBuffer.createWithIdAsChildOf(this.buffers.length, parentDivId);
        this.buffers.push(newBuffer);
    },

    populateAllBuffersWithRandomMedia: function() {
        for (var buffer = 0; buffer < this.buffers.length; buffer++) {
            this.buffers[buffer].populateWithMedia(this.getRandomMedia());
        }
    },

    populateLastBufferWithRandomMedia: function() {
        this.populateLastBufferWithMedia(this.getRandomMedia());
    },

    populateLastBufferWithMedia: function(media) {
        if (this.lastBufferIndex == undefined) {
            console.error("Last buffer is undefined");
            return;
        }

        this.buffers[this.lastBufferIndex].populateWithMedia(media);
    },

    rotateLiveBuffer: function() {
        if (this.liveBufferIndex == undefined ) {
            console.error("Live buffer is undefined");
            return;
        }

        var nextBufferIndex = this.liveBufferIndex + 1;
        if (nextBufferIndex == this.buffers.length)
            nextBufferIndex = 0;

        this.buffers[this.liveBufferIndex].hide();
        this.buffers[this.liveBufferIndex].pause();
        this.buffers[this.liveBufferIndex].resetTimer();
        this.buffers[nextBufferIndex].show();

        this.lastBufferIndex = this.liveBufferIndex;
        this.liveBufferIndex = nextBufferIndex;

        this.play();
    },

    /* Redrawing the live buffer (on window resize, for instance) is a little tricky.
       The hide and show events will clash if executed too quickly. Thus a timeout
       is used to artificially slow the process down ever so slightly. */
    redrawLiveBuffer: function() {
        if (this.liveBufferIndex == undefined) {
            console.error("Live buffer is undefined");
            return;
        }

        this.buffers[this.liveBufferIndex].hide();

        var _this = this;
        setTimeout(function showLiveBuffer() {
            _this.buffers[_this.liveBufferIndex].show();
        }, this.REDRAW_DELAY_MS);
    },

    play: function() {
        if (this.liveBufferIndex == undefined)
            this.liveBufferIndex = this.DEFAULT_BUFFER_INDEX;

        if (this.lastBufferIndex != undefined) {
            this.buffers[this.lastBufferIndex].hide();
            this.buffers[this.lastBufferIndex].pause();
        }

        var liveBuffer = this.buffers[this.liveBufferIndex];

        liveBuffer.show();
        liveBuffer.play();
        liveBuffer.setTimerDuration(liveBuffer.duration);

        // Give the CSS a moment to propagate
        setTimeout(function startTimerAfterDuration() {
            liveBuffer.startTimer();
        }, 50);

        // Schedule rotation and the next play event
        var _this = this;
        this.rotationTimeoutId =
            setTimeout(function rotateAfterDuration() {
                    _this.rotateLiveBuffer();

                    // Populate with new media
                    liveBuffer.populateWithMedia(_this.getRandomMedia());
                },
                this.buffers[this.liveBufferIndex].duration * this.S_TO_MS);
    },

    pause: function() {
        if (this.rotationTimeoutId == undefined)
            return;

        clearTimeout(this.rotationTimeoutId);

        this.buffers[this.liveBufferIndex].pause();
    },

    getRandomMedia: function() {
        return this.allMedia[Math.floor(Math.random() * this.allMedia.length)];
    }
}
