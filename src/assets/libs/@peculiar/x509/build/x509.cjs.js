/*!
 * MIT License
 * 
 * Copyright (c) Peculiar Ventures. All rights reserved.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
'use strict';

require('reflect-metadata');
var asn1Schema = require('@peculiar/asn1-schema');
var asn1X509 = require('@peculiar/asn1-x509');
var pvtsutils = require('pvtsutils');
var asn1Cms = require('@peculiar/asn1-cms');
var asn1Ecc = require('@peculiar/asn1-ecc');
var asn1Rsa = require('@peculiar/asn1-rsa');
var tslib = require('tslib');
var tsyringe = require('tsyringe');
var asnPkcs9 = require('@peculiar/asn1-pkcs9');
var asn1Csr = require('@peculiar/asn1-csr');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var asn1X509__namespace = /*#__PURE__*/_interopNamespaceDefault(asn1X509);
var asn1Cms__namespace = /*#__PURE__*/_interopNamespaceDefault(asn1Cms);
var asn1Ecc__namespace = /*#__PURE__*/_interopNamespaceDefault(asn1Ecc);
var asn1Rsa__namespace = /*#__PURE__*/_interopNamespaceDefault(asn1Rsa);
var asnPkcs9__namespace = /*#__PURE__*/_interopNamespaceDefault(asnPkcs9);

const diAlgorithm = "crypto.algorithm";
class AlgorithmProvider {
    getAlgorithms() {
        return tsyringe.container.resolveAll(diAlgorithm);
    }
    toAsnAlgorithm(alg) {
        ({ ...alg });
        for (const algorithm of this.getAlgorithms()) {
            const res = algorithm.toAsnAlgorithm(alg);
            if (res) {
                return res;
            }
        }
        if (/[0-9.]+/.test(alg.name)) {
            const res = new asn1X509.AlgorithmIdentifier({
                algorithm: alg.name,
            });
            if ("parameters" in alg) {
                const unknown = alg;
                res.parameters = unknown.parameters;
            }
            return res;
        }
        throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm");
    }
    toWebAlgorithm(alg) {
        for (const algorithm of this.getAlgorithms()) {
            const res = algorithm.toWebAlgorithm(alg);
            if (res) {
                return res;
            }
        }
        const unknown = {
            name: alg.algorithm,
            parameters: alg.parameters,
        };
        return unknown;
    }
}
const diAlgorithmProvider = "crypto.algorithmProvider";
tsyringe.container.registerSingleton(diAlgorithmProvider, AlgorithmProvider);

var EcAlgorithm_1;
const idVersionOne = "1.3.36.3.3.2.8.1.1";
const idBrainpoolP160r1 = `${idVersionOne}.1`;
const idBrainpoolP160t1 = `${idVersionOne}.2`;
const idBrainpoolP192r1 = `${idVersionOne}.3`;
const idBrainpoolP192t1 = `${idVersionOne}.4`;
const idBrainpoolP224r1 = `${idVersionOne}.5`;
const idBrainpoolP224t1 = `${idVersionOne}.6`;
const idBrainpoolP256r1 = `${idVersionOne}.7`;
const idBrainpoolP256t1 = `${idVersionOne}.8`;
const idBrainpoolP320r1 = `${idVersionOne}.9`;
const idBrainpoolP320t1 = `${idVersionOne}.10`;
const idBrainpoolP384r1 = `${idVersionOne}.11`;
const idBrainpoolP384t1 = `${idVersionOne}.12`;
const idBrainpoolP512r1 = `${idVersionOne}.13`;
const idBrainpoolP512t1 = `${idVersionOne}.14`;
const brainpoolP160r1 = "brainpoolP160r1";
const brainpoolP160t1 = "brainpoolP160t1";
const brainpoolP192r1 = "brainpoolP192r1";
const brainpoolP192t1 = "brainpoolP192t1";
const brainpoolP224r1 = "brainpoolP224r1";
const brainpoolP224t1 = "brainpoolP224t1";
const brainpoolP256r1 = "brainpoolP256r1";
const brainpoolP256t1 = "brainpoolP256t1";
const brainpoolP320r1 = "brainpoolP320r1";
const brainpoolP320t1 = "brainpoolP320t1";
const brainpoolP384r1 = "brainpoolP384r1";
const brainpoolP384t1 = "brainpoolP384t1";
const brainpoolP512r1 = "brainpoolP512r1";
const brainpoolP512t1 = "brainpoolP512t1";
const ECDSA = "ECDSA";
exports.EcAlgorithm = EcAlgorithm_1 = class EcAlgorithm {
    toAsnAlgorithm(alg) {
        switch (alg.name.toLowerCase()) {
            case ECDSA.toLowerCase():
                if ("hash" in alg) {
                    const hash = typeof alg.hash === "string" ? alg.hash : alg.hash.name;
                    switch (hash.toLowerCase()) {
                        case "sha-1":
                            return asn1Ecc__namespace.ecdsaWithSHA1;
                        case "sha-256":
                            return asn1Ecc__namespace.ecdsaWithSHA256;
                        case "sha-384":
                            return asn1Ecc__namespace.ecdsaWithSHA384;
                        case "sha-512":
                            return asn1Ecc__namespace.ecdsaWithSHA512;
                    }
                }
                else if ("namedCurve" in alg) {
                    let parameters = "";
                    switch (alg.namedCurve) {
                        case "P-256":
                            parameters = asn1Ecc__namespace.id_secp256r1;
                            break;
                        case "K-256":
                            parameters = EcAlgorithm_1.SECP256K1;
                            break;
                        case "P-384":
                            parameters = asn1Ecc__namespace.id_secp384r1;
                            break;
                        case "P-521":
                            parameters = asn1Ecc__namespace.id_secp521r1;
                            break;
                        case brainpoolP160r1:
                            parameters = idBrainpoolP160r1;
                            break;
                        case brainpoolP160t1:
                            parameters = idBrainpoolP160t1;
                            break;
                        case brainpoolP192r1:
                            parameters = idBrainpoolP192r1;
                            break;
                        case brainpoolP192t1:
                            parameters = idBrainpoolP192t1;
                            break;
                        case brainpoolP224r1:
                            parameters = idBrainpoolP224r1;
                            break;
                        case brainpoolP224t1:
                            parameters = idBrainpoolP224t1;
                            break;
                        case brainpoolP256r1:
                            parameters = idBrainpoolP256r1;
                            break;
                        case brainpoolP256t1:
                            parameters = idBrainpoolP256t1;
                            break;
                        case brainpoolP320r1:
                            parameters = idBrainpoolP320r1;
                            break;
                        case brainpoolP320t1:
                            parameters = idBrainpoolP320t1;
                            break;
                        case brainpoolP384r1:
                            parameters = idBrainpoolP384r1;
                            break;
                        case brainpoolP384t1:
                            parameters = idBrainpoolP384t1;
                            break;
                        case brainpoolP512r1:
                            parameters = idBrainpoolP512r1;
                            break;
                        case brainpoolP512t1:
                            parameters = idBrainpoolP512t1;
                            break;
                    }
                    if (parameters) {
                        return new asn1X509.AlgorithmIdentifier({
                            algorithm: asn1Ecc__namespace.id_ecPublicKey,
                            parameters: asn1Schema.AsnConvert.serialize(new asn1Ecc__namespace.ECParameters({ namedCurve: parameters })),
                        });
                    }
                }
        }
        return null;
    }
    toWebAlgorithm(alg) {
        switch (alg.algorithm) {
            case asn1Ecc__namespace.id_ecdsaWithSHA1:
                return { name: ECDSA, hash: { name: "SHA-1" } };
            case asn1Ecc__namespace.id_ecdsaWithSHA256:
                return { name: ECDSA, hash: { name: "SHA-256" } };
            case asn1Ecc__namespace.id_ecdsaWithSHA384:
                return { name: ECDSA, hash: { name: "SHA-384" } };
            case asn1Ecc__namespace.id_ecdsaWithSHA512:
                return { name: ECDSA, hash: { name: "SHA-512" } };
            case asn1Ecc__namespace.id_ecPublicKey: {
                if (!alg.parameters) {
                    throw new TypeError("Cannot get required parameters from EC algorithm");
                }
                const parameters = asn1Schema.AsnConvert.parse(alg.parameters, asn1Ecc__namespace.ECParameters);
                switch (parameters.namedCurve) {
                    case asn1Ecc__namespace.id_secp256r1:
                        return { name: ECDSA, namedCurve: "P-256" };
                    case EcAlgorithm_1.SECP256K1:
                        return { name: ECDSA, namedCurve: "K-256" };
                    case asn1Ecc__namespace.id_secp384r1:
                        return { name: ECDSA, namedCurve: "P-384" };
                    case asn1Ecc__namespace.id_secp521r1:
                        return { name: ECDSA, namedCurve: "P-521" };
                    case idBrainpoolP160r1:
                        return { name: ECDSA, namedCurve: brainpoolP160r1 };
                    case idBrainpoolP160t1:
                        return { name: ECDSA, namedCurve: brainpoolP160t1 };
                    case idBrainpoolP192r1:
                        return { name: ECDSA, namedCurve: brainpoolP192r1 };
                    case idBrainpoolP192t1:
                        return { name: ECDSA, namedCurve: brainpoolP192t1 };
                    case idBrainpoolP224r1:
                        return { name: ECDSA, namedCurve: brainpoolP224r1 };
                    case idBrainpoolP224t1:
                        return { name: ECDSA, namedCurve: brainpoolP224t1 };
                    case idBrainpoolP256r1:
                        return { name: ECDSA, namedCurve: brainpoolP256r1 };
                    case idBrainpoolP256t1:
                        return { name: ECDSA, namedCurve: brainpoolP256t1 };
                    case idBrainpoolP320r1:
                        return { name: ECDSA, namedCurve: brainpoolP320r1 };
                    case idBrainpoolP320t1:
                        return { name: ECDSA, namedCurve: brainpoolP320t1 };
                    case idBrainpoolP384r1:
                        return { name: ECDSA, namedCurve: brainpoolP384r1 };
                    case idBrainpoolP384t1:
                        return { name: ECDSA, namedCurve: brainpoolP384t1 };
                    case idBrainpoolP512r1:
                        return { name: ECDSA, namedCurve: brainpoolP512r1 };
                    case idBrainpoolP512t1:
                        return { name: ECDSA, namedCurve: brainpoolP512t1 };
                }
            }
        }
        return null;
    }
};
exports.EcAlgorithm.SECP256K1 = "1.3.132.0.10";
exports.EcAlgorithm = EcAlgorithm_1 = tslib.__decorate([
    tsyringe.injectable()
], exports.EcAlgorithm);
tsyringe.container.registerSingleton(diAlgorithm, exports.EcAlgorithm);

