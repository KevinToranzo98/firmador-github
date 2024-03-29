"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptedContentInfo = exports.EncryptedContent = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const types_1 = require("./types");
let EncryptedContent = class EncryptedContent {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.OctetString, context: 0, implicit: true, optional: true })
], EncryptedContent.prototype, "value", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.OctetString, converter: asn1_schema_1.AsnConstructedOctetStringConverter, context: 0, implicit: true, optional: true, repeated: "sequence" })
], EncryptedContent.prototype, "constructedValue", void 0);
EncryptedContent = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Choice })
], EncryptedContent);
exports.EncryptedContent = EncryptedContent;
class EncryptedContentInfo {
    constructor(params = {}) {
        this.contentType = "";
        this.contentEncryptionAlgorithm = new types_1.ContentEncryptionAlgorithmIdentifier();
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.ObjectIdentifier })
], EncryptedContentInfo.prototype, "contentType", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: types_1.ContentEncryptionAlgorithmIdentifier })
], EncryptedContentInfo.prototype, "contentEncryptionAlgorithm", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: EncryptedContent, optional: true })
], EncryptedContentInfo.prototype, "encryptedContent", void 0);
exports.EncryptedContentInfo = EncryptedContentInfo;
