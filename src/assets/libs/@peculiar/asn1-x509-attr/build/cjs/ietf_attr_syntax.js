"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IetfAttrSyntax = exports.IetfAttrSyntaxValueChoices = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const asn1_x509_1 = require("@peculiar/asn1-x509");
class IetfAttrSyntaxValueChoices {
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.OctetString })
], IetfAttrSyntaxValueChoices.prototype, "cotets", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.ObjectIdentifier })
], IetfAttrSyntaxValueChoices.prototype, "oid", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Utf8String })
], IetfAttrSyntaxValueChoices.prototype, "string", void 0);
exports.IetfAttrSyntaxValueChoices = IetfAttrSyntaxValueChoices;
class IetfAttrSyntax {
    constructor(params = {}) {
        this.values = [];
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.GeneralNames, implicit: true, context: 0, optional: true })
], IetfAttrSyntax.prototype, "policyAuthority", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: IetfAttrSyntaxValueChoices, repeated: "sequence" })
], IetfAttrSyntax.prototype, "values", void 0);
exports.IetfAttrSyntax = IetfAttrSyntax;