const NAME = Symbol("name");
const VALUE = Symbol("value");
class TextObject {
    constructor(name, items = {}, value = "") {
        this[NAME] = name;
        this[VALUE] = value;
        for (const key in items) {
            this[key] = items[key];
        }
    }
}
TextObject.NAME = NAME;
TextObject.VALUE = VALUE;
class DefaultAlgorithmSerializer {
    static toTextObject(alg) {
        const obj = new TextObject("Algorithm Identifier", {}, OidSerializer.toString(alg.algorithm));
        if (alg.parameters) {
            switch (alg.algorithm) {
                case asn1Ecc__namespace.id_ecPublicKey: {
                    const ecAlg = new exports.EcAlgorithm().toWebAlgorithm(alg);
                    if (ecAlg && "namedCurve" in ecAlg) {
                        obj["Named Curve"] = ecAlg.namedCurve;
                    }
                    else {
                        obj["Parameters"] = alg.parameters;
                    }
                    break;
                }
                default:
                    obj["Parameters"] = alg.parameters;
            }
        }
        return obj;
    }
}
class OidSerializer {
    static toString(oid) {
        const name = this.items[oid];
        if (name) {
            return name;
        }
        return oid;
    }
}
OidSerializer.items = {
    [asn1Rsa__namespace.id_sha1]: "sha1",
    [asn1Rsa__namespace.id_sha224]: "sha224",
    [asn1Rsa__namespace.id_sha256]: "sha256",
    [asn1Rsa__namespace.id_sha384]: "sha384",
    [asn1Rsa__namespace.id_sha512]: "sha512",
    [asn1Rsa__namespace.id_rsaEncryption]: "rsaEncryption",
    [asn1Rsa__namespace.id_sha1WithRSAEncryption]: "sha1WithRSAEncryption",
    [asn1Rsa__namespace.id_sha224WithRSAEncryption]: "sha224WithRSAEncryption",
    [asn1Rsa__namespace.id_sha256WithRSAEncryption]: "sha256WithRSAEncryption",
    [asn1Rsa__namespace.id_sha384WithRSAEncryption]: "sha384WithRSAEncryption",
    [asn1Rsa__namespace.id_sha512WithRSAEncryption]: "sha512WithRSAEncryption",
    [asn1Ecc__namespace.id_ecPublicKey]: "ecPublicKey",
    [asn1Ecc__namespace.id_ecdsaWithSHA1]: "ecdsaWithSHA1",
    [asn1Ecc__namespace.id_ecdsaWithSHA224]: "ecdsaWithSHA224",
    [asn1Ecc__namespace.id_ecdsaWithSHA256]: "ecdsaWithSHA256",
    [asn1Ecc__namespace.id_ecdsaWithSHA384]: "ecdsaWithSHA384",
    [asn1Ecc__namespace.id_ecdsaWithSHA512]: "ecdsaWithSHA512",
    [asn1X509__namespace.id_kp_serverAuth]: "TLS WWW server authentication",
    [asn1X509__namespace.id_kp_clientAuth]: "TLS WWW client authentication",
    [asn1X509__namespace.id_kp_codeSigning]: "Code Signing",
    [asn1X509__namespace.id_kp_emailProtection]: "E-mail Protection",
    [asn1X509__namespace.id_kp_timeStamping]: "Time Stamping",
    [asn1X509__namespace.id_kp_OCSPSigning]: "OCSP Signing",
    [asn1Cms__namespace.id_signedData]: "Signed Data",
};
class TextConverter {
    static serialize(obj) {
        return this.serializeObj(obj).join("\n");
    }
    static pad(deep = 0) {
        return "".padStart(2 * deep, " ");
    }
    static serializeObj(obj, deep = 0) {
        const res = [];
        let pad = this.pad(deep++);
        let value = "";
        const objValue = obj[TextObject.VALUE];
        if (objValue) {
            value = ` ${objValue}`;
        }
        res.push(`${pad}${obj[TextObject.NAME]}:${value}`);
        pad = this.pad(deep);
        for (const key in obj) {
            if (typeof key === "symbol") {
                continue;
            }
            const value = obj[key];
            const keyValue = key ? `${key}: ` : "";
            if (typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "boolean") {
                res.push(`${pad}${keyValue}${value}`);
            }
            else if (value instanceof Date) {
                res.push(`${pad}${keyValue}${value.toUTCString()}`);
            }
            else if (Array.isArray(value)) {
                for (const obj of value) {
                    obj[TextObject.NAME] = key;
                    res.push(...this.serializeObj(obj, deep));
                }
            }
            else if (value instanceof TextObject) {
                value[TextObject.NAME] = key;
                res.push(...this.serializeObj(value, deep));
            }
            else if (pvtsutils.BufferSourceConverter.isBufferSource(value)) {
                if (key) {
                    res.push(`${pad}${keyValue}`);
                    res.push(...this.serializeBufferSource(value, deep + 1));
                }
                else {
                    res.push(...this.serializeBufferSource(value, deep));
                }
            }
            else if ("toTextObject" in value) {
                const obj = value.toTextObject();
                obj[TextObject.NAME] = key;
                res.push(...this.serializeObj(obj, deep));
            }
            else {
                throw new TypeError("Cannot serialize data in text format. Unsupported type.");
            }
        }
        return res;
    }
    static serializeBufferSource(buffer, deep = 0) {
        const pad = this.pad(deep);
        const view = pvtsutils.BufferSourceConverter.toUint8Array(buffer);
        const res = [];
        for (let i = 0; i < view.length;) {
            const row = [];
            for (let j = 0; j < 16 && i < view.length; j++) {
                if (j === 8) {
                    row.push("");
                }
                const hex = view[i++].toString(16).padStart(2, "0");
                row.push(hex);
            }
            res.push(`${pad}${row.join(" ")}`);
        }
        return res;
    }
    static serializeAlgorithm(alg) {
        return this.algorithmSerializer.toTextObject(alg);
    }
}
TextConverter.oidSerializer = OidSerializer;
TextConverter.algorithmSerializer = DefaultAlgorithmSerializer;

class AsnData {
    constructor(...args) {
        if (args.length === 1) {
            const asn = args[0];
            this.rawData = asn1Schema.AsnConvert.serialize(asn);
            this.onInit(asn);
        }
        else {
            const asn = asn1Schema.AsnConvert.parse(args[0], args[1]);
            this.rawData = pvtsutils.BufferSourceConverter.toArrayBuffer(args[0]);
            this.onInit(asn);
        }
    }
    equal(data) {
        if (data instanceof AsnData) {
            return pvtsutils.isEqual(data.rawData, this.rawData);
        }
        return false;
    }
    toString(format = "text") {
        switch (format) {
            case "asn":
                return asn1Schema.AsnConvert.toString(this.rawData);
            case "text":
                return TextConverter.serialize(this.toTextObject());
            case "hex":
                return pvtsutils.Convert.ToHex(this.rawData);
            case "base64":
                return pvtsutils.Convert.ToBase64(this.rawData);
            case "base64url":
                return pvtsutils.Convert.ToBase64Url(this.rawData);
            default:
                throw TypeError("Argument 'format' is unsupported value");
        }
    }
    getTextName() {
        const constructor = this.constructor;
        return constructor.NAME;
    }
    toTextObject() {
        const obj = this.toTextObjectEmpty();
        obj[""] = this.rawData;
        return obj;
    }
    toTextObjectEmpty(value) {
        return new TextObject(this.getTextName(), {}, value);
    }
}
AsnData.NAME = "ASN";

class Extension extends AsnData {
    constructor(...args) {
        let raw;
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            raw = pvtsutils.BufferSourceConverter.toArrayBuffer(args[0]);
        }
        else {
            raw = asn1Schema.AsnConvert.serialize(new asn1X509.Extension({
                extnID: args[0],
                critical: args[1],
                extnValue: new asn1Schema.OctetString(pvtsutils.BufferSourceConverter.toArrayBuffer(args[2])),
            }));
        }
        super(raw, asn1X509.Extension);
    }
    onInit(asn) {
        this.type = asn.extnID;
        this.critical = asn.critical;
        this.value = asn.extnValue.buffer;
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        obj[""] = this.value;
        return obj;
    }
    toTextObjectWithoutValue() {
        const obj = this.toTextObjectEmpty(this.critical ? "critical" : undefined);
        if (obj[TextObject.NAME] === Extension.NAME) {
            obj[TextObject.NAME] = OidSerializer.toString(this.type);
        }
        return obj;
    }
}

var _a;
class CryptoProvider {
    static isCryptoKeyPair(data) {
        return data && data.privateKey && data.publicKey;
    }
    static isCryptoKey(data) {
        return data && data.usages && data.type && data.algorithm && data.extractable !== undefined;
    }
    constructor() {
        this.items = new Map();
        this[_a] = "CryptoProvider";
        if (typeof self !== "undefined" && typeof crypto !== "undefined") {
            this.set(CryptoProvider.DEFAULT, crypto);
        }
    }
    clear() {
        this.items.clear();
    }
    delete(key) {
        return this.items.delete(key);
    }
    forEach(callbackfn, thisArg) {
        return this.items.forEach(callbackfn, thisArg);
    }
    has(key) {
        return this.items.has(key);
    }
    get size() {
        return this.items.size;
    }
    entries() {
        return this.items.entries();
    }
    keys() {
        return this.items.keys();
    }
    values() {
        return this.items.values();
    }
    [Symbol.iterator]() {
        return this.items[Symbol.iterator]();
    }
    get(key = CryptoProvider.DEFAULT) {
        const crypto = this.items.get(key.toLowerCase());
        if (!crypto) {
            throw new Error(`Cannot get Crypto by name '${key}'`);
        }
        return crypto;
    }
    set(key, value) {
        if (typeof key === "string") {
            if (!value) {
                throw new TypeError("Argument 'value' is required");
            }
            this.items.set(key.toLowerCase(), value);
        }
        else {
            this.items.set(CryptoProvider.DEFAULT, key);
        }
        return this;
    }
}
_a = Symbol.toStringTag;
CryptoProvider.DEFAULT = "default";
const cryptoProvider = new CryptoProvider();

const OID_REGEX = /^[0-2](?:\.[1-9][0-9]*)+$/;
function isOID(id) {
    return new RegExp(OID_REGEX).test(id);
}
class NameIdentifier {
    constructor(names = {}) {
        this.items = {};
        for (const id in names) {
            this.register(id, names[id]);
        }
    }
    get(idOrName) {
        return this.items[idOrName] || null;
    }
    findId(idOrName) {
        if (!isOID(idOrName)) {
            return this.get(idOrName);
        }
        return idOrName;
    }
    register(id, name) {
        this.items[id] = name;
        this.items[name] = id;
    }
}
const names = new NameIdentifier();
names.register("CN", "2.5.4.3");
names.register("L", "2.5.4.7");
names.register("ST", "2.5.4.8");
names.register("O", "2.5.4.10");
names.register("OU", "2.5.4.11");
names.register("C", "2.5.4.6");
names.register("DC", "0.9.2342.19200300.100.1.25");
names.register("E", "1.2.840.113549.1.9.1");
names.register("G", "2.5.4.42");
names.register("I", "2.5.4.43");
names.register("SN", "2.5.4.4");
names.register("T", "2.5.4.12");
names.register("serialNumber", "2.5.4.5");

