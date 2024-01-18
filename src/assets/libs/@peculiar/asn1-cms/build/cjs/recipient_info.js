"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientInfo = exports.OtherRecipientInfo = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const key_agree_recipient_info_1 = require("./key_agree_recipient_info");
const key_trans_recipient_info_1 = require("./key_trans_recipient_info");
const kek_recipient_info_1 = require("./kek_recipient_info");
const password_recipient_info_1 = require("./password_recipient_info");
class OtherRecipientInfo {
    constructor(params = {}) {
        this.oriType = "";
        this.oriValue = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.ObjectIdentifier })
], OtherRecipientInfo.prototype, "oriType", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Any })
], OtherRecipientInfo.prototype, "oriValue", void 0);
exports.OtherRecipientInfo = OtherRecipientInfo;
let RecipientInfo = class RecipientInfo {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: key_trans_recipient_info_1.KeyTransRecipientInfo, optional: true })
], RecipientInfo.prototype, "ktri", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: key_agree_recipient_info_1.KeyAgreeRecipientInfo, context: 1, implicit: true, optional: true })
], RecipientInfo.prototype, "kari", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: kek_recipient_info_1.KEKRecipientInfo, context: 2, implicit: true, optional: true })
], RecipientInfo.prototype, "kekri", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: password_recipient_info_1.PasswordRecipientInfo, context: 3, implicit: true, optional: true })
], RecipientInfo.prototype, "pwri", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: OtherRecipientInfo, context: 4, implicit: true, optional: true })
], RecipientInfo.prototype, "ori", void 0);
RecipientInfo = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Choice })
], RecipientInfo);
exports.RecipientInfo = RecipientInfo;