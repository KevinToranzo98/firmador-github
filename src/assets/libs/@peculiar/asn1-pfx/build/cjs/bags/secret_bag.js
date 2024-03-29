"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretBag = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
class SecretBag {
    constructor(params = {}) {
        this.secretTypeId = "";
        this.secretValue = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.ObjectIdentifier })
], SecretBag.prototype, "secretTypeId", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Any, context: 0 })
], SecretBag.prototype, "secretValue", void 0);
exports.SecretBag = SecretBag;
