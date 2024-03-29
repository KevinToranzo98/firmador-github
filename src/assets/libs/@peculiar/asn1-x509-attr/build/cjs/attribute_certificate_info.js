"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeCertificateInfo = exports.AttCertVersion = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const asn1_x509_1 = require("@peculiar/asn1-x509");
const holder_1 = require("./holder");
const attr_cert_issuer_1 = require("./attr_cert_issuer");
const attr_cert_validity_period_1 = require("./attr_cert_validity_period");
var AttCertVersion;
(function (AttCertVersion) {
    AttCertVersion[AttCertVersion["v2"] = 1] = "v2";
})(AttCertVersion = exports.AttCertVersion || (exports.AttCertVersion = {}));
class AttributeCertificateInfo {
    constructor(params = {}) {
        this.version = AttCertVersion.v2;
        this.holder = new holder_1.Holder();
        this.issuer = new attr_cert_issuer_1.AttCertIssuer();
        this.signature = new asn1_x509_1.AlgorithmIdentifier();
        this.serialNumber = new ArrayBuffer(0);
        this.attrCertValidityPeriod = new attr_cert_validity_period_1.AttCertValidityPeriod();
        this.attributes = [];
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Integer })
], AttributeCertificateInfo.prototype, "version", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: holder_1.Holder })
], AttributeCertificateInfo.prototype, "holder", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: attr_cert_issuer_1.AttCertIssuer })
], AttributeCertificateInfo.prototype, "issuer", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.AlgorithmIdentifier })
], AttributeCertificateInfo.prototype, "signature", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Integer, converter: asn1_schema_1.AsnIntegerArrayBufferConverter })
], AttributeCertificateInfo.prototype, "serialNumber", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: attr_cert_validity_period_1.AttCertValidityPeriod })
], AttributeCertificateInfo.prototype, "attrCertValidityPeriod", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.Attribute, repeated: "sequence" })
], AttributeCertificateInfo.prototype, "attributes", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.BitString, optional: true })
], AttributeCertificateInfo.prototype, "issuerUniqueID", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.Extensions, optional: true })
], AttributeCertificateInfo.prototype, "extensions", void 0);
exports.AttributeCertificateInfo = AttributeCertificateInfo;
