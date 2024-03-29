"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncapsulatedContentInfo = exports.EncapsulatedContent = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
let EncapsulatedContent = class EncapsulatedContent {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.OctetString })
], EncapsulatedContent.prototype, "single", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Any })
], EncapsulatedContent.prototype, "any", void 0);
EncapsulatedContent = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Choice })
], EncapsulatedContent);
exports.EncapsulatedContent = EncapsulatedContent;
class EncapsulatedContentInfo {
    constructor(params = {}) {
        this.eContentType = "";
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.ObjectIdentifier })
], EncapsulatedContentInfo.prototype, "eContentType", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: EncapsulatedContent, context: 0, optional: true })
], EncapsulatedContentInfo.prototype, "eContent", void 0);
exports.EncapsulatedContentInfo = EncapsulatedContentInfo;
