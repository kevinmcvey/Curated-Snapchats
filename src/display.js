function Display() {
    if (window === this) {
        return new Display();
    }
    return this;
}

Display.prototype = {

    DEFAULT_BUFFER_INDEX: 0,
    REDRAW_DELAY_MS: 50,

    buffers: [],
    liveBufferIndex: undefined,
    lastBufferIndex: undefined,

    allMedia: [],

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

        if (this.lastBufferIndex != undefined)
            this.buffers[this.lastBufferIndex].hide(); //TODO: Stop

        this.buffers[this.liveBufferIndex].show(); // TODO: Play
    },

    pause: function() {
    },

    getRandomMedia: function() {
        return this.allMedia[Math.floor(Math.random() * this.allMedia.length)];
    }



    /*
    mediaMetadata: [],

    createWindowBuffers: function(buffers) {
        if (buffers <= 0)
            return;

        this.bufferCount = buffers;

        $("body").append('<div id="rootContainer"/>');

        for (var buffer = 0; buffer < this.bufferCount; buffer++) {
            var bufferId = this.BUFFER_ID_PREFIX + buffer;
            var imageId = this.IMAGE_ID_PREFIX + buffer;
            var videoId = this.VIDEO_ID_PREFIX + buffer;

            $("#rootContainer").append('<div class="contentBuffer" id="' + bufferId +'" />');
            $("#" + bufferId).append('<img src="" id="' + imageId + '" />');
            $("#" + bufferId).append('<video id="' + videoId + '" loop />');

            $("#" + bufferId).hide();
        }

        this.currentBuffer = buffers - 1;
    },

    populateAllBuffersWithRandomMedia: function() {
        for (var buffer = 0; buffer < this.bufferCount; buffer++) {
            this.populateBufferWithRandomMedia(buffer);
        }
    },

    populateBufferWithRandomMedia: function(buffer) {
        var mediaIndex = Math.floor(Math.random() * this.mediaMetadata.length);
        this.populateBuffer(buffer, this.mediaMetadata[mediaIndex]);
    },

    populateBuffer: function(buffer, media) {
        var bufferId = this.BUFFER_ID_PREFIX + buffer;
        var imageId = this.IMAGE_ID_PREFIX + buffer;
        var videoId = this.VIDEO_ID_PREFIX + buffer;

        if (media.type == "video") {
            $("#" + videoId).append('<source id="butts" src="' + media.source + '" type="' + this.VIDEO_TYPE + '">');
            $("#" + videoId).append(this.VIDEO_ERROR_MESSAGE);
        }
    },

    rotateBuffers: function() {
        // Gonna have to restructure this whole thing. That's fine.
    }
    */
}