function replaceUnknownCharacter(text, char) {
    return `\\${pvtsutils.Convert.ToHex(pvtsutils.Convert.FromUtf8String(char)).toUpperCase()}`;
}
function escape(data) {
    return data
        .replace(/([,+"\\<>;])/g, "\\$1")
        .replace(/^([ #])/, "\\$1")
        .replace(/([ ]$)/, "\\$1")
        .replace(/([\r\n\t])/, replaceUnknownCharacter);
}
class Name {
    static isASCII(text) {
        for (let i = 0; i < text.length; i++) {
            const code = text.charCodeAt(i);
            if (code > 0xFF) {
                return false;
            }
        }
        return true;
    }
    constructor(data, extraNames = {}) {
        this.extraNames = new NameIdentifier();
        this.asn = new asn1X509.Name();
        for (const key in extraNames) {
            if (Object.prototype.hasOwnProperty.call(extraNames, key)) {
                const value = extraNames[key];
                this.extraNames.register(key, value);
            }
        }
        if (typeof data === "string") {
            this.asn = this.fromString(data);
        }
        else if (data instanceof asn1X509.Name) {
            this.asn = data;
        }
        else if (pvtsutils.BufferSourceConverter.isBufferSource(data)) {
            this.asn = asn1Schema.AsnConvert.parse(data, asn1X509.Name);
        }
        else {
            this.asn = this.fromJSON(data);
        }
    }
    getField(idOrName) {
        const id = this.extraNames.findId(idOrName) || names.findId(idOrName);
        const res = [];
        for (const name of this.asn) {
            for (const rdn of name) {
                if (rdn.type === id) {
                    res.push(rdn.value.toString());
                }
            }
        }
        return res;
    }
    getName(idOrName) {
        return this.extraNames.get(idOrName) || names.get(idOrName);
    }
    toString() {
        return this.asn.map(rdn => rdn.map(o => {
            const type = this.getName(o.type) || o.type;
            const value = o.value.anyValue
                ? `#${pvtsutils.Convert.ToHex(o.value.anyValue)}`
                : escape(o.value.toString());
            return `${type}=${value}`;
        })
            .join("+"))
            .join(", ");
    }
    toJSON() {
        var _a;
        const json = [];
        for (const rdn of this.asn) {
            const jsonItem = {};
            for (const attr of rdn) {
                const type = this.getName(attr.type) || attr.type;
                (_a = jsonItem[type]) !== null && _a !== void 0 ? _a : (jsonItem[type] = []);
                jsonItem[type].push(attr.value.anyValue ? `#${pvtsutils.Convert.ToHex(attr.value.anyValue)}` : attr.value.toString());
            }
            json.push(jsonItem);
        }
        return json;
    }
    fromString(data) {
        const asn = new asn1X509.Name();
        const regex = /(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g;
        let matches = null;
        let level = ",";
        while (matches = regex.exec(`${data},`)) {
            let [, type, value] = matches;

            const lastChar = value[value.length - 1];
            if (lastChar === "," || lastChar === "+") {
                value = value.slice(0, value.length - 1);
                matches[3] = lastChar;
            }
            const next = matches[3];
            if (!/[\d.]+/.test(type)) {
                type = this.getName(type) || "";
            }
            if (!type) {
                throw new Error(`Cannot get OID for name type '${type}'`);
            }
            const attr = new asn1X509.AttributeTypeAndValue({ type });
            if (value.charAt(0) === "#") {
                attr.value.anyValue = pvtsutils.Convert.FromHex(value.slice(1));
            }
            else {
                const quotedMatches = /"(.*?[^\\])?"/.exec(value);
                if (quotedMatches) {
                    value = quotedMatches[1];
                }
                value = value
                    .replace(/\\0a/ig, "\n")
                    .replace(/\\0d/ig, "\r")
                    .replace(/\\0g/ig, "\t")
                    .replace(/\\(.)/g, "$1");
                if (type === this.getName("E") || type === this.getName("DC")) {
                    attr.value.ia5String = value;
                }
                else {
                    if (Name.isASCII(value)) {
                        attr.value.printableString = value;
                    }
                    else {
                        attr.value.utf8String = value;
                    }
                }
            }
            if (level === "+") {
                asn[asn.length - 1].push(attr);
            }
            else {
                asn.push(new asn1X509.RelativeDistinguishedName([attr]));
            }
            level = next;
        }
        return asn;
    }
    fromJSON(data) {
        const asn = new asn1X509.Name();
        for (const item of data) {
            const asnRdn = new asn1X509.RelativeDistinguishedName();
            for (const type in item) {
                let typeId = type;
                if (!/[\d.]+/.test(type)) {
                    typeId = this.getName(type) || "";
                }
                if (!typeId) {
                    throw new Error(`Cannot get OID for name type '${type}'`);
                }
                const values = item[type];
                for (const value of values) {
                    const asnAttr = new asn1X509.AttributeTypeAndValue({ type: typeId });
                    if (typeof value === "object") {
                        for (const key in value) {
                            switch (key) {
                                case "ia5String":
                                    asnAttr.value.ia5String = value[key];
                                    break;
                                case "utf8String":
                                    asnAttr.value.utf8String = value[key];
                                    break;
                                case "universalString":
                                    asnAttr.value.universalString = value[key];
                                    break;
                                case "bmpString":
                                    asnAttr.value.bmpString = value[key];
                                    break;
                                case "printableString":
                                    asnAttr.value.printableString = value[key];
                                    break;
                            }
                        }
                    }
                    else if (value[0] === "#") {
                        asnAttr.value.anyValue = pvtsutils.Convert.FromHex(value.slice(1));
                    }
                    else {
                        if (typeId === this.getName("E") || typeId === this.getName("DC")) {
                            asnAttr.value.ia5String = value;
                        }
                        else {
                            asnAttr.value.printableString = value;
                        }
                    }
                    asnRdn.push(asnAttr);
                }
            }
            asn.push(asnRdn);
        }
        return asn;
    }
    toArrayBuffer() {
        return asn1Schema.AsnConvert.serialize(this.asn);
    }
    async getThumbprint(...args) {
        var _a;
        let crypto;
        let algorithm = "SHA-1";
        if (args.length >= 1 && !((_a = args[0]) === null || _a === void 0 ? void 0 : _a.subtle)) {
            algorithm = args[0] || algorithm;
            crypto = args[1] || cryptoProvider.get();
        }
        else {
            crypto = args[0] || cryptoProvider.get();
        }
        return await crypto.subtle.digest(algorithm, this.toArrayBuffer());
    }
}

const ERR_GN_CONSTRUCTOR = "Cannot initialize GeneralName from ASN.1 data.";
const ERR_GN_STRING_FORMAT = `${ERR_GN_CONSTRUCTOR} Unsupported string format in use.`;
const ERR_GUID = `${ERR_GN_CONSTRUCTOR} Value doesn't match to GUID regular expression.`;
const GUID_REGEX = /^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i;
const id_GUID = "1.3.6.1.4.1.311.25.1";
const id_UPN = "1.3.6.1.4.1.311.20.2.3";
const DNS = "dns";
const DN = "dn";
const EMAIL = "email";
const IP = "ip";
const URL = "url";
const GUID = "guid";
const UPN = "upn";
const REGISTERED_ID = "id";
class GeneralName extends AsnData {
    constructor(...args) {
        let name;
        if (args.length === 2) {
            switch (args[0]) {
                case DN: {
                    const derName = new Name(args[1]).toArrayBuffer();
                    const asnName = asn1Schema.AsnConvert.parse(derName, asn1X509__namespace.Name);
                    name = new asn1X509__namespace.GeneralName({ directoryName: asnName });
                    break;
                }
                case DNS:
                    name = new asn1X509__namespace.GeneralName({ dNSName: args[1] });
                    break;
                case EMAIL:
                    name = new asn1X509__namespace.GeneralName({ rfc822Name: args[1] });
                    break;
                case GUID: {
                    const matches = new RegExp(GUID_REGEX, "i").exec(args[1]);
                    if (!matches) {
                        throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");
                    }
                    const hex = matches
                        .slice(1)
                        .map((o, i) => {
                        if (i < 3) {
                            return pvtsutils.Convert.ToHex(new Uint8Array(pvtsutils.Convert.FromHex(o)).reverse());
                        }
                        return o;
                    })
                        .join("");
                    name = new asn1X509__namespace.GeneralName({
                        otherName: new asn1X509__namespace.OtherName({
                            typeId: id_GUID,
                            value: asn1Schema.AsnConvert.serialize(new asn1Schema.OctetString(pvtsutils.Convert.FromHex(hex))),
                        }),
                    });
                    break;
                }
                case IP:
                    name = new asn1X509__namespace.GeneralName({ iPAddress: args[1] });
                    break;
                case REGISTERED_ID:
                    name = new asn1X509__namespace.GeneralName({ registeredID: args[1] });
                    break;
                case UPN: {
                    name = new asn1X509__namespace.GeneralName({
                        otherName: new asn1X509__namespace.OtherName({
                            typeId: id_UPN,
                            value: asn1Schema.AsnConvert.serialize(asn1Schema.AsnUtf8StringConverter.toASN(args[1])),
                        })
                    });
                    break;
                }
                case URL:
                    name = new asn1X509__namespace.GeneralName({ uniformResourceIdentifier: args[1] });
                    break;
                default:
                    throw new Error("Cannot create GeneralName. Unsupported type of the name");
            }
        }
        else if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            name = asn1Schema.AsnConvert.parse(args[0], asn1X509__namespace.GeneralName);
        }
        else {
            name = args[0];
        }
        super(name);
    }
    onInit(asn) {
        if (asn.dNSName != undefined) {
            this.type = DNS;
            this.value = asn.dNSName;
        }
        else if (asn.rfc822Name != undefined) {
            this.type = EMAIL;
            this.value = asn.rfc822Name;
        }
        else if (asn.iPAddress != undefined) {
            this.type = IP;
            this.value = asn.iPAddress;
        }
        else if (asn.uniformResourceIdentifier != undefined) {
            this.type = URL;
            this.value = asn.uniformResourceIdentifier;
        }
        else if (asn.registeredID != undefined) {
            this.type = REGISTERED_ID;
            this.value = asn.registeredID;
        }
        else if (asn.directoryName != undefined) {
            this.type = DN;
            this.value = new Name(asn.directoryName).toString();
        }
        else if (asn.otherName != undefined) {
            if (asn.otherName.typeId === id_GUID) {
                this.type = GUID;
                const guid = asn1Schema.AsnConvert.parse(asn.otherName.value, asn1Schema.OctetString);
                const matches = new RegExp(GUID_REGEX, "i").exec(pvtsutils.Convert.ToHex(guid));
                if (!matches) {
                    throw new Error(ERR_GUID);
                }
                this.value = matches
                    .slice(1)
                    .map((o, i) => {
                    if (i < 3) {
                        return pvtsutils.Convert.ToHex(new Uint8Array(pvtsutils.Convert.FromHex(o)).reverse());
                    }
                    return o;
                })
                    .join("-");
            }
            else if (asn.otherName.typeId === id_UPN) {
                this.type = UPN;
                this.value = asn1Schema.AsnConvert.parse(asn.otherName.value, asn1X509__namespace.DirectoryString).toString();
            }
            else {
                throw new Error(ERR_GN_STRING_FORMAT);
            }
        }
        else {
            throw new Error(ERR_GN_STRING_FORMAT);
        }
    }
    toJSON() {
        return {
            type: this.type,
            value: this.value,
        };
    }
    toTextObject() {
        let type;
        switch (this.type) {
            case DN:
            case DNS:
            case GUID:
            case IP:
            case REGISTERED_ID:
            case UPN:
            case URL:
                type = this.type.toUpperCase();
                break;
            case EMAIL:
                type = "Email";
                break;
            default:
                throw new Error("Unsupported GeneralName type");
        }
        let value = this.value;
        if (this.type === REGISTERED_ID) {
            value = OidSerializer.toString(value);
        }
        return new TextObject(type, undefined, value);
    }
}
class GeneralNames extends AsnData {
    constructor(params) {
        let names;
        if (params instanceof asn1X509__namespace.GeneralNames) {
            names = params;
        }
        else if (Array.isArray(params)) {
            const items = [];
            for (const name of params) {
                if (name instanceof asn1X509__namespace.GeneralName) {
                    items.push(name);
                }
                else {
                    const asnName = asn1Schema.AsnConvert.parse(new GeneralName(name.type, name.value).rawData, asn1X509__namespace.GeneralName);
                    items.push(asnName);
                }
            }
            names = new asn1X509__namespace.GeneralNames(items);
        }
        else if (pvtsutils.BufferSourceConverter.isBufferSource(params)) {
            names = asn1Schema.AsnConvert.parse(params, asn1X509__namespace.GeneralNames);
        }
        else {
            throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");
        }
        super(names);
    }
    onInit(asn) {
        const items = [];
        for (const asnName of asn) {
            let name = null;
            try {
                name = new GeneralName(asnName);
            }
            catch {
                continue;
            }
            items.push(name);
        }
        this.items = items;
    }
    toJSON() {
        return this.items.map(o => o.toJSON());
    }
    toTextObject() {
        const res = super.toTextObjectEmpty();
        for (const name of this.items) {
            const nameObj = name.toTextObject();
            let field = res[nameObj[TextObject.NAME]];
            if (!Array.isArray(field)) {
                field = [];
                res[nameObj[TextObject.NAME]] = field;
            }
            field.push(nameObj);
        }
        return res;
    }
}
GeneralNames.NAME = "GeneralNames";

const rPaddingTag = "-{5}";
const rEolChars = "\\n";
const rNameTag = `[^${rEolChars}]+`;
const rBeginTag = `${rPaddingTag}BEGIN (${rNameTag}(?=${rPaddingTag}))${rPaddingTag}`;
const rEndTag = `${rPaddingTag}END \\1${rPaddingTag}`;
const rEolGroup = "\\n";
const rHeaderKey = `[^:${rEolChars}]+`;
const rHeaderValue = `(?:[^${rEolChars}]+${rEolGroup}(?: +[^${rEolChars}]+${rEolGroup})*)`;
const rBase64Chars = "[a-zA-Z0-9=+/]+";
const rBase64 = `(?:${rBase64Chars}${rEolGroup})+`;
const rPem = `${rBeginTag}${rEolGroup}(?:((?:${rHeaderKey}: ${rHeaderValue})+))?${rEolGroup}?(${rBase64})${rEndTag}`;
class PemConverter {
    static isPem(data) {
        return typeof data === "string"
            && new RegExp(rPem, "g").test(data);
    }
    static decodeWithHeaders(pem) {
        pem = pem.replace(/\r/g, "");
        const pattern = new RegExp(rPem, "g");
        const res = [];
        let matches = null;
        while (matches = pattern.exec(pem)) {
            const base64 = matches[3]
                .replace(new RegExp(`[${rEolChars}]+`, "g"), "");
            const pemStruct = {
                type: matches[1],
                headers: [],
                rawData: pvtsutils.Convert.FromBase64(base64),
            };
            const headersString = matches[2];
            if (headersString) {
                const headers = headersString.split(new RegExp(rEolGroup, "g"));
                let lastHeader = null;
                for (const header of headers) {
                    const [key, value] = header.split(/:(.*)/);
                    if (value === undefined) {
                        if (!lastHeader) {
                            throw new Error("Cannot parse PEM string. Incorrect header value");
                        }
                        lastHeader.value += key.trim();
                    }
                    else {
                        if (lastHeader) {
                            pemStruct.headers.push(lastHeader);
                        }
                        lastHeader = { key, value: value.trim() };
                    }
                }
                if (lastHeader) {
                    pemStruct.headers.push(lastHeader);
                }
            }
            res.push(pemStruct);
        }
        return res;
    }
    static decode(pem) {
        const blocks = this.decodeWithHeaders(pem);
        return blocks.map(o => o.rawData);
    }
    static decodeFirst(pem) {
        const items = this.decode(pem);
        if (!items.length) {
            throw new RangeError("PEM string doesn't contain any objects");
        }
        return items[0];
    }
    static encode(rawData, tag) {
        if (Array.isArray(rawData)) {
            const raws = new Array();
            if (tag) {
                rawData.forEach(element => {
                    if (!pvtsutils.BufferSourceConverter.isBufferSource(element)) {
                        throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");
                    }
                    raws.push(this.encodeStruct({
                        type: tag,
                        rawData: pvtsutils.BufferSourceConverter.toArrayBuffer(element),
                    }));
                });
            }
            else {
                rawData.forEach(element => {
                    if (!("type" in element)) {
                        throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");
                    }
                    raws.push(this.encodeStruct(element));
                });
            }
            return raws.join("\n");
        }
        else {
            if (!tag) {
                throw new Error("Required argument 'tag' is missed");
            }
            return this.encodeStruct({
                type: tag,
                rawData: pvtsutils.BufferSourceConverter.toArrayBuffer(rawData),
            });
        }
    }
    static encodeStruct(pem) {
        var _a;
        const upperCaseType = pem.type.toLocaleUpperCase();
        const res = [];
        res.push(`-----BEGIN ${upperCaseType}-----`);
        if ((_a = pem.headers) === null || _a === void 0 ? void 0 : _a.length) {
            for (const header of pem.headers) {
                res.push(`${header.key}: ${header.value}`);
            }
            res.push("");
        }
        const base64 = pvtsutils.Convert.ToBase64(pem.rawData);
        let sliced;
        let offset = 0;
        const rows = Array();
        while (offset < base64.length) {
            if (base64.length - offset < 64) {
                sliced = base64.substring(offset);
            }
            else {
                sliced = base64.substring(offset, offset + 64);
                offset += 64;
            }
            if (sliced.length !== 0) {
                rows.push(sliced);
                if (sliced.length < 64) {
                    break;
                }
            }
            else {
                break;
            }
        }
        res.push(...rows);
        res.push(`-----END ${upperCaseType}-----`);
        return res.join("\n");
    }
}
PemConverter.CertificateTag = "CERTIFICATE";
PemConverter.CrlTag = "CRL";
PemConverter.CertificateRequestTag = "CERTIFICATE REQUEST";
PemConverter.PublicKeyTag = "PUBLIC KEY";
PemConverter.PrivateKeyTag = "PRIVATE KEY";

class PemData extends AsnData {
    static isAsnEncoded(data) {
        return pvtsutils.BufferSourceConverter.isBufferSource(data) || typeof data === "string";
    }
    static toArrayBuffer(raw) {
        if (typeof raw === "string") {
            if (PemConverter.isPem(raw)) {
                return PemConverter.decode(raw)[0];
            }
            else if (pvtsutils.Convert.isHex(raw)) {
                return pvtsutils.Convert.FromHex(raw);
            }
            else if (pvtsutils.Convert.isBase64(raw)) {
                return pvtsutils.Convert.FromBase64(raw);
            }
            else if (pvtsutils.Convert.isBase64Url(raw)) {
                return pvtsutils.Convert.FromBase64Url(raw);
            }
            else {
                throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url");
            }
        }
        else {
            const stringRaw = pvtsutils.Convert.ToBinary(raw);
            if (PemConverter.isPem(stringRaw)) {
                return PemConverter.decode(stringRaw)[0];
            }
            else if (pvtsutils.Convert.isHex(stringRaw)) {
                return pvtsutils.Convert.FromHex(stringRaw);
            }
            else if (pvtsutils.Convert.isBase64(stringRaw)) {
                return pvtsutils.Convert.FromBase64(stringRaw);
            }
            else if (pvtsutils.Convert.isBase64Url(stringRaw)) {
                return pvtsutils.Convert.FromBase64Url(stringRaw);
            }
            return pvtsutils.BufferSourceConverter.toArrayBuffer(raw);
        }
    }
    constructor(...args) {
        if (PemData.isAsnEncoded(args[0])) {
            super(PemData.toArrayBuffer(args[0]), args[1]);
        }
        else {
            super(args[0]);
        }
    }
    toString(format = "pem") {
        switch (format) {
            case "pem":
                return PemConverter.encode(this.rawData, this.tag);
            default:
                return super.toString(format);
        }
    }
}

class PublicKey extends PemData {
    constructor(param) {
        if (PemData.isAsnEncoded(param)) {
            super(param, asn1X509.SubjectPublicKeyInfo);
        }
        else {
            super(param);
        }
        this.tag = PemConverter.PublicKeyTag;
    }
    async export(...args) {
        let crypto;
        let keyUsages = ["verify"];
        let algorithm = { hash: "SHA-256", ...this.algorithm };
        if (args.length > 1) {
            algorithm = args[0] || algorithm;
            keyUsages = args[1] || keyUsages;
            crypto = args[2] || cryptoProvider.get();
        }
        else {
            crypto = args[0] || cryptoProvider.get();
        }
        return crypto.subtle.importKey("spki", this.rawData, algorithm, true, keyUsages);
    }
    onInit(asn) {
        const algProv = tsyringe.container.resolve(diAlgorithmProvider);
        const algorithm = this.algorithm = algProv.toWebAlgorithm(asn.algorithm);
        switch (asn.algorithm.algorithm) {
            case asn1Rsa.id_rsaEncryption:
                {
                    const rsaPublicKey = asn1Schema.AsnConvert.parse(asn.subjectPublicKey, asn1Rsa.RSAPublicKey);
                    const modulus = pvtsutils.BufferSourceConverter.toUint8Array(rsaPublicKey.modulus);
                    algorithm.publicExponent = pvtsutils.BufferSourceConverter.toUint8Array(rsaPublicKey.publicExponent);
                    algorithm.modulusLength = (!modulus[0] ? modulus.slice(1) : modulus).byteLength << 3;
                    break;
                }
        }
    }
    async getThumbprint(...args) {
        var _a;
        let crypto;
        let algorithm = "SHA-1";
        if (args.length >= 1 && !((_a = args[0]) === null || _a === void 0 ? void 0 : _a.subtle)) {
            algorithm = args[0] || algorithm;
            crypto = args[1] || cryptoProvider.get();
        }
        else {
            crypto = args[0] || cryptoProvider.get();
        }
        return await crypto.subtle.digest(algorithm, this.rawData);
    }
    async getKeyIdentifier(crypto) {
        if (!crypto) {
            crypto = cryptoProvider.get();
        }
        const asn = asn1Schema.AsnConvert.parse(this.rawData, asn1X509.SubjectPublicKeyInfo);
        return await crypto.subtle.digest("SHA-1", asn.subjectPublicKey);
    }
    toTextObject() {
        const obj = this.toTextObjectEmpty();
        const asn = asn1Schema.AsnConvert.parse(this.rawData, asn1X509.SubjectPublicKeyInfo);
        obj["Algorithm"] = TextConverter.serializeAlgorithm(asn.algorithm);
        switch (asn.algorithm.algorithm) {
            case asn1Ecc.id_ecPublicKey:
                obj["EC Point"] = asn.subjectPublicKey;
                break;
            case asn1Rsa.id_rsaEncryption:
            default:
                obj["Raw Data"] = asn.subjectPublicKey;
        }
        return obj;
    }
}

class ExtensionFactory {
    static register(id, type) {
        this.items.set(id, type);
    }
    static create(data) {
        const extension = new Extension(data);
        const Type = this.items.get(extension.type);
        if (Type) {
            return new Type(data);
        }
        return extension;
    }
}
ExtensionFactory.items = new Map();

const diAsnSignatureFormatter = "crypto.signatureFormatter";
class AsnDefaultSignatureFormatter {
    toAsnSignature(algorithm, signature) {
        return pvtsutils.BufferSourceConverter.toArrayBuffer(signature);
    }
    toWebSignature(algorithm, signature) {
        return pvtsutils.BufferSourceConverter.toArrayBuffer(signature);
    }
}

class X509Certificate extends PemData {
    constructor(param) {
        if (PemData.isAsnEncoded(param)) {
            super(param, asn1X509.Certificate);
        }
        else {
            super(param);
        }
        this.tag = PemConverter.CertificateTag;
    }
    onInit(asn) {
        const tbs = asn.tbsCertificate;
        this.tbs = asn1Schema.AsnConvert.serialize(tbs);
        this.serialNumber = pvtsutils.Convert.ToHex(tbs.serialNumber);
        this.subjectName = new Name(tbs.subject);
        this.subject = new Name(tbs.subject).toString();
        this.issuerName = new Name(tbs.issuer);
        this.issuer = this.issuerName.toString();
        const algProv = tsyringe.container.resolve(diAlgorithmProvider);
        this.signatureAlgorithm = algProv.toWebAlgorithm(asn.signatureAlgorithm);
        this.signature = asn.signatureValue;
        const notBefore = tbs.validity.notBefore.utcTime || tbs.validity.notBefore.generalTime;
        if (!notBefore) {
            throw new Error("Cannot get 'notBefore' value");
        }
        this.notBefore = notBefore;
        const notAfter = tbs.validity.notAfter.utcTime || tbs.validity.notAfter.generalTime;
        if (!notAfter) {
            throw new Error("Cannot get 'notAfter' value");
        }
        this.notAfter = notAfter;
        this.extensions = [];
        if (tbs.extensions) {
            this.extensions = tbs.extensions.map(o => ExtensionFactory.create(asn1Schema.AsnConvert.serialize(o)));
        }
        this.publicKey = new PublicKey(tbs.subjectPublicKeyInfo);
    }
    getExtension(type) {
        for (const ext of this.extensions) {
            if (typeof type === "string") {
                if (ext.type === type) {
                    return ext;
                }
            }
            else {
                if (ext instanceof type) {
                    return ext;
                }
            }
        }
        return null;
    }
    getExtensions(type) {
        return this.extensions.filter(o => {
            if (typeof type === "string") {
                return o.type === type;
            }
            else {
                return o instanceof type;
            }
        });
    }
    async verify(params = {}, crypto = cryptoProvider.get()) {
        let keyAlgorithm;
        let publicKey;
        const paramsKey = params.publicKey;
        try {
            if (!paramsKey) {
                keyAlgorithm = { ...this.publicKey.algorithm, ...this.signatureAlgorithm };
                publicKey = await this.publicKey.export(keyAlgorithm, ["verify"], crypto);
            }
            else if ("publicKey" in paramsKey) {
                keyAlgorithm = { ...paramsKey.publicKey.algorithm, ...this.signatureAlgorithm };
                publicKey = await paramsKey.publicKey.export(keyAlgorithm, ["verify"], crypto);
            }
            else if (paramsKey instanceof PublicKey) {
                keyAlgorithm = { ...paramsKey.algorithm, ...this.signatureAlgorithm };
                publicKey = await paramsKey.export(keyAlgorithm, ["verify"], crypto);
            }
            else if (pvtsutils.BufferSourceConverter.isBufferSource(paramsKey)) {
                const key = new PublicKey(paramsKey);
                keyAlgorithm = { ...key.algorithm, ...this.signatureAlgorithm };
                publicKey = await key.export(keyAlgorithm, ["verify"], crypto);
            }
            else {
                keyAlgorithm = { ...paramsKey.algorithm, ...this.signatureAlgorithm };
                publicKey = paramsKey;
            }
        }
        catch (e) {
            return false;
        }
        const signatureFormatters = tsyringe.container.resolveAll(diAsnSignatureFormatter).reverse();
        let signature = null;
        for (const signatureFormatter of signatureFormatters) {
            signature = signatureFormatter.toWebSignature(keyAlgorithm, this.signature);
            if (signature) {
                break;
            }
        }
        if (!signature) {
            throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
        }
        const ok = await crypto.subtle.verify(this.signatureAlgorithm, publicKey, signature, this.tbs);
        if (params.signatureOnly) {
            return ok;
        }
        else {
            const date = params.date || new Date();
            const time = date.getTime();
            return ok && this.notBefore.getTime() < time && time < this.notAfter.getTime();
        }
    }
    async getThumbprint(...args) {
        let crypto;
        let algorithm = "SHA-1";
        if (args[0]) {
            if (!args[0].subtle) {
                algorithm = args[0] || algorithm;
                crypto = args[1];
            }
            else {
                crypto = args[0];
            }
        }
        crypto !== null && crypto !== void 0 ? crypto : (crypto = cryptoProvider.get());
        return await crypto.subtle.digest(algorithm, this.rawData);
    }
    async isSelfSigned(crypto = cryptoProvider.get()) {
        return this.subject === this.issuer && await this.verify({ signatureOnly: true }, crypto);
    }
    toTextObject() {
        const obj = this.toTextObjectEmpty();
        const cert = asn1Schema.AsnConvert.parse(this.rawData, asn1X509.Certificate);
        const tbs = cert.tbsCertificate;
        const data = new TextObject("", {
            "Version": `${asn1X509.Version[tbs.version]} (${tbs.version})`,
            "Serial Number": tbs.serialNumber,
            "Signature Algorithm": TextConverter.serializeAlgorithm(tbs.signature),
            "Issuer": this.issuer,
            "Validity": new TextObject("", {
                "Not Before": tbs.validity.notBefore.getTime(),
                "Not After": tbs.validity.notAfter.getTime(),
            }),
            "Subject": this.subject,
            "Subject Public Key Info": this.publicKey,
        });
        if (tbs.issuerUniqueID) {
            data["Issuer Unique ID"] = tbs.issuerUniqueID;
        }
        if (tbs.subjectUniqueID) {
            data["Subject Unique ID"] = tbs.subjectUniqueID;
        }
        if (this.extensions.length) {
            const extensions = new TextObject("");
            for (const ext of this.extensions) {
                const extObj = ext.toTextObject();
                extensions[extObj[TextObject.NAME]] = extObj;
            }
            data["Extensions"] = extensions;
        }
        obj["Data"] = data;
        obj["Signature"] = new TextObject("", {
            "Algorithm": TextConverter.serializeAlgorithm(cert.signatureAlgorithm),
            "": cert.signatureValue,
        });
        return obj;
    }
}
X509Certificate.NAME = "Certificate";

class AuthorityKeyIdentifierExtension extends Extension {
    static async create(param, critical = false, crypto = cryptoProvider.get()) {
        if (param instanceof X509Certificate || CryptoProvider.isCryptoKey(param)) {
            const publicKey = param instanceof X509Certificate ? await param.publicKey.export(crypto) : param;
            const spki = await crypto.subtle.exportKey("spki", publicKey);
            const key = new PublicKey(spki);
            const id = await key.getKeyIdentifier(crypto);
            return new AuthorityKeyIdentifierExtension(pvtsutils.Convert.ToHex(id), critical);
        }
        else {
            return new AuthorityKeyIdentifierExtension(param, critical);
        }
    }
    constructor(...args) {
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
        }
        else if (typeof args[0] === "string") {
            const value = new asn1X509__namespace.AuthorityKeyIdentifier({ keyIdentifier: new asn1X509__namespace.KeyIdentifier(pvtsutils.Convert.FromHex(args[0])) });
            super(asn1X509__namespace.id_ce_authorityKeyIdentifier, args[1], asn1Schema.AsnConvert.serialize(value));
        }
        else {
            const certId = args[0];
            const certIdName = certId.name instanceof GeneralNames
                ? asn1Schema.AsnConvert.parse(certId.name.rawData, asn1X509__namespace.GeneralNames)
                : certId.name;
            const value = new asn1X509__namespace.AuthorityKeyIdentifier({
                authorityCertIssuer: certIdName,
                authorityCertSerialNumber: pvtsutils.Convert.FromHex(certId.serialNumber),
            });
            super(asn1X509__namespace.id_ce_authorityKeyIdentifier, args[1], asn1Schema.AsnConvert.serialize(value));
        }
    }
    onInit(asn) {
        super.onInit(asn);
        const aki = asn1Schema.AsnConvert.parse(asn.extnValue, asn1X509__namespace.AuthorityKeyIdentifier);
        if (aki.keyIdentifier) {
            this.keyId = pvtsutils.Convert.ToHex(aki.keyIdentifier);
        }
        if (aki.authorityCertIssuer && aki.authorityCertSerialNumber) {
            this.certId = {
                name: aki.authorityCertIssuer,
                serialNumber: pvtsutils.Convert.ToHex(aki.authorityCertSerialNumber),
            };
        }
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        const asn = asn1Schema.AsnConvert.parse(this.value, asn1X509__namespace.AuthorityKeyIdentifier);
        if (asn.authorityCertIssuer) {
            obj["Authority Issuer"] = new GeneralNames(asn.authorityCertIssuer).toTextObject();
        }
        if (asn.authorityCertSerialNumber) {
            obj["Authority Serial Number"] = asn.authorityCertSerialNumber;
        }
        if (asn.keyIdentifier) {
            obj[""] = asn.keyIdentifier;
        }
        return obj;
    }
}
AuthorityKeyIdentifierExtension.NAME = "Authority Key Identifier";

class BasicConstraintsExtension extends Extension {
    constructor(...args) {
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
            const value = asn1Schema.AsnConvert.parse(this.value, asn1X509.BasicConstraints);
            this.ca = value.cA;
            this.pathLength = value.pathLenConstraint;
        }
        else {
            const value = new asn1X509.BasicConstraints({
                cA: args[0],
                pathLenConstraint: args[1],
            });
            super(asn1X509.id_ce_basicConstraints, args[2], asn1Schema.AsnConvert.serialize(value));
            this.ca = args[0];
            this.pathLength = args[1];
        }
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        if (this.ca) {
            obj["CA"] = this.ca;
        }
        if (this.pathLength !== undefined) {
            obj["Path Length"] = this.pathLength;
        }
        return obj;
    }
}
BasicConstraintsExtension.NAME = "Basic Constraints";

exports.ExtendedKeyUsage = void 0;
(function (ExtendedKeyUsage) {
    ExtendedKeyUsage["serverAuth"] = "1.3.6.1.5.5.7.3.1";
    ExtendedKeyUsage["clientAuth"] = "1.3.6.1.5.5.7.3.2";
    ExtendedKeyUsage["codeSigning"] = "1.3.6.1.5.5.7.3.3";
    ExtendedKeyUsage["emailProtection"] = "1.3.6.1.5.5.7.3.4";
    ExtendedKeyUsage["timeStamping"] = "1.3.6.1.5.5.7.3.8";
    ExtendedKeyUsage["ocspSigning"] = "1.3.6.1.5.5.7.3.9";
})(exports.ExtendedKeyUsage || (exports.ExtendedKeyUsage = {}));
class ExtendedKeyUsageExtension extends Extension {
    constructor(...args) {
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
            const value = asn1Schema.AsnConvert.parse(this.value, asn1X509__namespace.ExtendedKeyUsage);
            this.usages = value.map(o => o);
        }
        else {
            const value = new asn1X509__namespace.ExtendedKeyUsage(args[0]);
            super(asn1X509__namespace.id_ce_extKeyUsage, args[1], asn1Schema.AsnConvert.serialize(value));
            this.usages = args[0];
        }
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        obj[""] = this.usages.map(o => OidSerializer.toString(o)).join(", ");
        return obj;
    }
}
ExtendedKeyUsageExtension.NAME = "Extended Key Usages";

exports.KeyUsageFlags = void 0;
(function (KeyUsageFlags) {
    KeyUsageFlags[KeyUsageFlags["digitalSignature"] = 1] = "digitalSignature";
    KeyUsageFlags[KeyUsageFlags["nonRepudiation"] = 2] = "nonRepudiation";
    KeyUsageFlags[KeyUsageFlags["keyEncipherment"] = 4] = "keyEncipherment";
    KeyUsageFlags[KeyUsageFlags["dataEncipherment"] = 8] = "dataEncipherment";
    KeyUsageFlags[KeyUsageFlags["keyAgreement"] = 16] = "keyAgreement";
    KeyUsageFlags[KeyUsageFlags["keyCertSign"] = 32] = "keyCertSign";
    KeyUsageFlags[KeyUsageFlags["cRLSign"] = 64] = "cRLSign";
    KeyUsageFlags[KeyUsageFlags["encipherOnly"] = 128] = "encipherOnly";
    KeyUsageFlags[KeyUsageFlags["decipherOnly"] = 256] = "decipherOnly";
})(exports.KeyUsageFlags || (exports.KeyUsageFlags = {}));
class KeyUsagesExtension extends Extension {
    constructor(...args) {
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
            const value = asn1Schema.AsnConvert.parse(this.value, asn1X509.KeyUsage);
            this.usages = value.toNumber();
        }
        else {
            const value = new asn1X509.KeyUsage(args[0]);
            super(asn1X509.id_ce_keyUsage, args[1], asn1Schema.AsnConvert.serialize(value));
            this.usages = args[0];
        }
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        const asn = asn1Schema.AsnConvert.parse(this.value, asn1X509.KeyUsage);
        obj[""] = asn.toJSON().join(", ");
        return obj;
    }
}
KeyUsagesExtension.NAME = "Key Usages";

class SubjectKeyIdentifierExtension extends Extension {
    static async create(publicKey, critical = false, crypto = cryptoProvider.get()) {
        let spki;
        if (publicKey instanceof PublicKey) {
            spki = publicKey.rawData;
        }
        else if ("publicKey" in publicKey) {
            spki = publicKey.publicKey.rawData;
        }
        else if (pvtsutils.BufferSourceConverter.isBufferSource(publicKey)) {
            spki = publicKey;
        }
        else {
            spki = await crypto.subtle.exportKey("spki", publicKey);
        }
        const key = new PublicKey(spki);
        const id = await key.getKeyIdentifier(crypto);
        return new SubjectKeyIdentifierExtension(pvtsutils.Convert.ToHex(id), critical);
    }
    constructor(...args) {
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
            const value = asn1Schema.AsnConvert.parse(this.value, asn1X509__namespace.SubjectKeyIdentifier);
            this.keyId = pvtsutils.Convert.ToHex(value);
        }
        else {
            const identifier = typeof args[0] === "string"
                ? pvtsutils.Convert.FromHex(args[0])
                : args[0];
            const value = new asn1X509__namespace.SubjectKeyIdentifier(identifier);
            super(asn1X509__namespace.id_ce_subjectKeyIdentifier, args[1], asn1Schema.AsnConvert.serialize(value));
            this.keyId = pvtsutils.Convert.ToHex(identifier);
        }
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        const asn = asn1Schema.AsnConvert.parse(this.value, asn1X509__namespace.SubjectKeyIdentifier);
        obj[""] = asn;
        return obj;
    }
}
SubjectKeyIdentifierExtension.NAME = "Subject Key Identifier";

class SubjectAlternativeNameExtension extends Extension {
    constructor(...args) {
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
        }
        else {
            super(asn1X509__namespace.id_ce_subjectAltName, args[1], new GeneralNames(args[0] || []).rawData);
        }
    }
    onInit(asn) {
        super.onInit(asn);
        const value = asn1Schema.AsnConvert.parse(asn.extnValue, asn1X509__namespace.SubjectAlternativeName);
        this.names = new GeneralNames(value);
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        const namesObj = this.names.toTextObject();
        for (const key in namesObj) {
            obj[key] = namesObj[key];
        }
        return obj;
    }
}
SubjectAlternativeNameExtension.NAME = "Subject Alternative Name";

