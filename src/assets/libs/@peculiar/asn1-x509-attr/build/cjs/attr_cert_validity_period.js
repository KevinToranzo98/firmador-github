"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttCertValidityPeriod = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
class AttCertValidityPeriod {
    constructor(params = {}) {
        this.notBeforeTime = new Date();
        this.notAfterTime = new Date();
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.GeneralizedTime })
], AttCertValidityPeriod.prototype, "notBeforeTime", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.GeneralizedTime })
], AttCertValidityPeriod.prototype, "notAfterTime", void 0);
exports.AttCertValidityPeriod = AttCertValidityPeriod;
