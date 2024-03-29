"use strict";
var RevocationInfoChoices_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevocationInfoChoices = exports.RevocationInfoChoice = exports.OtherRevocationInfoFormat = exports.id_ri_scvp = exports.id_ri_ocsp_response = exports.id_ri = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const asn1_x509_1 = require("@peculiar/asn1-x509");
exports.id_ri = `${asn1_x509_1.id_pkix}.16`;
exports.id_ri_ocsp_response = `${exports.id_ri}.2`;
exports.id_ri_scvp = `${exports.id_ri}.4`;
class OtherRevocationInfoFormat {
    constructor(params = {}) {
        this.otherRevInfoFormat = "";
        this.otherRevInfo = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.ObjectIdentifier })
], OtherRevocationInfoFormat.prototype, "otherRevInfoFormat", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Any })
], OtherRevocationInfoFormat.prototype, "otherRevInfo", void 0);
exports.OtherRevocationInfoFormat = OtherRevocationInfoFormat;
let RevocationInfoChoice = class RevocationInfoChoice {
    constructor(params = {}) {
        this.other = new OtherRevocationInfoFormat();
        Object.assign(this, params);
    }
};
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: OtherRevocationInfoFormat, context: 1, implicit: true })
], RevocationInfoChoice.prototype, "other", void 0);
RevocationInfoChoice = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Choice })
], RevocationInfoChoice);
exports.RevocationInfoChoice = RevocationInfoChoice;
let RevocationInfoChoices = RevocationInfoChoices_1 = class RevocationInfoChoices extends asn1_schema_1.AsnArray {
    constructor(items) {
        super(items);
        Object.setPrototypeOf(this, RevocationInfoChoices_1.prototype);
    }
};
RevocationInfoChoices = RevocationInfoChoices_1 = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Set, itemType: RevocationInfoChoice })
], RevocationInfoChoices);
exports.RevocationInfoChoices = RevocationInfoChoices;
