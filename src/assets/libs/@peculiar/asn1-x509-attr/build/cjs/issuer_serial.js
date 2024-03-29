"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuerSerial = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const asn1_x509_1 = require("@peculiar/asn1-x509");
class IssuerSerial {
    constructor(params = {}) {
        this.issuer = new asn1_x509_1.GeneralNames();
        this.serial = new ArrayBuffer(0);
        this.issuerUID = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.GeneralNames })
], IssuerSerial.prototype, "issuer", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Integer, converter: asn1_schema_1.AsnIntegerArrayBufferConverter })
], IssuerSerial.prototype, "serial", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.BitString, optional: true })
], IssuerSerial.prototype, "issuerUID", void 0);
exports.IssuerSerial = IssuerSerial;
