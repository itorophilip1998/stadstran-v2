"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resources = /** @class */ (function () {
    function Resources() {
    }
    /**
     * Get type Id
     *
     * @returns
     */
    Resources.prototype.getTypeId = function () {
        return this.typeId;
    };
    /**
     * Set type Id
     *
     * @param {string} typeId
     * @returns
     */
    Resources.prototype.setTypeId = function (typeId) {
        this.typeId = typeId;
        return this;
    };
    /**
     * Get customer Id
     *
     * @returns {string}
     */
    Resources.prototype.getCustomerId = function () {
        return this.customerId;
    };
    /**
     * Set customer Id
     *
     * @param {string} customerId
     * @returns {Resources}
     */
    Resources.prototype.setCustomerId = function (customerId) {
        this.customerId = customerId;
        return this;
    };
    /**
     * Get meta data Id
     *
     * @returns {string}
     */
    Resources.prototype.getMetadataId = function () {
        return this.metadataId;
    };
    /**
     * Set meta data Id
     *
     * @param {string} metadataId
     * @returns {Resources}
     */
    Resources.prototype.setMetadataId = function (metadataId) {
        this.metadataId = metadataId;
        return this;
    };
    /**
     * Get payment Id
     *
     * @returns {string}
     */
    Resources.prototype.getPaymentId = function () {
        return this.paymentId;
    };
    /**
     * Set Payment Id
     *
     * @param {string} paymentId
     * @returns {Resources}
     */
    Resources.prototype.setPaymentId = function (paymentId) {
        this.paymentId = paymentId;
        return this;
    };
    /**
     * Get Basket Id
     *
     * @returns {string}
     */
    Resources.prototype.getBasketId = function () {
        return this.basketId;
    };
    /**
     * Set Trace Id
     *
     * @param {string} traceId
     * @returns {Resources}
     */
    Resources.prototype.setTraceId = function (traceId) {
        this.traceId = traceId;
        return this;
    };
    /**
     * Get Trace Id
     *
     * @returns {string}
     */
    Resources.prototype.getTraceId = function () {
        return this.traceId;
    };
    /**
     * Set Basket Id
     *
     * @param {string} paymentId
     * @returns {Resources}
     */
    Resources.prototype.setBasketId = function (basketId) {
        this.basketId = basketId;
        return this;
    };
    return Resources;
}());
exports.default = Resources;
//# sourceMappingURL=Resources.js.map