class CertificatePolicyExtension extends Extension {
    constructor(...args) {
        var _a;
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
            const asnPolicies = asn1Schema.AsnConvert.parse(this.value, asn1X509__namespace.CertificatePolicies);
            this.policies = asnPolicies.map(o => o.policyIdentifier);
        }
        else {
            const policies = args[0];
            const critical = (_a = args[1]) !== null && _a !== void 0 ? _a : false;
            const value = new asn1X509__namespace.CertificatePolicies(policies.map(o => (new asn1X509__namespace.PolicyInformation({
                policyIdentifier: o,
            }))));
            super(asn1X509__namespace.id_ce_certificatePolicies, critical, asn1Schema.AsnConvert.serialize(value));
            this.policies = policies;
        }
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        obj["Policy"] = this.policies.map(o => new TextObject("", {}, OidSerializer.toString(o)));
        return obj;
    }
}
CertificatePolicyExtension.NAME = "Certificate Policies";
ExtensionFactory.register(asn1X509__namespace.id_ce_certificatePolicies, CertificatePolicyExtension);

class Attribute extends AsnData {
    constructor(...args) {
        let raw;
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            raw = pvtsutils.BufferSourceConverter.toArrayBuffer(args[0]);
        }
        else {
            const type = args[0];
            const values = Array.isArray(args[1]) ? args[1].map(o => pvtsutils.BufferSourceConverter.toArrayBuffer(o)) : [];
            raw = asn1Schema.AsnConvert.serialize(new asn1X509.Attribute({ type, values }));
        }
        super(raw, asn1X509.Attribute);
    }
    onInit(asn) {
        this.type = asn.type;
        this.values = asn.values;
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        obj["Value"] = this.values.map(o => new TextObject("", { "": o }));
        return obj;
    }
    toTextObjectWithoutValue() {
        const obj = this.toTextObjectEmpty();
        if (obj[TextObject.NAME] === Attribute.NAME) {
            obj[TextObject.NAME] = OidSerializer.toString(this.type);
        }
        return obj;
    }
}
Attribute.NAME = "Attribute";

