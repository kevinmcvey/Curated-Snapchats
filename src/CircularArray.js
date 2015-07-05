function CircularArray(maxSize) {
    if (window === this)
        return new CircularArray(maxSize);

    if (! $.isNumeric(maxSize)) {
        return undefined;
    }

    this.maxSize = maxSize;
    return this;
}

CircularArray.prototype = {
    maxSize: 0,
    innerArray: [],

    add: function(newValue) {
        if (this.innerArray.length === this.maxSize) {
            this.remove();
        }

        this.innerArray.push(newValue);
    },

    remove: function() {
        if (this.innerArray.length === 0 || this.maxSize === 0) {
            return;
        }

        this.innerArray = this.innerArray.slice(1, this.innerArray.length);
    },

    contains: function(value) {
        for (var index = 0; index < this.innerArray.length; index++) {
            if (this.innerArray[index] === value)
                return true;
        }

        return false;
    }
}
