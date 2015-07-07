function Buffer() {
    if (window === this)
        return new Buffer();

    return this;
}

Buffer.prototype = {

    IMAGE_ID_PREFIX: "image_",
    VIDEO_ID_PREFIX: "video_",
    TIMER_ID_PREFIX: "timer_",

    TYPE_UNUSED: "unused",
    TYPE_IMAGE: "image",
    TYPE_VIDEO: "video",

    VIDEO_FILE_TYPE: "video/mp4",
    VIDEO_ERROR_MESSAGE: "Your browser doesn't support HTML5 video. :(",

    id: "",
    imageId: "",
    videoId: "",
    timerId: "",

    type: "",

    duration: 0,

    isExistantDiv: function(divId) {
        if ($("#" + divId).length !== 0)
            return true;
        return false;
    },

    // Create the buffer
    createWithIdAsChildOf: function(id, parentDivId) {

        if (this.isExistantDiv(id)) {
            console.error("Cannot create buffer, unique ID required");
            return;
        }

        if (!this.isExistantDiv(parentDivId)) {
            console.error("Cannot create buffer, parent div at specified ID does not exist");
            return;
        }

        this.id = id;
        this.imageId = this.IMAGE_ID_PREFIX + id;
        this.videoId = this.VIDEO_ID_PREFIX + id;
        this.timerId = this.TIMER_ID_PREFIX + id;

        // Create the buffer's containing div, its image element, and its video element
        $("#" + parentDivId).append('<div class="contentBuffer" id="' + this.id + '" />');
        $("#" + this.id).append('<img src="" id="' + this.imageId + '" />');
        $("#" + this.id).append('<video id="' + this.videoId + '" />');

        // Pre-populate the div's video element with a hot-swappable <source> object
        $("#" + this.videoId).append('<source src="" type="' + this.VIDEO_FILE_TYPE + '" >');
        $("#" + this.videoId).append(this.VIDEO_ERROR_MESSAGE);

        this.type = this.TYPE_UNUSED;

        $("#" + this.videoId).hide();
        $("#" + this.imageId).hide();
        $("#" + this.id).hide();
    },

    /* Populate the buffer with a Media object.
       Requires: source, type, and duration */
    populateWithMedia: function(media) {

        if (media.source == undefined || media.type == undefined || media.duration == undefined) {
            console.error("Invalid media provided");
            return;
        }

        if (media.type == this.TYPE_VIDEO) {
            this.type = this.TYPE_VIDEO;
            $("#" + this.videoId).get(0).src = media.source;

            /* Ugly, irritating, "code smell"
             * Rotates the buffer when certain browsers ignore <video> orientation metadata */
            var _this = this;
            $("#" + _this.videoId).bind("loadedmetadata", function() {
                if ($("#" + _this.videoId).get(0).videoWidth > $("#" + _this.videoId).get(0).videoHeight) {
                    $("#" + _this.id).css({"transform": media.transform});
                }
            });

        } else if (media.type == this.TYPE_IMAGE) {
            this.type = this.TYPE_IMAGE;
            $("#" + this.imageId).get(0).src = media.source;
        }

        if (media.transform === undefined) {
            $("#" + this.id).css({"transform": ""});
        }

        this.duration = media.duration;
    },

    show: function() {
        $("#" + this.id).show();

        if (this.type == this.TYPE_VIDEO)
            $("#" + this.videoId).show();
        else if (this.type == this.TYPE_IMAGE)
            $("#" + this.imageId).show();
    },

    hide: function() {
        if (this.type == this.TYPE_VIDEO)
            $("#" + this.videoId).hide();
        else if (this.type == this.TYPE_IMAGE)
            $("#" + this.imageId).hide();

        $("#" + this.id).hide();
    },

    play: function() {
        if (this.type == this.TYPE_VIDEO) {
            $("#" + this.videoId).get(0).play();
            $("#" + this.videoId).get(0).currentTime = 0;
        }
    },

    pause: function() {
        if (this.type == this.TYPE_VIDEO)
            $("#" + this.videoId).get(0).pause();
    }
}
