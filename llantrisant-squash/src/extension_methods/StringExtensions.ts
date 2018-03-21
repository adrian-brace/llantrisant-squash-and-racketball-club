String.prototype.capitalize = function(this : string) {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.replaceAll = function(this : string, search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};