function Buffer() {
    if (window === this)
        return new Buffer();

    return this;
}

Buffer.prototype = {

    IMAGE_ID_PREFIX: "image_",
    VIDEO_ID_PREFIX: "video_",

    TYPE_UNUSED: "unused",
    TYPE_IMAGE: "image",
    TYPE_VIDEO: "video",

    VIDEO_FILE_TYPE: "video/mp4",
    VIDEO_ERROR_MESSAGE: "Your browser doesn't support HTML5 video. :(",

    id: "",
    imageId: "",
    videoId: "",

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

        // Create the buffer's containing div, its image element, and its video element
        $("#" + parentDivId).append('<div class"contentBuffer" id="' + this.id + '" />');
        $("#" + this.id).append('<img src="" id="' + this.imageId + '" />');
        $("#" + this.id).append('<video id="' + this.videoId + '" loop />');

        // Pre-populate the div's video element with a hot-swappable <source> object
        $("#" + this.videoId).append('<source src="" type="' + this.VIDEO_FILE_TYPE + '" >');
        $("#" + this.videoId).append(this.VIDEO_ERROR_MESSAGE);

        this.type = this.TYPE_UNUSED;
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

        } else if (media.type == this.TYPE_IMAGE) {
            this.type = this.TYPE_IMAGE;
            $("#" + this.imageId).get(0).src = media.source;
        }

        this.duration = media.duration;
    },

    show: function() {
        $("#" + this.id).show();
    },

    hide: function() {
        $("#" + this.id).hide();
    },

    play: function() {
    },

    pause: function() {
    }
}

