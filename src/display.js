function Display() {
    if (window === this) {
        return new Display();
    }
    return this;
}

Display.prototype = {

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
        buffers.push(newBuffer);
    },

    populateAllBuffersWithRandomMedia: function() {
    },

    populateLastBufferWithRandomMedia: function(media) {
    },

    populateLastBufferWithMedia: function(media) {
    },

    rotateLiveBuffer: function() {
    },

    play: function() {
    },

    pause: function() {
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
