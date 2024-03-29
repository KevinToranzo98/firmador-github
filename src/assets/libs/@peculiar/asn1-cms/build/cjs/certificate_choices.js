"use strict";
var CertificateSet_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateSet = exports.CertificateChoices = exports.OtherCertificateFormat = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const asn1_x509_1 = require("@peculiar/asn1-x509");
const asn1_x509_attr_1 = require("@peculiar/asn1-x509-attr");
class OtherCertificateFormat {
    constructor(params = {}) {
        this.otherCertFormat = "";
        this.otherCert = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.ObjectIdentifier })
], OtherCertificateFormat.prototype, "otherCertFormat", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Any })
], OtherCertificateFormat.prototype, "otherCert", void 0);
exports.OtherCertificateFormat = OtherCertificateFormat;
let CertificateChoices = class CertificateChoices {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.Certificate })
], CertificateChoices.prototype, "certificate", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_attr_1.AttributeCertificate, context: 2, implicit: true })
], CertificateChoices.prototype, "v2AttrCert", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: OtherCertificateFormat, context: 3, implicit: true })
], CertificateChoices.prototype, "other", void 0);
CertificateChoices = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Choice })
], CertificateChoices);
exports.CertificateChoices = CertificateChoices;
let CertificateSet = CertificateSet_1 = class CertificateSet extends asn1_schema_1.AsnArray {
    constructor(items) {
        super(items);
        Object.setPrototypeOf(this, CertificateSet_1.prototype);
    }
};
CertificateSet = CertificateSet_1 = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Set, itemType: CertificateChoices })
], CertificateSet);
exports.CertificateSet = CertificateSet;
