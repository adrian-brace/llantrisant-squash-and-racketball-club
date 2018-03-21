Array.prototype.move = function<T>(from: number, to: number) {
    return this.splice(to, 0, this.splice(from, 1)[0]);
};