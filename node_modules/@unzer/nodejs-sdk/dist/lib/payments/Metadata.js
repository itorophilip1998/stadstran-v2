"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Metadata = /** @class */ (function () {
    function Metadata() {
    }
    /**
     * Set Id
     * @param {string} id
     */
    Metadata.prototype.setId = function (id) {
        this._id = id;
        return this;
    };
    /**
     * Get Id
     *
     * @type {string}
     */
    Metadata.prototype.getId = function () {
        return this._id;
    };
    /**
     * Set metadata value
     *
     * @param {object} value
     * @returns {Metadata}
     */
    Metadata.prototype.setValue = function (value) {
        this._metadata = value;
        return this;
    };
    /**
     * Get metadata value
     *
     * @type {object}
     */
    Metadata.prototype.getValue = function () {
        return this._metadata;
    };
    /**
     * Get Request Payload
     */
    Metadata.prototype.getRequestPayload = function () {
        return this._metadata;
    };
    return Metadata;
}());
exports.default = Metadata;
//# sourceMappingURL=Metadata.js.map