"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (response, linkpay) {
    linkpay.setId(response.id);
    linkpay
        .setAlias(linkpay.getAlias())
        .setAmount(response.amount || linkpay.getAmount())
        .setAdditionalAttributes(response.additionalAttributes || linkpay.getAdditionalAttributes())
        .setBillingAddressRequired(response.billingAddressRequired || linkpay.getBillingAddressRequired())
        .setCurrency(response.currency || linkpay.getCurrency())
        .setCard3ds(response.card3ds || linkpay.getCard3ds())
        .setCss(response.css || linkpay.getCss())
        .setContactUrl(response.contactUrl || linkpay.getContactUrl())
        .setExcludeTypes(response.excludeTypes || linkpay.getExcludeTypes())
        .setExpirationDate(response.expires || linkpay.getExpirationDate())
        .setFullPageImage(response.fullPageImage || linkpay.getFullPageImage())
        .setHelpUrl(response.helpUrl || linkpay.getHelpUrl())
        .setInvoiceId(response.invoiceId || linkpay.getInvoiceId())
        .setInvoiceIdRequired(response.invoiceIdRequired || linkpay.getInvoiceIdRequired())
        .setImprintUrl(response.imprintUrl || linkpay.getImprintUrl())
        .setIntention(response.intention || linkpay.getIntention())
        .setLogoImage(response.logoImage || linkpay.getLogoImage())
        .setPrivacyPolicyUrl(response.privacyPolicyUrl || linkpay.getPrivacyPolicyUrl())
        .setOrderId(response.orderId || linkpay.getOrderId())
        .setOrderIdRequired(response.orderIdRequired || linkpay.getOrderIdRequired())
        .setResources(response.resources || linkpay.getResources())
        .setReturnUrl(response.returnUrl || linkpay.getReturnUrl())
        .setShopName(response.shopName || linkpay.getShopName())
        .setShopDescription(response.shopDescription || linkpay.getShopDescription())
        .setShippingAddressRequired(response.shippingAddressRequired || linkpay.getShippingAddressRequired())
        .setTagline(response.tagline || linkpay.getTagline())
        .setTermsAndConditionUrl(response.termsAndConditionUrl || linkpay.getTermsAndConditionUrl())
        .setRedirectUrl(response.redirectUrl || linkpay.getRedirectUrl())
        .setAction(response.action || linkpay.getAction());
    return linkpay;
});
//# sourceMappingURL=ResponseLinkpayMapper.js.map