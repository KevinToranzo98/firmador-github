"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationRequestInfo = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const asn1_x509_1 = require("@peculiar/asn1-x509");
const attributes_1 = require("./attributes");
class CertificationRequestInfo {
    constructor(params = {}) {
        this.version = 0;
        this.subject = new asn1_x509_1.Name();
        this.subjectPKInfo = new asn1_x509_1.SubjectPublicKeyInfo();
        this.attributes = new attributes_1.Attributes();
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Integer })
], CertificationRequestInfo.prototype, "version", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.Name })
], CertificationRequestInfo.prototype, "subject", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.SubjectPublicKeyInfo })
], CertificationRequestInfo.prototype, "subjectPKInfo", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: attributes_1.Attributes, implicit: true, context: 0 })
], CertificationRequestInfo.prototype, "attributes", void 0);
exports.CertificationRequestInfo = CertificationRequestInfo;