class ChallengePasswordAttribute extends Attribute {
    constructor(...args) {
        var _a;
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
        }
        else {
            const value = new asnPkcs9__namespace.ChallengePassword({
                printableString: args[0],
            });
            super(asnPkcs9__namespace.id_pkcs9_at_challengePassword, [asn1Schema.AsnConvert.serialize(value)]);
        }
        (_a = this.password) !== null && _a !== void 0 ? _a : (this.password = "");
    }
    onInit(asn) {
        super.onInit(asn);
        if (this.values[0]) {
            const value = asn1Schema.AsnConvert.parse(this.values[0], asnPkcs9__namespace.ChallengePassword);
            this.password = value.toString();
        }
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        obj[TextObject.VALUE] = this.password;
        return obj;
    }
}
ChallengePasswordAttribute.NAME = "Challenge Password";

class ExtensionsAttribute extends Attribute {
    constructor(...args) {
        var _a;
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            super(args[0]);
        }
        else {
            const extensions = args[0];
            const value = new asn1X509__namespace.Extensions();
            for (const extension of extensions) {
                value.push(asn1Schema.AsnConvert.parse(extension.rawData, asn1X509__namespace.Extension));
            }
            super(asnPkcs9__namespace.id_pkcs9_at_extensionRequest, [asn1Schema.AsnConvert.serialize(value)]);
        }
        (_a = this.items) !== null && _a !== void 0 ? _a : (this.items = []);
    }
    onInit(asn) {
        super.onInit(asn);
        if (this.values[0]) {
            const value = asn1Schema.AsnConvert.parse(this.values[0], asn1X509__namespace.Extensions);
            this.items = value.map(o => ExtensionFactory.create(asn1Schema.AsnConvert.serialize(o)));
        }
    }
    toTextObject() {
        const obj = this.toTextObjectWithoutValue();
        const extensions = this.items.map(o => o.toTextObject());
        for (const extension of extensions) {
            obj[extension[TextObject.NAME]] = extension;
        }
        return obj;
    }
}
ExtensionsAttribute.NAME = "Extensions";

