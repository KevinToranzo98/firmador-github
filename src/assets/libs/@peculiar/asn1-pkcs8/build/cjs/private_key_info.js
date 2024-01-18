"use strict";
var Attributes_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKeyInfo = exports.Attributes = exports.PrivateKey = exports.Version = void 0;
const tslib_1 = require("tslib");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const asn1_x509_1 = require("@peculiar/asn1-x509");
var Version;
(function (Version) {
    Version[Version["v1"] = 0] = "v1";
})(Version = exports.Version || (exports.Version = {}));
class PrivateKey extends asn1_schema_1.OctetString {
}
exports.PrivateKey = PrivateKey;
let Attributes = Attributes_1 = class Attributes extends asn1_schema_1.AsnArray {
    constructor(items) {
        super(items);
        Object.setPrototypeOf(this, Attributes_1.prototype);
    }
};
Attributes = Attributes_1 = tslib_1.__decorate([
    (0, asn1_schema_1.AsnType)({ type: asn1_schema_1.AsnTypeTypes.Sequence, itemType: asn1_x509_1.Attribute })
], Attributes);
exports.Attributes = Attributes;
class PrivateKeyInfo {
    constructor(params = {}) {
        this.version = Version.v1;
        this.privateKeyAlgorithm = new asn1_x509_1.AlgorithmIdentifier();
        this.privateKey = new PrivateKey();
        Object.assign(this, params);
    }
}
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_schema_1.AsnPropTypes.Integer })
], PrivateKeyInfo.prototype, "version", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: asn1_x509_1.AlgorithmIdentifier })
], PrivateKeyInfo.prototype, "privateKeyAlgorithm", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: PrivateKey })
], PrivateKeyInfo.prototype, "privateKey", void 0);
tslib_1.__decorate([
    (0, asn1_schema_1.AsnProp)({ type: Attributes, implicit: true, context: 0, optional: true })
], PrivateKeyInfo.prototype, "attributes", void 0);
exports.PrivateKeyInfo = PrivateKeyInfo;