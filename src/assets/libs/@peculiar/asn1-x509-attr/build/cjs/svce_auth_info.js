"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvceAuthInfo = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const asn1_x509_1 = require("@peculiar/asn1-x509");
class SvceAuthInfo {
    constructor(params = {}) {
        this.service = new asn1_x509_1.GeneralName();
        this.ident = new asn1_x509_1.GeneralName();
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.GeneralName })
], SvceAuthInfo.prototype, "service", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.GeneralName })
], SvceAuthInfo.prototype, "ident", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.OctetString, optional: true })
], SvceAuthInfo.prototype, "authInfo", void 0);
exports.SvceAuthInfo = SvceAuthInfo;