class AttributeFactory {
    static register(id, type) {
        this.items.set(id, type);
    }
    static create(data) {
        const attribute = new Attribute(data);
        const Type = this.items.get(attribute.type);
        if (Type) {
            return new Type(data);
        }
        return attribute;
    }
}
AttributeFactory.items = new Map();

exports.RsaAlgorithm = class RsaAlgorithm {
    toAsnAlgorithm(alg) {
        switch (alg.name.toLowerCase()) {
            case "rsassa-pkcs1-v1_5":
                if (alg.hash) {
                    switch (alg.hash.name.toLowerCase()) {
                        case "sha-1":
                            return new asn1X509.AlgorithmIdentifier({ algorithm: asn1Rsa__namespace.id_sha1WithRSAEncryption, parameters: null });
                        case "sha-256":
                            return new asn1X509.AlgorithmIdentifier({ algorithm: asn1Rsa__namespace.id_sha256WithRSAEncryption, parameters: null });
                        case "sha-384":
                            return new asn1X509.AlgorithmIdentifier({ algorithm: asn1Rsa__namespace.id_sha384WithRSAEncryption, parameters: null });
                        case "sha-512":
                            return new asn1X509.AlgorithmIdentifier({ algorithm: asn1Rsa__namespace.id_sha512WithRSAEncryption, parameters: null });
                    }
                }
                else {
                    return new asn1X509.AlgorithmIdentifier({ algorithm: asn1Rsa__namespace.id_rsaEncryption, parameters: null });
                }
        }
        return null;
    }
    toWebAlgorithm(alg) {
        switch (alg.algorithm) {
            case asn1Rsa__namespace.id_rsaEncryption:
                return { name: "RSASSA-PKCS1-v1_5" };
            case asn1Rsa__namespace.id_sha1WithRSAEncryption:
                return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } };
            case asn1Rsa__namespace.id_sha256WithRSAEncryption:
                return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
            case asn1Rsa__namespace.id_sha384WithRSAEncryption:
                return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } };
            case asn1Rsa__namespace.id_sha512WithRSAEncryption:
                return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } };
        }
        return null;
    }
};
exports.RsaAlgorithm = tslib.__decorate([
    tsyringe.injectable()
], exports.RsaAlgorithm);
tsyringe.container.registerSingleton(diAlgorithm, exports.RsaAlgorithm);

class AsnEcSignatureFormatter {
    addPadding(pointSize, data) {
        const bytes = pvtsutils.BufferSourceConverter.toUint8Array(data);
        const res = new Uint8Array(pointSize);
        res.set(bytes, pointSize - bytes.length);
        return res;
    }
    removePadding(data, positive = false) {
        let bytes = pvtsutils.BufferSourceConverter.toUint8Array(data);
        for (let i = 0; i < bytes.length; i++) {
            if (!bytes[i]) {
                continue;
            }
            bytes = bytes.slice(i);
            break;
        }
        if (positive && bytes[0] > 127) {
            const result = new Uint8Array(bytes.length + 1);
            result.set(bytes, 1);
            return result.buffer;
        }
        return bytes.buffer;
    }
    toAsnSignature(algorithm, signature) {
        if (algorithm.name === "ECDSA") {
            const namedCurve = algorithm.namedCurve;
            const pointSize = AsnEcSignatureFormatter.namedCurveSize.get(namedCurve) || AsnEcSignatureFormatter.defaultNamedCurveSize;
            const ecSignature = new asn1Ecc.ECDSASigValue();
            const uint8Signature = pvtsutils.BufferSourceConverter.toUint8Array(signature);
            ecSignature.r = this.removePadding(uint8Signature.slice(0, pointSize), true);
            ecSignature.s = this.removePadding(uint8Signature.slice(pointSize, pointSize + pointSize), true);
            return asn1Schema.AsnConvert.serialize(ecSignature);
        }
        return null;
    }
    toWebSignature(algorithm, signature) {
        if (algorithm.name === "ECDSA") {
            const ecSigValue = asn1Schema.AsnConvert.parse(signature, asn1Ecc.ECDSASigValue);
            const namedCurve = algorithm.namedCurve;
            const pointSize = AsnEcSignatureFormatter.namedCurveSize.get(namedCurve) || AsnEcSignatureFormatter.defaultNamedCurveSize;
            const r = this.addPadding(pointSize, this.removePadding(ecSigValue.r));
            const s = this.addPadding(pointSize, this.removePadding(ecSigValue.s));
            return pvtsutils.combine(r, s);
        }
        return null;
    }
}
AsnEcSignatureFormatter.namedCurveSize = new Map();
AsnEcSignatureFormatter.defaultNamedCurveSize = 32;

const idX25519 = "1.3.101.110";
const idX448 = "1.3.101.111";
const idEd25519 = "1.3.101.112";
const idEd448 = "1.3.101.113";
exports.EdAlgorithm = class EdAlgorithm {
    toAsnAlgorithm(alg) {
        let algorithm = null;
        switch (alg.name.toLowerCase()) {
            case "eddsa":
                switch (alg.namedCurve.toLowerCase()) {
                    case "ed25519":
                        algorithm = idEd25519;
                        break;
                    case "ed448":
                        algorithm = idEd448;
                        break;
                }
                break;
            case "ecdh-es":
                switch (alg.namedCurve.toLowerCase()) {
                    case "x25519":
                        algorithm = idX25519;
                        break;
                    case "x448":
                        algorithm = idX448;
                        break;
                }
        }
        if (algorithm) {
            return new asn1X509.AlgorithmIdentifier({
                algorithm,
            });
        }
        return null;
    }
    toWebAlgorithm(alg) {
        switch (alg.algorithm) {
            case idEd25519:
                return { name: "EdDSA", namedCurve: "Ed25519" };
            case idEd448:
                return { name: "EdDSA", namedCurve: "Ed448" };
            case idX25519:
                return { name: "ECDH-ES", namedCurve: "X25519" };
            case idX448:
                return { name: "ECDH-ES", namedCurve: "X448" };
        }
        return null;
    }
};
exports.EdAlgorithm = tslib.__decorate([
    tsyringe.injectable()
], exports.EdAlgorithm);
tsyringe.container.registerSingleton(diAlgorithm, exports.EdAlgorithm);

class Pkcs10CertificateRequest extends PemData {
    constructor(param) {
        if (PemData.isAsnEncoded(param)) {
            super(param, asn1Csr.CertificationRequest);
        }
        else {
            super(param);
        }
        this.tag = PemConverter.CertificateRequestTag;
    }
    onInit(asn) {
        this.tbs = asn1Schema.AsnConvert.serialize(asn.certificationRequestInfo);
        this.publicKey = new PublicKey(asn.certificationRequestInfo.subjectPKInfo);
        const algProv = tsyringe.container.resolve(diAlgorithmProvider);
        this.signatureAlgorithm = algProv.toWebAlgorithm(asn.signatureAlgorithm);
        this.signature = asn.signature;
        this.attributes = asn.certificationRequestInfo.attributes
            .map(o => AttributeFactory.create(asn1Schema.AsnConvert.serialize(o)));
        const extensions = this.getAttribute(asnPkcs9.id_pkcs9_at_extensionRequest);
        this.extensions = [];
        if (extensions instanceof ExtensionsAttribute) {
            this.extensions = extensions.items;
        }
        this.subjectName = new Name(asn.certificationRequestInfo.subject);
        this.subject = this.subjectName.toString();
    }
    getAttribute(type) {
        for (const attr of this.attributes) {
            if (attr.type === type) {
                return attr;
            }
        }
        return null;
    }
    getAttributes(type) {
        return this.attributes.filter(o => o.type === type);
    }
    getExtension(type) {
        for (const ext of this.extensions) {
            if (ext.type === type) {
                return ext;
            }
        }
        return null;
    }
    getExtensions(type) {
        return this.extensions.filter(o => o.type === type);
    }
    async verify(crypto = cryptoProvider.get()) {
        const algorithm = { ...this.publicKey.algorithm, ...this.signatureAlgorithm };
        const publicKey = await this.publicKey.export(algorithm, ["verify"], crypto);
        const signatureFormatters = tsyringe.container.resolveAll(diAsnSignatureFormatter).reverse();
        let signature = null;
        for (const signatureFormatter of signatureFormatters) {
            signature = signatureFormatter.toWebSignature(algorithm, this.signature);
            if (signature) {
                break;
            }
        }
        if (!signature) {
            throw Error("Cannot convert WebCrypto signature value to ASN.1 format");
        }
        const ok = await crypto.subtle.verify(this.signatureAlgorithm, publicKey, signature, this.tbs);
        return ok;
    }
    toTextObject() {
        const obj = this.toTextObjectEmpty();
        const req = asn1Schema.AsnConvert.parse(this.rawData, asn1Csr.CertificationRequest);
        const tbs = req.certificationRequestInfo;
        const data = new TextObject("", {
            "Version": `${asn1X509.Version[tbs.version]} (${tbs.version})`,
            "Subject": this.subject,
            "Subject Public Key Info": this.publicKey,
        });
        if (this.attributes.length) {
            const attrs = new TextObject("");
            for (const ext of this.attributes) {
                const attrObj = ext.toTextObject();
                attrs[attrObj[TextObject.NAME]] = attrObj;
            }
            data["Attributes"] = attrs;
        }
        obj["Data"] = data;
        obj["Signature"] = new TextObject("", {
            "Algorithm": TextConverter.serializeAlgorithm(req.signatureAlgorithm),
            "": req.signature,
        });
        return obj;
    }
}
Pkcs10CertificateRequest.NAME = "PKCS#10 Certificate Request";

class Pkcs10CertificateRequestGenerator {
    static async create(params, crypto = cryptoProvider.get()) {
        if (!params.keys.privateKey) {
            throw new Error("Bad field 'keys' in 'params' argument. 'privateKey' is empty");
        }
        if (!params.keys.publicKey) {
            throw new Error("Bad field 'keys' in 'params' argument. 'publicKey' is empty");
        }
        const spki = await crypto.subtle.exportKey("spki", params.keys.publicKey);
        const asnReq = new asn1Csr.CertificationRequest({
            certificationRequestInfo: new asn1Csr.CertificationRequestInfo({
                subjectPKInfo: asn1Schema.AsnConvert.parse(spki, asn1X509.SubjectPublicKeyInfo),
            }),
        });
        if (params.name) {
            const name = params.name instanceof Name
                ? params.name
                : new Name(params.name);
            asnReq.certificationRequestInfo.subject = asn1Schema.AsnConvert.parse(name.toArrayBuffer(), asn1X509.Name);
        }
        if (params.attributes) {
            for (const o of params.attributes) {
                asnReq.certificationRequestInfo.attributes.push(asn1Schema.AsnConvert.parse(o.rawData, asn1X509.Attribute));
            }
        }
        if (params.extensions && params.extensions.length) {
            const attr = new asn1X509.Attribute({ type: asnPkcs9.id_pkcs9_at_extensionRequest });
            const extensions = new asn1X509.Extensions();
            for (const o of params.extensions) {
                extensions.push(asn1Schema.AsnConvert.parse(o.rawData, asn1X509.Extension));
            }
            attr.values.push(asn1Schema.AsnConvert.serialize(extensions));
            asnReq.certificationRequestInfo.attributes.push(attr);
        }
        const signingAlgorithm = { ...params.signingAlgorithm, ...params.keys.privateKey.algorithm };
        const algProv = tsyringe.container.resolve(diAlgorithmProvider);
        asnReq.signatureAlgorithm = algProv.toAsnAlgorithm(signingAlgorithm);
        const tbs = asn1Schema.AsnConvert.serialize(asnReq.certificationRequestInfo);
        const signature = await crypto.subtle.sign(signingAlgorithm, params.keys.privateKey, tbs);
        const signatureFormatters = tsyringe.container.resolveAll(diAsnSignatureFormatter).reverse();
        let asnSignature = null;
        for (const signatureFormatter of signatureFormatters) {
            asnSignature = signatureFormatter.toAsnSignature(signingAlgorithm, signature);
            if (asnSignature) {
                break;
            }
        }
        if (!asnSignature) {
            throw Error("Cannot convert WebCrypto signature value to ASN.1 format");
        }
        asnReq.signature = asnSignature;
        return new Pkcs10CertificateRequest(asn1Schema.AsnConvert.serialize(asnReq));
    }
}

