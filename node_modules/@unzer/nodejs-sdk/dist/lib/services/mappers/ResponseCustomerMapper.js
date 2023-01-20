"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("../../payments/Customer");
exports.default = (function (response, customer) {
    if (customer === void 0) { customer = undefined; }
    // For create new customer
    if (customer) {
        var newCustomer_1 = new Customer_1.Customer()
            .setCustomerId(response.id)
            .setFirstName(customer.getFirstName())
            .setLastName(customer.getLastName())
            .setSalutation(customer.getSalutation())
            .setBirthDate(customer.getBirthDate())
            .setEmail(customer.getEmail())
            .setPhone(customer.getPhone())
            .setMobile(customer.getMobile())
            .setBillingAddress(customer.getBillingAddress())
            .setShippingAddress(customer.getShippingAddress())
            .setCompanyInfo(customer.getCompanyInfo());
        return newCustomer_1;
    }
    // For fetch or update customer
    var newCustomer = new Customer_1.Customer()
        .setCustomerId(response.id)
        .setFirstName(response.firstname)
        .setLastName(response.lastname)
        .setSalutation(response.salutation)
        .setBirthDate(response.birthDate)
        .setEmail(response.email)
        .setPhone(response.phone)
        .setMobile(response.mobile)
        .setBillingAddress(response.billingAddress)
        .setShippingAddress(response.shippingAddress)
        .setCompanyInfo(response.companyInfo);
    return newCustomer;
});
//# sourceMappingURL=ResponseCustomerMapper.js.map