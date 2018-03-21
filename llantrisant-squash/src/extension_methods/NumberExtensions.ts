Number.prototype.ordinalSuffixOf = function(this : number) {
    var j = this % 10,
        k = this % 100;
    if (j == 1 && k != 11) {
        return String(this) + "st";
    }
    if (j == 2 && k != 12) {
        return String(this) + "nd";
    }
    if (j == 3 && k != 13) {
        return String(this) + "rd";
    }
    return String(this) + "th";
};