class X509Certificates extends Array {
    constructor(param) {
        super();
        if (PemData.isAsnEncoded(param)) {
            this.import(param);
        }
        else if (param instanceof X509Certificate) {
            this.push(param);
        }
        else if (Array.isArray(param)) {
            for (const item of param) {
                this.push(item);
            }
        }
    }
    export(format) {
        const signedData = new asn1Cms__namespace.SignedData();
        signedData.version = 1;
        signedData.encapContentInfo.eContentType = asn1Cms__namespace.id_data;
        signedData.encapContentInfo.eContent = new asn1Cms__namespace.EncapsulatedContent({
            single: new asn1Schema.OctetString(),
        });
        signedData.certificates = new asn1Cms__namespace.CertificateSet(this.map(o => new asn1Cms__namespace.CertificateChoices({
            certificate: asn1Schema.AsnConvert.parse(o.rawData, asn1X509.Certificate)
        })));
        const cms = new asn1Cms__namespace.ContentInfo({
            contentType: asn1Cms__namespace.id_signedData,
            content: asn1Schema.AsnConvert.serialize(signedData),
        });
        const raw = asn1Schema.AsnConvert.serialize(cms);
        if (format === "raw") {
            return raw;
        }
        return this.toString(format);
    }
    import(data) {
        const raw = PemData.toArrayBuffer(data);
        const cms = asn1Schema.AsnConvert.parse(raw, asn1Cms__namespace.ContentInfo);
        if (cms.contentType !== asn1Cms__namespace.id_signedData) {
            throw new TypeError("Cannot parse CMS package. Incoming data is not a SignedData object.");
        }
        const signedData = asn1Schema.AsnConvert.parse(cms.content, asn1Cms__namespace.SignedData);
        this.clear();
        for (const item of signedData.certificates || []) {
            if (item.certificate) {
                this.push(new X509Certificate(item.certificate));
            }
        }
    }
    clear() {
        while (this.pop()) {
        }
    }
    toString(format = "pem") {
        const raw = this.export("raw");
        switch (format) {
            case "pem":
                return PemConverter.encode(raw, "CMS");
            case "pem-chain":
                return this
                    .map(o => o.toString("pem"))
                    .join("\n");
            case "asn":
                return asn1Schema.AsnConvert.toString(raw);
            case "hex":
                return pvtsutils.Convert.ToHex(raw);
            case "base64":
                return pvtsutils.Convert.ToBase64(raw);
            case "base64url":
                return pvtsutils.Convert.ToBase64Url(raw);
            case "text":
                return TextConverter.serialize(this.toTextObject());
            default:
                throw TypeError("Argument 'format' is unsupported value");
        }
    }
    toTextObject() {
        const contentInfo = asn1Schema.AsnConvert.parse(this.export("raw"), asn1Cms__namespace.ContentInfo);
        const signedData = asn1Schema.AsnConvert.parse(contentInfo.content, asn1Cms__namespace.SignedData);
        const obj = new TextObject("X509Certificates", {
            "Content Type": OidSerializer.toString(contentInfo.contentType),
            "Content": new TextObject("", {
                "Version": `${asn1Cms__namespace.CMSVersion[signedData.version]} (${signedData.version})`,
                "Certificates": new TextObject("", { "Certificate": this.map(o => o.toTextObject()) }),
            }),
        });
        return obj;
    }
}

class X509ChainBuilder {
    constructor(params = {}) {
        this.certificates = [];
        if (params.certificates) {
            this.certificates = params.certificates;
        }
    }
    async build(cert, crypto = cryptoProvider.get()) {
        const chain = new X509Certificates(cert);
        let current = cert;
        while (current = await this.findIssuer(current, crypto)) {
            const thumbprint = await current.getThumbprint(crypto);
            for (const item of chain) {
                const thumbprint2 = await item.getThumbprint(crypto);
                if (pvtsutils.isEqual(thumbprint, thumbprint2)) {
                    throw new Error("Cannot build a certificate chain. Circular dependency.");
                }
            }
            chain.push(current);
        }
        return chain;
    }
    async findIssuer(cert, crypto = cryptoProvider.get()) {
        if (!await cert.isSelfSigned(crypto)) {
            const akiExt = cert.getExtension(asn1X509__namespace.id_ce_authorityKeyIdentifier);
            for (const item of this.certificates) {
                if (item.subject !== cert.issuer) {
                    continue;
                }
                if (akiExt) {
                    if (akiExt.keyId) {
                        const skiExt = item.getExtension(asn1X509__namespace.id_ce_subjectKeyIdentifier);
                        if (skiExt && skiExt.keyId !== akiExt.keyId) {
                            continue;
                        }
                    }
                    else if (akiExt.certId) {
                        const sanExt = item.getExtension(asn1X509__namespace.id_ce_subjectAltName);
                        if (sanExt &&
                            !(akiExt.certId.serialNumber === item.serialNumber && pvtsutils.isEqual(asn1Schema.AsnConvert.serialize(akiExt.certId.name), asn1Schema.AsnConvert.serialize(sanExt)))) {
                            continue;
                        }
                    }
                }
                if (!await cert.verify({
                    publicKey: await item.publicKey.export(crypto),
                    signatureOnly: true,
                }, crypto)) {
                    continue;
                }
                return item;
            }
        }
        return null;
    }
}

class X509CertificateGenerator {
    static async createSelfSigned(params, crypto = cryptoProvider.get()) {
        if (!params.keys.privateKey) {
            throw new Error("Bad field 'keys' in 'params' argument. 'privateKey' is empty");
        }
        if (!params.keys.publicKey) {
            throw new Error("Bad field 'keys' in 'params' argument. 'privateKey' is empty");
        }
        return this.create({
            serialNumber: params.serialNumber,
            subject: params.name,
            issuer: params.name,
            notBefore: params.notBefore,
            notAfter: params.notAfter,
            publicKey: params.keys.publicKey,
            signingKey: params.keys.privateKey,
            signingAlgorithm: params.signingAlgorithm,
            extensions: params.extensions,
        }, crypto);
    }
    static async create(params, crypto = cryptoProvider.get()) {
        var _a;
        let spki;
        if (params.publicKey instanceof PublicKey) {
            spki = params.publicKey.rawData;
        }
        else if ("publicKey" in params.publicKey) {
            spki = params.publicKey.publicKey.rawData;
        }
        else if (pvtsutils.BufferSourceConverter.isBufferSource(params.publicKey)) {
            spki = params.publicKey;
        }
        else {
            spki = await crypto.subtle.exportKey("spki", params.publicKey);
        }
        const asnX509 = new asn1X509__namespace.Certificate({
            tbsCertificate: new asn1X509__namespace.TBSCertificate({
                version: asn1X509__namespace.Version.v3,
                serialNumber: pvtsutils.Convert.FromHex(params.serialNumber),
                validity: new asn1X509__namespace.Validity({
                    notBefore: params.notBefore,
                    notAfter: params.notAfter,
                }),
                extensions: new asn1X509__namespace.Extensions(((_a = params.extensions) === null || _a === void 0 ? void 0 : _a.map(o => asn1Schema.AsnConvert.parse(o.rawData, asn1X509__namespace.Extension))) || []),
                subjectPublicKeyInfo: asn1Schema.AsnConvert.parse(spki, asn1X509__namespace.SubjectPublicKeyInfo),
            }),
        });
        if (params.subject) {
            const name = params.subject instanceof Name
                ? params.subject
                : new Name(params.subject);
            asnX509.tbsCertificate.subject = asn1Schema.AsnConvert.parse(name.toArrayBuffer(), asn1X509__namespace.Name);
        }
        if (params.issuer) {
            const name = params.issuer instanceof Name
                ? params.issuer
                : new Name(params.issuer);
            asnX509.tbsCertificate.issuer = asn1Schema.AsnConvert.parse(name.toArrayBuffer(), asn1X509__namespace.Name);
        }
        const signatureAlgorithm = ("signingKey" in params)
            ? { ...params.signingAlgorithm, ...params.signingKey.algorithm }
            : params.publicKey.algorithm;
        const algProv = tsyringe.container.resolve(diAlgorithmProvider);
        asnX509.tbsCertificate.signature = asnX509.signatureAlgorithm = algProv.toAsnAlgorithm(signatureAlgorithm);
        const tbs = asn1Schema.AsnConvert.serialize(asnX509.tbsCertificate);
        const signatureValue = ("signingKey" in params)
            ? await crypto.subtle.sign(signatureAlgorithm, params.signingKey, tbs)
            : params.signature;
        const signatureFormatters = tsyringe.container.resolveAll(diAsnSignatureFormatter).reverse();
        let asnSignature = null;
        for (const signatureFormatter of signatureFormatters) {
            asnSignature = signatureFormatter.toAsnSignature(signatureAlgorithm, signatureValue);
            if (asnSignature) {
                break;
            }
        }
        if (!asnSignature) {
            throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
        }
        asnX509.signatureValue = asnSignature;
        return new X509Certificate(asn1Schema.AsnConvert.serialize(asnX509));
    }
}

exports.X509CrlReason = void 0;
(function (X509CrlReason) {
    X509CrlReason[X509CrlReason["unspecified"] = 0] = "unspecified";
    X509CrlReason[X509CrlReason["keyCompromise"] = 1] = "keyCompromise";
    X509CrlReason[X509CrlReason["cACompromise"] = 2] = "cACompromise";
    X509CrlReason[X509CrlReason["affiliationChanged"] = 3] = "affiliationChanged";
    X509CrlReason[X509CrlReason["superseded"] = 4] = "superseded";
    X509CrlReason[X509CrlReason["cessationOfOperation"] = 5] = "cessationOfOperation";
    X509CrlReason[X509CrlReason["certificateHold"] = 6] = "certificateHold";
    X509CrlReason[X509CrlReason["removeFromCRL"] = 8] = "removeFromCRL";
    X509CrlReason[X509CrlReason["privilegeWithdrawn"] = 9] = "privilegeWithdrawn";
    X509CrlReason[X509CrlReason["aACompromise"] = 10] = "aACompromise";
})(exports.X509CrlReason || (exports.X509CrlReason = {}));
class X509CrlEntry extends AsnData {
    constructor(...args) {
        let raw;
        if (pvtsutils.BufferSourceConverter.isBufferSource(args[0])) {
            raw = pvtsutils.BufferSourceConverter.toArrayBuffer(args[0]);
        }
        else {
            raw = asn1Schema.AsnConvert.serialize(new asn1X509.RevokedCertificate({
                userCertificate: args[0],
                revocationDate: new asn1X509.Time(args[1]),
                crlEntryExtensions: args[2],
            }));
        }
        super(raw, asn1X509.RevokedCertificate);
    }
    onInit(asn) {
        this.serialNumber = pvtsutils.Convert.ToHex(asn.userCertificate);
        this.revocationDate = asn.revocationDate.getTime();
        this.extensions = [];
        if (asn.crlEntryExtensions) {
            this.extensions = asn.crlEntryExtensions.map((o) => {
                const extension = ExtensionFactory.create(asn1Schema.AsnConvert.serialize(o));
                switch (extension.type) {
                    case asn1X509.id_ce_cRLReasons:
                        this.reason = asn1Schema.AsnConvert.parse(extension.value, asn1X509.CRLReason).reason;
                        break;
                    case asn1X509.id_ce_invalidityDate:
                        this.invalidity = asn1Schema.AsnConvert.parse(extension.value, asn1X509.InvalidityDate).value;
                        break;
                }
                return extension;
            });
        }
    }
}

