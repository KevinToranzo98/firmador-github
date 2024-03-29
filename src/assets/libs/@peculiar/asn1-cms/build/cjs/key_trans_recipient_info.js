"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyTransRecipientInfo = exports.RecipientIdentifier = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const types_1 = require("./types");
const issuer_and_serial_number_1 = require("./issuer_and_serial_number");
const asn1_x509_1 = require("@peculiar/asn1-x509");
let RecipientIdentifier = class RecipientIdentifier {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.SubjectKeyIdentifier, context: 0, implicit: true })
], RecipientIdentifier.prototype, "subjectKeyIdentifier", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: issuer_and_serial_number_1.IssuerAndSerialNumber })
], RecipientIdentifier.prototype, "issuerAndSerialNumber", void 0);
RecipientIdentifier = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Choice })
], RecipientIdentifier);
exports.RecipientIdentifier = RecipientIdentifier;
class KeyTransRecipientInfo {
    constructor(params = {}) {
        this.version = types_1.CMSVersion.v0;
        this.rid = new RecipientIdentifier();
        this.keyEncryptionAlgorithm = new types_1.KeyEncryptionAlgorithmIdentifier();
        this.encryptedKey = new asn1_schema_1.OctetString();
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Integer })
], KeyTransRecipientInfo.prototype, "version", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: RecipientIdentifier })
], KeyTransRecipientInfo.prototype, "rid", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: types_1.KeyEncryptionAlgorithmIdentifier })
], KeyTransRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.OctetString })
], KeyTransRecipientInfo.prototype, "encryptedKey", void 0);
exports.KeyTransRecipientInfo = KeyTransRecipientInfo;
