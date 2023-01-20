"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Basket = /** @class */ (function () {
    function Basket() {
        this._basketItems = [];
    }
    /**
     * Set Id
     * @param {string} id
     */
    Basket.prototype.setId = function (id) {
        this._id = id;
        return this;
    };
    /**
     * Get Id
     *
     * @type {string}
     */
    Basket.prototype.getId = function () {
        return this._id;
    };
    /**
     * Set payload object
     *
     * @param {*} payload
     * @returns
     */
    Basket.prototype.setPayload = function (payload) {
        return this._payload = payload;
    };
    /**
     * Get payload object
     *
     * @returns {*}
     */
    Basket.prototype.getPayload = function () {
        return this._payload;
    };
    /**
     * Get Request Payload
     */
    Basket.prototype.getRequestPayload = function () {
        return {
            amountTotalGross: this.getAmountTotalGross(),
            amountTotalDiscount: this.getAmountTotalDiscount(),
            amountTotalVat: this.getAmountTotalVat(),
            currencyCode: this.getCurrencyCode(),
            orderId: this.getOrderId(),
            note: this.getNote(),
            basketItems: this.getItems(),
        };
    };
    /**
     * Set amount total
     * @param {string} value
     * @returns {Basket}
     */
    Basket.prototype.setAmountTotalGross = function (value) {
        this._amountTotalGross = value;
        return this;
    };
    /**
     * Get amount total
     * @param {string} value
     */
    Basket.prototype.getAmountTotalGross = function () {
        return this._amountTotalGross;
    };
    /**
     * Set amount total discount
     * @param {string} value
     * @returns {Basket}
     */
    Basket.prototype.setAmountTotalDiscount = function (value) {
        this._amountTotalDiscount = value;
        return this;
    };
    /**
     * Get amount total discount
     * @param {string} value
     */
    Basket.prototype.getAmountTotalDiscount = function () {
        return this._amountTotalDiscount;
    };
    /**
     * Set amount total vat
     * @param {string} value
     * @returns {Basket}
     */
    Basket.prototype.setAmountTotalVat = function (value) {
        this._amountTotalVat = value;
        return this;
    };
    /**
     * Get amount total vat
     * @param {string} value
     */
    Basket.prototype.getAmountTotalVat = function () {
        return this._amountTotalVat;
    };
    /**
     * Set currency code
     * @param {string} value
     * @returns {Basket}
     */
    Basket.prototype.setCurrencyCode = function (value) {
        this._currencyCode = value;
        return this;
    };
    /**
     * Get currency code
     * @param {string} value
     */
    Basket.prototype.getCurrencyCode = function () {
        return this._currencyCode;
    };
    /**
     * Set order Id
     * @param {string} value
     * @returns {Basket}
     */
    Basket.prototype.setOrderId = function (value) {
        this._orderId = value;
        return this;
    };
    /**
     * Get Order Id
     * @param {string} value
     */
    Basket.prototype.getOrderId = function () {
        return this._orderId;
    };
    /**
     * Set basket note
     * @param {string} value
     * @returns {Basket}
     */
    Basket.prototype.setNote = function (value) {
        this._note = value;
        return this;
    };
    /**
     * Get note for basket
     * @param {string} value
     */
    Basket.prototype.getNote = function () {
        return this._note;
    };
    /**
     * Add basket Item
     * @param {basketItemObject} item
     */
    Basket.prototype.addItem = function (item) {
        this._basketItems.push(item);
    };
    /**
     * Get basket Item
     * @param {basketItemObject} item
     * @returns {Array<basketItemObject>}
     */
    Basket.prototype.getItems = function () {
        return this._basketItems;
    };
    return Basket;
}());
exports.default = Basket;
//# sourceMappingURL=Basket.js.map