"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Processing = /** @class */ (function () {
    function Processing() {
    }
    /**
     * Get UniqueId
     *
     * @returns {string}
     */
    Processing.prototype.getUniqueId = function () {
        return this._uniqueId;
    };
    /**
     * Set Unique Id
     *
     * @param {string} uniqueId
     * @returns {Processing}
     */
    Processing.prototype.setUniqueId = function (uniqueId) {
        this._uniqueId = uniqueId;
        return this;
    };
    /**
     * Get Short Id
     *
     * @returns {string}
     */
    Processing.prototype.getShortId = function () {
        return this._shortId;
    };
    /**
     * Set Short Id
     *
     * @param {string} shortId
     * @returns {Processing}
     */
    Processing.prototype.setShortId = function (shortId) {
        this._shortId = shortId;
        return this;
    };
    return Processing;
}());
exports.default = Processing;
//# sourceMappingURL=Processing.js.map