class X509Crl extends PemData {
    constructor(param) {
        if (PemData.isAsnEncoded(param)) {
            super(param, asn1X509.CertificateList);
        }
        else {
            super(param);
        }
        this.tag = PemConverter.CrlTag;
    }
    onInit(asn) {
        var _a, _b;
        const tbs = asn.tbsCertList;
        this.tbs = asn1Schema.AsnConvert.serialize(tbs);
        this.version = tbs.version;
        const algProv = tsyringe.container.resolve(diAlgorithmProvider);
        this.signatureAlgorithm = algProv.toWebAlgorithm(asn.signatureAlgorithm);
        this.tbsCertListSignatureAlgorithm = tbs.signature;
        this.certListSignatureAlgorithm = asn.signatureAlgorithm;
        this.signature = asn.signature;
        this.issuerName = new Name(tbs.issuer);
        this.issuer = this.issuerName.toString();
        const thisUpdate = tbs.thisUpdate.getTime();
        if (!thisUpdate) {
            throw new Error("Cannot get 'thisUpdate' value");
        }
        this.thisUpdate = thisUpdate;
        const nextUpdate = (_a = tbs.nextUpdate) === null || _a === void 0 ? void 0 : _a.getTime();
        this.nextUpdate = nextUpdate;
        this.entries = ((_b = tbs.revokedCertificates) === null || _b === void 0 ? void 0 : _b.map(o => new X509CrlEntry(asn1Schema.AsnConvert.serialize(o)))) || [];
        this.extensions = [];
        if (tbs.crlExtensions) {
            this.extensions = tbs.crlExtensions.map((o) => ExtensionFactory.create(asn1Schema.AsnConvert.serialize(o)));
        }
    }
    getExtension(type) {
        for (const ext of this.extensions) {
            if (typeof type === "string") {
                if (ext.type === type) {
                    return ext;
                }
            }
            else {
                if (ext instanceof type) {
                    return ext;
                }
            }
        }
        return null;
    }
    getExtensions(type) {
        return this.extensions.filter((o) => {
            if (typeof type === "string") {
                return o.type === type;
            }
            else {
                return o instanceof type;
            }
        });
    }
    async verify(params, crypto = cryptoProvider.get()) {
        if (!this.certListSignatureAlgorithm.isEqual(this.tbsCertListSignatureAlgorithm)) {
            throw new Error("algorithm identifier in the sequence tbsCertList and CertificateList mismatch");
        }
        let keyAlgorithm;
        let publicKey;
        const paramsKey = params.publicKey;
        try {
            if (paramsKey instanceof X509Certificate) {
                keyAlgorithm = {
                    ...paramsKey.publicKey.algorithm,
                    ...paramsKey.signatureAlgorithm,
                };
                publicKey = await paramsKey.publicKey.export(keyAlgorithm, ["verify"]);
            }
            else if (paramsKey instanceof PublicKey) {
                keyAlgorithm = { ...paramsKey.algorithm, ...this.signature };
                publicKey = await paramsKey.export(keyAlgorithm, ["verify"]);
            }
            else {
                keyAlgorithm = { ...paramsKey.algorithm, ...this.signature };
                publicKey = paramsKey;
            }
        }
        catch (e) {
            return false;
        }
        const signatureFormatters = tsyringe.container.resolveAll(diAsnSignatureFormatter).reverse();
        let signature = null;
        for (const signatureFormatter of signatureFormatters) {
            signature = signatureFormatter.toWebSignature(keyAlgorithm, this.signature);
            if (signature) {
                break;
            }
        }
        if (!signature) {
            throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
        }
        return await crypto.subtle.verify(this.signatureAlgorithm, publicKey, signature, this.tbs);
    }
    async getThumbprint(...args) {
        let crypto;
        let algorithm = "SHA-1";
        if (args[0]) {
            if (!args[0].subtle) {
                algorithm = args[0] || algorithm;
                crypto = args[1];
            }
            else {
                crypto = args[0];
            }
        }
        crypto !== null && crypto !== void 0 ? crypto : (crypto = cryptoProvider.get());
        return await crypto.subtle.digest(algorithm, this.rawData);
    }
    findRevoked(certOrSerialNumber) {
        const serialNumber = typeof certOrSerialNumber === "string" ? certOrSerialNumber : certOrSerialNumber.serialNumber;
        for (const entry of this.entries) {
            if (entry.serialNumber === serialNumber) {
                return entry;
            }
        }
        return null;
    }
}

class X509CrlGenerator {
    static async create(params, crypto = cryptoProvider.get()) {
        var _a;
        const name = params.issuer instanceof Name
            ? params.issuer
            : new Name(params.issuer);
        const asnX509Crl = new asn1X509__namespace.CertificateList({
            tbsCertList: new asn1X509__namespace.TBSCertList({
                version: asn1X509__namespace.Version.v2,
                issuer: asn1Schema.AsnConvert.parse(name.toArrayBuffer(), asn1X509__namespace.Name),
                thisUpdate: new asn1X509.Time(params.thisUpdate || new Date()),
            }),
        });
        if (params.nextUpdate) {
            asnX509Crl.tbsCertList.nextUpdate = new asn1X509.Time(params.nextUpdate);
        }
        if (params.extensions && params.extensions.length) {
            asnX509Crl.tbsCertList.crlExtensions = new asn1X509__namespace.Extensions(params.extensions.map(o => asn1Schema.AsnConvert.parse(o.rawData, asn1X509__namespace.Extension)) || []);
        }
        if (params.entries && params.entries.length) {
            asnX509Crl.tbsCertList.revokedCertificates = [];
            for (const entry of params.entries) {
                const userCertificate = PemData.toArrayBuffer(entry.serialNumber);
                const index = asnX509Crl.tbsCertList.revokedCertificates.findIndex(cert => pvtsutils.isEqual(cert.userCertificate, userCertificate));
                if (index > -1) {
                    throw new Error(`Certificate serial number ${entry.serialNumber} already exists in tbsCertList`);
                }
                const revokedCert = new asn1X509.RevokedCertificate({
                    userCertificate: userCertificate,
                    revocationDate: new asn1X509.Time(entry.revocationDate || new Date())
                });
                if ("extensions" in entry && ((_a = entry.extensions) === null || _a === void 0 ? void 0 : _a.length)) {
                    revokedCert.crlEntryExtensions = entry.extensions.map(o => asn1Schema.AsnConvert.parse(o.rawData, asn1X509__namespace.Extension));
                }
                else {
                    revokedCert.crlEntryExtensions = [];
                }
                if (!(entry instanceof X509CrlEntry)) {
                    if (entry.reason) {
                        revokedCert.crlEntryExtensions.push(new asn1X509__namespace.Extension({
                            extnID: asn1X509__namespace.id_ce_cRLReasons,
                            critical: false,
                            extnValue: new asn1Schema.OctetString(asn1Schema.AsnConvert.serialize(new asn1X509__namespace.CRLReason(entry.reason))),
                        }));
                    }
                    if (entry.invalidity) {
                        revokedCert.crlEntryExtensions.push(new asn1X509__namespace.Extension({
                            extnID: asn1X509__namespace.id_ce_invalidityDate,
                            critical: false,
                            extnValue: new asn1Schema.OctetString(asn1Schema.AsnConvert.serialize(new asn1X509__namespace.InvalidityDate(entry.invalidity))),
                        }));
                    }
                    if (entry.issuer) {
                        const name = params.issuer instanceof Name
                            ? params.issuer
                            : new Name(params.issuer);
                        revokedCert.crlEntryExtensions.push(new asn1X509__namespace.Extension({
                            extnID: asn1X509__namespace.id_ce_certificateIssuer,
                            critical: false,
                            extnValue: new asn1Schema.OctetString(asn1Schema.AsnConvert.serialize(asn1Schema.AsnConvert.parse(name.toArrayBuffer(), asn1X509__namespace.Name))),
                        }));
                    }
                }
                asnX509Crl.tbsCertList.revokedCertificates.push(revokedCert);
            }
        }
        const signingAlgorithm = { ...params.signingAlgorithm, ...params.signingKey.algorithm };
        const algProv = tsyringe.container.resolve(diAlgorithmProvider);
        asnX509Crl.tbsCertList.signature = asnX509Crl.signatureAlgorithm = algProv.toAsnAlgorithm(signingAlgorithm);
        const tbs = asn1Schema.AsnConvert.serialize(asnX509Crl.tbsCertList);
        const signature = await crypto.subtle.sign(signingAlgorithm, params.signingKey, tbs);
        const signatureFormatters = tsyringe.container.resolveAll(diAsnSignatureFormatter).reverse();
        let asnSignature = null;
        for (const signatureFormatter of signatureFormatters) {
            asnSignature = signatureFormatter.toAsnSignature(signingAlgorithm, signature);
            if (asnSignature) {
                break;
            }
        }
        if (!asnSignature) {
            throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
        }
        asnX509Crl.signature = asnSignature;
        return new X509Crl(asn1Schema.AsnConvert.serialize(asnX509Crl));
    }
}

ExtensionFactory.register(asn1X509__namespace.id_ce_basicConstraints, BasicConstraintsExtension);
ExtensionFactory.register(asn1X509__namespace.id_ce_extKeyUsage, ExtendedKeyUsageExtension);
ExtensionFactory.register(asn1X509__namespace.id_ce_keyUsage, KeyUsagesExtension);
ExtensionFactory.register(asn1X509__namespace.id_ce_subjectKeyIdentifier, SubjectKeyIdentifierExtension);
ExtensionFactory.register(asn1X509__namespace.id_ce_authorityKeyIdentifier, AuthorityKeyIdentifierExtension);
ExtensionFactory.register(asn1X509__namespace.id_ce_subjectAltName, SubjectAlternativeNameExtension);
AttributeFactory.register(asnPkcs9__namespace.id_pkcs9_at_challengePassword, ChallengePasswordAttribute);
AttributeFactory.register(asnPkcs9__namespace.id_pkcs9_at_extensionRequest, ExtensionsAttribute);
tsyringe.container.registerSingleton(diAsnSignatureFormatter, AsnDefaultSignatureFormatter);
tsyringe.container.registerSingleton(diAsnSignatureFormatter, AsnEcSignatureFormatter);
AsnEcSignatureFormatter.namedCurveSize.set("P-256", 32);
AsnEcSignatureFormatter.namedCurveSize.set("K-256", 32);
AsnEcSignatureFormatter.namedCurveSize.set("P-384", 48);
AsnEcSignatureFormatter.namedCurveSize.set("P-521", 66);

exports.AlgorithmProvider = AlgorithmProvider;
exports.AsnData = AsnData;
exports.AsnDefaultSignatureFormatter = AsnDefaultSignatureFormatter;
exports.AsnEcSignatureFormatter = AsnEcSignatureFormatter;
exports.Attribute = Attribute;
exports.AttributeFactory = AttributeFactory;
exports.AuthorityKeyIdentifierExtension = AuthorityKeyIdentifierExtension;
exports.BasicConstraintsExtension = BasicConstraintsExtension;
exports.CertificatePolicyExtension = CertificatePolicyExtension;
exports.ChallengePasswordAttribute = ChallengePasswordAttribute;
exports.CryptoProvider = CryptoProvider;
exports.DefaultAlgorithmSerializer = DefaultAlgorithmSerializer;
exports.ExtendedKeyUsageExtension = ExtendedKeyUsageExtension;
exports.Extension = Extension;
exports.ExtensionFactory = ExtensionFactory;
exports.ExtensionsAttribute = ExtensionsAttribute;
exports.GeneralName = GeneralName;
exports.GeneralNames = GeneralNames;
exports.KeyUsagesExtension = KeyUsagesExtension;
exports.Name = Name;
exports.NameIdentifier = NameIdentifier;
exports.OidSerializer = OidSerializer;
exports.PemConverter = PemConverter;
exports.Pkcs10CertificateRequest = Pkcs10CertificateRequest;
exports.Pkcs10CertificateRequestGenerator = Pkcs10CertificateRequestGenerator;
exports.PublicKey = PublicKey;
exports.SubjectAlternativeNameExtension = SubjectAlternativeNameExtension;
exports.SubjectKeyIdentifierExtension = SubjectKeyIdentifierExtension;
exports.TextConverter = TextConverter;
exports.TextObject = TextObject;
exports.X509Certificate = X509Certificate;
exports.X509CertificateGenerator = X509CertificateGenerator;
exports.X509Certificates = X509Certificates;
exports.X509ChainBuilder = X509ChainBuilder;
exports.X509Crl = X509Crl;
exports.X509CrlEntry = X509CrlEntry;
exports.X509CrlGenerator = X509CrlGenerator;
exports.cryptoProvider = cryptoProvider;
exports.diAlgorithm = diAlgorithm;
exports.diAlgorithmProvider = diAlgorithmProvider;
exports.diAsnSignatureFormatter = diAsnSignatureFormatter;
exports.idEd25519 = idEd25519;
exports.idEd448 = idEd448;
exports.idX25519 = idX25519;
exports.idX448 = idX448;
