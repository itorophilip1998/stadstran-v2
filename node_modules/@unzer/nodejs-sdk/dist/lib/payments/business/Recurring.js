"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resources_1 = require("./Resources");
var Processing_1 = require("./Processing");
var Recurring = /** @class */ (function () {
    function Recurring() {
        this._resources = new Resources_1.default();
        this._processing = new Processing_1.default();
    }
    /**
     * Get redirectUrl
     *
     * @returns {string}
     */
    Recurring.prototype.getRedirectUrl = function () {
        return this._redirectUrl;
    };
    /**
     * Set redirectUrl
     *
     * @param {string} redirectUrl
     * @returns {Recurring}
     */
    Recurring.prototype.setRedirectUrl = function (redirectUrl) {
        this._redirectUrl = redirectUrl;
        return this;
    };
    /**
     * Get returnUrl
     *
     * @returns {string}
     */
    Recurring.prototype.getReturnUrl = function () {
        return this._returnUrl;
    };
    /**
     * Set returnUrl
     *
     * @param {string} returnUrl
     * @returns {Recurring}
     */
    Recurring.prototype.setReturnUrl = function (returnUrl) {
        this._returnUrl = returnUrl;
        return this;
    };
    /**
     * Get date
     *
     * @returns {string}
     */
    Recurring.prototype.getDate = function () {
        return this._date;
    };
    /**
     * Set date
     *
     * @param {string} date
     * @returns {Recurring}
     */
    Recurring.prototype.setDate = function (date) {
        this._date = date;
        return this;
    };
    /**
     * Get resources
     *
     * @returns {Resources}
     */
    Recurring.prototype.getResources = function () {
        return this._resources;
    };
    /**
     * Set resources
     *
     * @param {*} resources
     */
    Recurring.prototype.setResources = function (resources) {
        this._resources
            .setCustomerId(resources.customerId)
            .setMetadataId(resources.metadataId);
    };
    /**
     * Get Processing
     *
     * @returns {Processing}
     */
    Recurring.prototype.getProcessing = function () {
        return this._processing;
    };
    /**
     * Set Processing
     *
     * @param {*} processing
     */
    Recurring.prototype.setProcessing = function (processing) {
        this._processing
            .setUniqueId(processing.uniqueId)
            .setShortId(processing.shortId);
    };
    return Recurring;
}());
exports.default = Recurring;
//# sourceMappingURL=Recurring.js.map