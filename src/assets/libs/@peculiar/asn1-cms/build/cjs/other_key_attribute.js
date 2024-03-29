"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherKeyAttribute = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
class OtherKeyAttribute {
    constructor(params = {}) {
        this.keyAttrId = "";
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.ObjectIdentifier })
], OtherKeyAttribute.prototype, "keyAttrId", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Any, optional: true })
], OtherKeyAttribute.prototype, "keyAttr", void 0);
exports.OtherKeyAttribute = OtherKeyAttribute;
