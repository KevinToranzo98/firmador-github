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
import * as asn1X509 from '@peculiar/asn1-x509';
import { Extension as Extension$1, Name as Name$1, SubjectPublicKeyInfo, Certificate, Attribute as Attribute$1, AlgorithmIdentifier, RevokedCertificate, CertificateList, Version } from '@peculiar/asn1-x509';
import { BufferSource as BufferSource$1 } from 'pvtsutils';
import { CertificationRequest } from '@peculiar/asn1-csr';

interface TextObjectConvertible {
    /**
     * Returns the object in textual representation
     */
    toTextObject(): TextObject;
}
type TextObjectItemType = string | number | boolean | Date | BufferSource | TextObject | TextObject[] | TextObjectConvertible;
declare const NAME: unique symbol;
declare const VALUE: unique symbol;
declare class TextObject {
    static NAME: typeof NAME;
    static VALUE: typeof VALUE;
    [key: string | symbol]: TextObjectItemType;
    [NAME]: string;
    [VALUE]: string;
    constructor(name: string, items?: Record<string, TextObjectItemType>, value?: string);
}
interface AlgorithmSerializer {
    toTextObject(alg: asn1X509.AlgorithmIdentifier): TextObject;
}
declare abstract class DefaultAlgorithmSerializer {
    static toTextObject(alg: asn1X509.AlgorithmIdentifier): TextObject;
}
declare abstract class OidSerializer {
    static items: Record<string, string>;
    static toString(oid: string): string;
}
declare abstract class TextConverter {
    static oidSerializer: typeof OidSerializer;
    static algorithmSerializer: AlgorithmSerializer;
    static serialize(obj: TextObject): string;
    private static pad;
    private static serializeObj;
    private static serializeBufferSource;
    static serializeAlgorithm(alg: asn1X509.AlgorithmIdentifier): TextObject;
}

type AsnDataStringFormat = "asn" | "text" | "hex" | "base64" | "base64url";
/**
 * Represents an ASN.1 data
 */
declare abstract class AsnData<T> implements TextObjectConvertible {
    static NAME: string;
    /**
     * Gets a DER encoded buffer
     */
    readonly rawData: ArrayBuffer;
    /**
     * Creates a new instance
     * @param raw DER encoded buffer
     * @param type ASN.1 convertible class for `@peculiar/asn1-schema` schema
     */
    constructor(raw: BufferSource, type: {
        new (): T;
    });
    /**
     * ASN.1 object
     * @param asn
     */
    constructor(asn: T);
    /**
     * Occurs on instance initialization
     * @param asn ASN.1 object
     */
    protected abstract onInit(asn: T): void;
    /**
     * Returns `true` if ASN.1 data is equal to another ASN.1 data, otherwise `false`
     * @param data Any data
     */
    equal(data: any): data is this;
    toString(format?: AsnDataStringFormat): string;
    protected getTextName(): string;
    toTextObject(): TextObject;
    protected toTextObjectEmpty(value?: string): TextObject;
}

/**
 * Represents the certificate extension
 */
declare class Extension extends AsnData<Extension$1> {
    /**
     * Gets an extension identifier
     */
    type: string;
    /**
     * Indicates where extension is critical
     */
    critical: boolean;
    /**
     * Gets a DER encoded value of extension
     */
    value: ArrayBuffer;
    /**
     * Creates a new instance from DER encoded Buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param type Extension identifier
     * @param critical Indicates where extension is critical
     * @param value DER encoded value of extension
     */
    constructor(type: string, critical: boolean, value: BufferSource);
    protected onInit(asn: Extension$1): void;
    toTextObject(): TextObject;
    toTextObjectWithoutValue(): TextObject;
}

interface JsonGeneralName {
    type: GeneralNameType;
    value: string;
}
declare const DNS = "dns";
declare const DN = "dn";
declare const EMAIL = "email";
declare const IP = "ip";
declare const URL = "url";
declare const GUID = "guid";
declare const UPN = "upn";
declare const REGISTERED_ID = "id";
type GeneralNameType = typeof DNS | typeof DN | typeof EMAIL | typeof GUID | typeof IP | typeof URL | typeof UPN | typeof REGISTERED_ID;
/**
 * Represents ASN.1 type of GeneralName.
 *
 * This class doesn't support no standard string format is defined for otherName, X.400 name, EDI party name, or any other type of names.
 */
declare class GeneralName extends AsnData<asn1X509.GeneralName> {
    /**
     * Type of the storing value
     */
    type: GeneralNameType;
    /**
     * Text representation of ASN.1 GeneralName
     */
    value: string;
    constructor(type: GeneralNameType, value: string);
    constructor(asn: asn1X509.GeneralName);
    constructor(raw: BufferSource);
    /**
     * Occurs on instance initialization
     * @param asn
     *
     * @throws Throws error if ASN.1 GeneralName contains unsupported value (eg otherName, X400 address, EDI party name)
     */
    protected onInit(asn: asn1X509.GeneralName): void;
    toJSON(): JsonGeneralName;
    toTextObject(): TextObject;
}
type JsonGeneralNames = JsonGeneralName[];
declare class GeneralNames extends AsnData<asn1X509.GeneralNames> {
    static NAME: string;
    items: ReadonlyArray<GeneralName>;
    constructor(json: JsonGeneralNames);
    constructor(asn: asn1X509.GeneralNames | asn1X509.GeneralName[]);
    constructor(raw: BufferSource);
    protected onInit(asn: asn1X509.GeneralNames): void;
    toJSON(): JsonGeneralNames;
    toTextObject(): TextObject;
}

interface HashedAlgorithm extends Algorithm {
    hash: Algorithm;
}

interface IdOrName {
    [idOrName: string]: string;
}
declare class NameIdentifier {
    private items;
    constructor(names?: Record<string, string>);
    get(idOrName: string): string | null;
    findId(idOrName: string): string | null;
    register(id: string, name: string): void;
}
/**
 * JSON representation of Attribute and Value
 */
interface JsonAttributeAndStringValue {
    [type: string]: string[];
}
interface JsonAttributeObject {
    ia5String?: string;
    utf8String?: string;
    universalString?: string;
    bmpString?: string;
    printableString?: string;
}
interface JsonAttributeAndObjectValue {
    [type: string]: JsonAttributeObject[];
}
type JsonAttributeAndValue = JsonAttributeAndStringValue | JsonAttributeAndObjectValue;
/**
 * JSON array of Attribute and Value
 */
type JsonName = Array<JsonAttributeAndStringValue>;
type JsonNameParams = Array<JsonAttributeAndValue>;
/**
 * UTF-8 String Representation of Distinguished Names
 *
 * https://tools.ietf.org/html/rfc2253
 */
declare class Name {
    private extraNames;
    /**
     * Returns `true` if text is ASCII otherwise `false`
     * @param text Text
     * @returns
     */
    static isASCII(text: string): boolean;
    /**
     * ASN.1 Name
     */
    private asn;
    /**
     * Creates a new instance
     * @param data
     * @param extraNames Extra identifiers for name customization
     * @example
     * const text = "URL=http://some.url.com, IP=192.168.0.1, GUID={8ee13e53-2c1c-42bb-8df7-39927c0bdbb6}";
     * const name = new x509.Name(text, {
     *   "Email": "1.2.3.4.5.1",
     *   "IP": "1.2.3.4.5.2",
     *   "GUID": "1.2.3.4.5.3",
     * });
     */
    constructor(data: BufferSource | Name$1 | string | JsonNameParams, extraNames?: IdOrName);
    /**
     * Returns a list of string values filtered by specified id or name
     * @param idOrName ObjectIdentifier or string name
     * @returns Returns a list of strings. Returns an empty list if there are not any values for specified id/name.
     */
    getField(idOrName: string): string[];
    private getName;
    /**
     * Returns string serialized Name
     */
    toString(): string;
    /**
     * Returns a JSON representation of the Name
     */
    toJSON(): JsonName;
    /**
     * Creates AsnName object from string
     * @param data
     */
    private fromString;
    /**
     * Creates AsnName from JSON
     * @param data
     */
    private fromJSON;
    /**
     * Returns Name in DER encoded format
     */
    toArrayBuffer(): ArrayBuffer;
    /**
     * Returns a SHA-1 thumbprint
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getThumbprint(crypto?: Crypto): Promise<ArrayBuffer>;
    /**
     * Returns a thumbprint for specified mechanism
     * @param algorithm Hash algorithm
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getThumbprint(algorithm: globalThis.AlgorithmIdentifier, crypto?: Crypto): Promise<ArrayBuffer>;
}

type AsnExportType = "pem" | AsnDataStringFormat;
type AsnEncodedType = BufferSource | string;
declare abstract class PemData<T> extends AsnData<T> {
    static isAsnEncoded(data: any): data is AsnEncodedType;
    /**
     * Converts encoded raw to ArrayBuffer. Supported formats are HEX, DER, Base64, Base64Url, PEM
     * @param raw Encoded data
     */
    static toArrayBuffer(raw: BufferSource | string): ArrayBuffer;
    /**
     * PEM tag
     */
    protected abstract readonly tag: string;
    /**
     * Creates a new instance
     * @param raw Encoded buffer (DER, PEM, HEX, Base64, Base64Url)
     * @param type ASN.1 convertible class for `@peculiar/asn1-schema` schema
     */
    constructor(raw: AsnEncodedType, type: {
        new (): T;
    });
    /**
     * Creates a new instance
     * @param asn ASN.1 object
     */
    constructor(asn: T);
    /**
     * Returns encoded object in PEM format
     */
    toString(): string;
    /**
     * Returns encoded object in selected format
     * @param format hex, base64, base64url, pem, asn, text
     */
    toString(format: AsnExportType): string;
}

interface IPublicKeyContainer {
    publicKey: PublicKey;
}
type PublicKeyType = PublicKey | CryptoKey | IPublicKeyContainer | BufferSource$1;
/**
 * Representation of Subject Public Key Info
 */
declare class PublicKey extends PemData<SubjectPublicKeyInfo> {
    protected readonly tag: string;
    /**
     * Gets a key algorithm
     */
    algorithm: Algorithm;
    /**
     * Creates a new instance from ASN.1
     * @param asn ASN.1 object
     */
    constructor(asn: SubjectPublicKeyInfo);
    /**
     * Creates a new instance
     * @param raw Encoded buffer (DER, PEM, HEX, Base64, Base64Url)
     */
    constructor(raw: AsnEncodedType);
    /**
     * Returns a public CryptoKey
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    export(crypto?: Crypto): Promise<CryptoKey>;
    /**
     * Returns a public CryptoKey with specified parameters
     * @param algorithm Algorithm
     * @param keyUsages A list of key usages
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    export(algorithm: Algorithm | EcKeyImportParams | RsaHashedImportParams, keyUsages: KeyUsage[], crypto?: Crypto): Promise<CryptoKey>;
    protected onInit(asn: SubjectPublicKeyInfo): void;
    /**
     * Returns a SHA-1 public key thumbprint
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getThumbprint(crypto?: Crypto): Promise<ArrayBuffer>;
    /**
     * Returns a public key thumbprint for specified mechanism
     * @param algorithm Hash algorithm
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getThumbprint(algorithm: globalThis.AlgorithmIdentifier, crypto?: Crypto): Promise<ArrayBuffer>;
    /**
     * Returns Subject Key Identifier as specified in {@link https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.2 RFC5280}
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getKeyIdentifier(crypto?: Crypto): Promise<ArrayBuffer>;
    toTextObject(): TextObject;
}

/**
 * Verification params of X509 certificate
 */
interface X509CertificateVerifyParams {
    date?: Date;
    publicKey?: PublicKeyType;
    signatureOnly?: boolean;
}
/**
 * Representation of X509 certificate
 */
declare class X509Certificate extends PemData<Certificate> implements IPublicKeyContainer {
    static NAME: string;
    protected readonly tag: string;
    /**
     * ToBeSigned block of certificate
     */
    private tbs;
    /**
     * Gets a hexadecimal string of the serial number
     */
    serialNumber: string;
    /**
     * Gets the subject value from the certificate as an Name
     */
    subjectName: Name;
    /**
     * Gets a string subject name
     */
    subject: string;
    /**
     * Gets the issuer value from the certificate as an Name
     */
    issuerName: Name;
    /**
     * Gets a string issuer name
     */
    issuer: string;
    /**
     * Gets a date before which certificate can't be used
     */
    notBefore: Date;
    /**
     * Gets a date after which certificate can't be used
     */
    notAfter: Date;
    /**
     * Gets a signature algorithm
     */
    signatureAlgorithm: HashedAlgorithm;
    /**
     * Gets a signature
     */
    signature: ArrayBuffer;
    /**
     * Gts a list of certificate extensions
     */
    extensions: Extension[];
    /**
     * Gets a private key of the certificate
     */
    privateKey?: CryptoKey;
    /**
     * Gets a public key of the certificate
     */
    publicKey: PublicKey;
    /**
     * Creates a new instance from ASN.1 Certificate object
     * @param asn ASN.1 Certificate object
     */
    constructor(asn: Certificate);
    /**
     * Creates a new instance
     * @param raw Encoded buffer (DER, PEM, HEX, Base64, Base64Url)
     */
    constructor(raw: AsnEncodedType);
    protected onInit(asn: Certificate): void;
    /**
     * Returns an extension of specified type
     * @param type Extension identifier
     * @returns Extension or null
     */
    getExtension<T extends Extension>(type: string): T | null;
    /**
     * Returns an extension of specified type
     * @param type Extension type
     * @returns Extension or null
     */
    getExtension<T extends Extension>(type: {
        new (raw: BufferSource): T;
    }): T | null;
    /**
     * Returns a list of extensions of specified type
     * @param type Extension identifier
     */
    getExtensions<T extends Extension>(type: string): T[];
    /**
     * Returns a list of extensions of specified type
     * @param type Extension type
     */
    getExtensions<T extends Extension>(type: {
        new (raw: BufferSource): T;
    }): T[];
    /**
     * Validates a certificate signature
     * @param params Verification parameters
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    verify(params?: X509CertificateVerifyParams, crypto?: Crypto): Promise<boolean>;
    /**
     * Returns a SHA-1 certificate thumbprint
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getThumbprint(crypto?: Crypto): Promise<ArrayBuffer>;
    /**
     * Returns a certificate thumbprint for specified mechanism
     * @param algorithm Hash algorithm
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getThumbprint(algorithm: globalThis.AlgorithmIdentifier, crypto?: Crypto): Promise<ArrayBuffer>;
    isSelfSigned(crypto?: Crypto): Promise<boolean>;
    toTextObject(): TextObject;
}

interface CertificateIdentifier {
    /**
     * Name
     */
    name: asn1X509.GeneralName[] | asn1X509.GeneralNames | GeneralNames;
    /**
     * Hexadecimal string
     */
    serialNumber: string;
}
/**
 * Represents the Authority Key Identifier certificate extension
 */
declare class AuthorityKeyIdentifierExtension extends Extension {
    static NAME: string;
    /**
     * Creates authority key identifier extension from certificate
     * @param cert Certificate
     * @param critical Indicates where extension is critical. Default is `false`
     * @param crypto WebCrypto provider. Default is from CryptoProvider
     */
    static create(cert: X509Certificate, critical?: boolean, crypto?: Crypto): Promise<AuthorityKeyIdentifierExtension>;
    /**
     * Creates authority key identifier extension from certificate identifier
     * @param certId Certificate identifier
     * @param critical Indicates where extension is critical. Default is `false`
     * @param crypto WebCrypto provider. Default is from CryptoProvider
     */
    static create(certId: CertificateIdentifier, critical?: boolean, crypto?: Crypto): Promise<AuthorityKeyIdentifierExtension>;
    /**
     * Creates authority key identifier extension from CryptoKey
     * @param publicKey Public CryptoKey
     * @param critical Indicates where extension is critical. Default is `false`
     * @param crypto WebCrypto provider. Default is from CryptoProvider
     */
    static create(publicKey: CryptoKey, critical?: boolean, crypto?: Crypto): Promise<AuthorityKeyIdentifierExtension>;
    /**
     * Gets a hexadecimal representation of key identifier
     */
    keyId?: string;
    /**
     * Gets a certificate identifier in the issuer name and serial number
     */
    certId?: CertificateIdentifier;
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param identifier Hexadecimal representation of key identifier
     * @param critical Indicates where extension is critical. Default is `false`
     */
    constructor(identifier: string, critical?: boolean);
    /**
     * Creates a new instance
     * @param id Certificate identifier in the issuer name and serial number
     * @param critical Indicates where extension is critical. Default is `false`
     */
    constructor(id: CertificateIdentifier, critical?: boolean);
    protected onInit(asn: asn1X509.Extension): void;
    toTextObject(): TextObject;
}

/**
 * Represents the Basic Constraints certificate extension
 */
declare class BasicConstraintsExtension extends Extension {
    static NAME: string;
    /**
     * Indicates whether the certified public key may be used
     * to verify certificate signatures
     */
    readonly ca: boolean;
    /**
     * Gets a maximum number of non-self-issued intermediate certificates that may
     * follow this certificate in a valid certification path
     */
    readonly pathLength?: number;
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param ca
     * @param pathLength
     * @param critical
     */
    constructor(ca: boolean, pathLength?: number, critical?: boolean);
    toTextObject(): TextObject;
}

declare enum ExtendedKeyUsage {
    serverAuth = "1.3.6.1.5.5.7.3.1",
    clientAuth = "1.3.6.1.5.5.7.3.2",
    codeSigning = "1.3.6.1.5.5.7.3.3",
    emailProtection = "1.3.6.1.5.5.7.3.4",
    timeStamping = "1.3.6.1.5.5.7.3.8",
    ocspSigning = "1.3.6.1.5.5.7.3.9"
}
type ExtendedKeyUsageType = asn1X509.ExtendedKeyUsage | string;
/**
 * Represents the Extended Key Usage certificate extension
 */
declare class ExtendedKeyUsageExtension extends Extension {
    static NAME: string;
    /**
     * Gets a list of purposes for which the certified public key may be used
     */
    readonly usages: ExtendedKeyUsageType[];
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param usages
     * @param critical
     */
    constructor(usages: ExtendedKeyUsageType[], critical?: boolean);
    toTextObject(): TextObject;
}

/**
 * X509 key usages flags
 */
declare enum KeyUsageFlags {
    digitalSignature = 1,
    nonRepudiation = 2,
    keyEncipherment = 4,
    dataEncipherment = 8,
    keyAgreement = 16,
    keyCertSign = 32,
    cRLSign = 64,
    encipherOnly = 128,
    decipherOnly = 256
}
/**
 * Represents the Key Usage certificate extension
 */
declare class KeyUsagesExtension extends Extension {
    static NAME: string;
    /**
     * Gets a key usages flag
     */
    readonly usages: KeyUsageFlags;
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param usages
     * @param critical
     */
    constructor(usages: KeyUsageFlags, critical?: boolean);
    toTextObject(): TextObject;
}

/**
 * Represents the Subject Key Identifier certificate extension
 */
declare class SubjectKeyIdentifierExtension extends Extension {
    static NAME: string;
    /**
     * Creates subject key identifier extension from CryptoKey
     * @param publicKey Public CryptoKey
     * @param critical Indicates where extension is critical. Default is `false`
     * @param crypto WebCrypto provider. Default is from CryptoProvider
     */
    static create(publicKey: PublicKeyType, critical?: boolean, crypto?: Crypto): Promise<SubjectKeyIdentifierExtension>;
    /**
     * Gets hexadecimal representation of key identifier
     */
    readonly keyId: string;
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param keyId Hexadecimal representation of key identifier
     * @param critical Indicates where extension is critical. Default is `false`
     */
    constructor(keyId: string, critical?: boolean);
    toTextObject(): TextObject;
}

/**
 * Represents the Subject Alternative Name certificate extension
 */
declare class SubjectAlternativeNameExtension extends Extension {
    names: GeneralNames;
    static NAME: string;
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param data JSON representation of SAN
     * @param critical Indicates where extension is critical. Default is `false`
     */
    constructor(data?: JsonGeneralNames, critical?: boolean);
    onInit(asn: asn1X509.Extension): void;
    toTextObject(): TextObject;
}

/**
 * Represents the Certificate Policy extension
 */
declare class CertificatePolicyExtension extends Extension {
    static NAME: string;
    /**
     * Gets the list of certificate policies
     */
    readonly policies: ReadonlyArray<string>;
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource$1);
    /**
     * Creates a new instance
     * @param policies
     * @param critical
     */
    constructor(policies: string[], critical?: boolean);
    toTextObject(): TextObject;
}

/**
 * Static class to manage X509 extensions
 */
declare class ExtensionFactory {
    private static items;
    /**
     * Registers a new X509 Extension class. If id already exists replaces it
     * @param id Extension identifier
     * @param type Extension class
     *
     * @example
     * ```js
     * ExtensionFactory.register(asnX509.id_ce_basicConstraints, extensions.BasicConstraintsExtension);
     * ```
     */
    static register(id: string, type: any): void;
    /**
     * Returns X509 Extension based on it's identifier
     * @param data DER encoded buffer
     *
     * @example
     * ```js
     * const ext = ExtensionFactory.create(asnExtRaw);
     * ```
     */
    static create(data: BufferSource): Extension;
}

/**
 * Represents the Attribute structure
 */
declare class Attribute extends AsnData<Attribute$1> {
    static NAME: string;
    /**
     * Gets an attribute identifier
     */
    type: string;
    /**
     * Gets a list of DER encoded attribute values
     */
    values: ArrayBuffer[];
    /**
     * Crates a new instance
     * @param type Attribute identifier
     * @param values List of DER encoded attribute values
     */
    constructor(type: string, values?: BufferSource[]);
    /**
     * Crates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    protected onInit(asn: Attribute$1): void;
    toTextObject(): TextObject;
    toTextObjectWithoutValue(): TextObject;
}

declare class ChallengePasswordAttribute extends Attribute {
    static NAME: string;
    password: string;
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param value
     */
    constructor(value: string);
    protected onInit(asn: asn1X509.Attribute): void;
    toTextObject(): TextObject;
}

declare class ExtensionsAttribute extends Attribute {
    static NAME: string;
    items: Extension[];
    /**
     * Creates a new instance from DER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param extensions
     */
    constructor(extensions: Extension[]);
    protected onInit(asn: asn1X509.Attribute): void;
    toTextObject(): TextObject;
}

/**
 * Static class to manage X509 attributes
 */
declare class AttributeFactory {
    private static items;
    /**
     * Registers a new X509 Attribute class. If id already exists replaces it
     * @param id Attribute identifier
     * @param type Attribute class
     *
     * @example
     * ```js
     * AttributeFactory.register(asnPkcs9.id_pkcs9_at_challengePassword, ChallengePasswordAttribute);
     * ```
     */
    static register(id: string, type: any): void;
    /**
     * Returns X509 Attribute based on it's identifier
     * @param data DER encoded buffer
     *
     * @example
     * ```js
     * const attr = AttributeFactory.create(asnAttrRaw);
     * ```
     */
    static create(data: BufferSource): Attribute;
}

/**
 * Dependency injection identifier for `IAsnSignatureFormatter` interface
 */
declare const diAsnSignatureFormatter = "crypto.signatureFormatter";
/**
 * Provides mechanism to convert ASN.1 signature value to WebCrypto and back
 *
 * To register it's implementation in global use `tsyringe` container
 * @example
 * ```
 * import { container } from "tsyringe";
 *
 * container.registerSingleton(diAsnSignatureFormatter, AsnDefaultSignatureFormatter);
 * ```
 */
interface IAsnSignatureFormatter {
    /**
     * Converts ASN.1 signature to WebCrypto format
     * @param algorithm Key and signing algorithm
     * @param signature ASN.1 signature value in DER format
     */
    toAsnSignature(algorithm: Algorithm, signature: BufferSource): ArrayBuffer | null;
    /**
     * Converts WebCrypto signature to ASN.1 DER encoded signature value
     * @param algorithm
     * @param signature
     */
    toWebSignature(algorithm: Algorithm, signature: BufferSource): ArrayBuffer | null;
}
declare class AsnDefaultSignatureFormatter implements IAsnSignatureFormatter {
    toAsnSignature(algorithm: Algorithm, signature: BufferSource): ArrayBuffer | null;
    toWebSignature(algorithm: Algorithm, signature: BufferSource): ArrayBuffer | null;
}

interface UnknownAlgorithm extends Algorithm {
    name: string;
    parameters?: ArrayBuffer | null;
}
interface IAlgorithm {
    /**
     * Converts WebCrypto algorithm to ASN.1 algorithm
     * @param alg WebCrypto algorithm
     * @returns ASN.1 algorithm or null
     */
    toAsnAlgorithm(alg: Algorithm): AlgorithmIdentifier | null;
    /**
     * Converts ASN.1 algorithm to WebCrypto algorithm
     * @param alg ASN.1 algorithm
     * @returns WebCrypto algorithm or null
     */
    toWebAlgorithm(alg: AlgorithmIdentifier): Algorithm | null;
}
/**
 * Dependency Injection algorithm identifier
 */
declare const diAlgorithm = "crypto.algorithm";
declare class AlgorithmProvider {
    /**
     * Returns all registered algorithm providers
     */
    getAlgorithms(): IAlgorithm[];
    /**
     * Converts WebCrypto algorithm to ASN.1 algorithm
     * @param alg WebCrypto algorithm
     * @returns ASN.1 algorithm
     * @throws Error whenever cannot convert an algorithm
     */
    toAsnAlgorithm(alg: Algorithm): AlgorithmIdentifier;
    /**
     * ConvertsASN.1 algorithm to WebCrypto algorithm
     * @param alg ASN.1 algorithm
     * @returns  algorithm
     */
    toWebAlgorithm(alg: AlgorithmIdentifier): Algorithm;
}
declare const diAlgorithmProvider = "crypto.algorithmProvider";

/**
 * RSA algorithm provider
 */
declare class RsaAlgorithm implements IAlgorithm {
    toAsnAlgorithm(alg: HashedAlgorithm): AlgorithmIdentifier | null;
    toWebAlgorithm(alg: AlgorithmIdentifier): Algorithm | HashedAlgorithm | null;
}

/**
 * EC algorithm provider
 */
declare class EcAlgorithm implements IAlgorithm {
    static SECP256K1: string;
    toAsnAlgorithm(alg: HashedAlgorithm | EcKeyGenParams): AlgorithmIdentifier | null;
    toWebAlgorithm(alg: AlgorithmIdentifier): HashedAlgorithm | EcKeyGenParams | null;
}

declare class AsnEcSignatureFormatter implements IAsnSignatureFormatter {
    static namedCurveSize: Map<string, number>;
    static defaultNamedCurveSize: number;
    private addPadding;
    private removePadding;
    toAsnSignature(algorithm: Algorithm, signature: BufferSource): ArrayBuffer | null;
    toWebSignature(algorithm: Algorithm, signature: BufferSource): ArrayBuffer | null;
}

declare const idX25519 = "1.3.101.110";
declare const idX448 = "1.3.101.111";
declare const idEd25519 = "1.3.101.112";
declare const idEd448 = "1.3.101.113";
/**
 * ECDH-ES and EdDSA algorithm provider
 */
declare class EdAlgorithm implements IAlgorithm {
    toAsnAlgorithm(alg: EcKeyGenParams): AlgorithmIdentifier | null;
    toWebAlgorithm(alg: AlgorithmIdentifier): HashedAlgorithm | EcKeyGenParams | null;
}

interface PemHeader {
    key: string;
    value: string;
}
/**
 * Represents PEM structure
 */
interface PemStruct {
    /**
     * Type
     */
    type: string;
    /**
     * Headers
     */
    headers: PemHeader[];
    /**
     * Decoded message data
     */
    rawData: ArrayBuffer;
}
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
type PemStructEncodeParams = AtLeast<PemStruct, "type" | "rawData">;
/**
 * Represents PEM Converter.
 */
declare class PemConverter {
    static CertificateTag: string;
    static CrlTag: string;
    static CertificateRequestTag: string;
    static PublicKeyTag: string;
    static PrivateKeyTag: string;
    static isPem(data: any): data is string;
    static decodeWithHeaders(pem: string): PemStruct[];
    /**
     * Decodes PEM to a list of raws
     * @param pem message in PEM format
     */
    static decode(pem: string): ArrayBuffer[];
    /**
     * Decodes PEM and returns first item from the list
     * @param pem message in PEM format
     * @throw Throws RangeError if list of decoded items is empty
     */
    static decodeFirst(pem: string): ArrayBuffer;
    /**
     * Encodes a list of PemStruct in PEM format
     * @param structs A list of PemStruct
     * @param tag PEM tag
     */
    static encode(structs: PemStructEncodeParams[]): string;
    /**
     * Encodes a raw data in PEM format
     * @param rawData Raw data
     * @param tag PEM tag
     */
    static encode(rawData: BufferSource, tag: string): string;
    /**
     * Encodes a list of raws in PEM format
     * @param raws A list of raws
     * @param tag PEM tag
     */
    static encode(rawData: BufferSource[], tag: string): string;
    /**
     * Encodes PEMStruct in PEM block
     * @param pem PEM structure for encoding
     * @returns Returns PEM encoded block
     */
    private static encodeStruct;
}

/**
 * Representation of PKCS10 Certificate Request
 */
declare class Pkcs10CertificateRequest extends PemData<CertificationRequest> implements IPublicKeyContainer {
    static NAME: string;
    protected readonly tag: string;
    /**
     * ToBeSigned block of CSR
     */
    private tbs;
    /**
     * Gets the subject value from the certificate as an Name
     */
    subjectName: Name;
    /**
     * Gets a string subject name
     */
    subject: string;
    /**
     * Gets a signature algorithm
     */
    signatureAlgorithm: HashedAlgorithm;
    /**
     * Gets a signature
     */
    signature: ArrayBuffer;
    /**
     * Gets a public key of CSR
     */
    publicKey: PublicKey;
    /**
     * Gets a list fo CSR attributes
     */
    attributes: Attribute[];
    /**
     * Gets a list of CSR extensions
     */
    extensions: Extension[];
    /**
     * Creates a new instance fromDER encoded buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: AsnEncodedType);
    /**
     * Creates a new instance from ASN.1 CertificationRequest
     * @param asn ASN.1 CertificationRequest
     */
    constructor(asn: CertificationRequest);
    protected onInit(asn: CertificationRequest): void;
    /**
     * Returns attribute of the specified type
     * @param type Attribute identifier
     * @returns Attribute or null
     */
    getAttribute(type: string): Attribute | null;
    /**
     * Returns a list of attributes of the specified type
     * @param type Attribute identifier
     */
    getAttributes(type: string): Attribute[];
    /**
     * Returns extension of the specified type
     * @param type Extension identifier
     * @returns Extension or null
     */
    getExtension(type: string): Extension | null;
    /**
     * Returns a list of extension of the specified type
     * @param type Extension identifier
     */
    getExtensions(type: string): Extension[];
    /**
     * Validates CSR signature
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    verify(crypto?: Crypto): Promise<boolean>;
    toTextObject(): TextObject;
}

type Pkcs10CertificateRequestCreateParamsName = string | JsonName | Name;
/**
 * Pkcs10CertificateRequest create parameters
 */
interface Pkcs10CertificateRequestCreateParams {
    /**
     * Subject name
     */
    name?: Pkcs10CertificateRequestCreateParamsName;
    /**
     * Extensions
     */
    extensions?: Extension[];
    /**
     * Attributes
     */
    attributes?: Attribute[];
    /**
     * Signing algorithm
     */
    signingAlgorithm: Algorithm | EcdsaParams;
    /**
     * Crypto key pair
     */
    keys: CryptoKeyPair;
}
/**
 * Generator of PKCS10 certificate requests
 */
declare class Pkcs10CertificateRequestGenerator {
    /**
     * Creates a new PKCS10 Certificate request
     * @param params Create parameters
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    static create(params: Pkcs10CertificateRequestCreateParams, crypto?: Crypto): Promise<Pkcs10CertificateRequest>;
}

type MapForEachCallback = (value: Crypto, key: string, map: Map<string, Crypto>) => void;
/**
 * Crypto provider
 */
declare class CryptoProvider implements Map<string, Crypto> {
    static DEFAULT: string;
    private items;
    /**
     * Returns `true` if data is CryptoKeyPair
     * @param data
     */
    static isCryptoKeyPair(data: any): data is CryptoKeyPair;
    static isCryptoKey(data: any): data is CryptoKey;
    /**
     * Creates a new instance
     */
    constructor();
    clear(): void;
    delete(key: string): boolean;
    forEach(callbackfn: MapForEachCallback, thisArg?: any): void;
    has(key: string): boolean;
    get size(): number;
    entries(): IterableIterator<[string, Crypto]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<Crypto>;
    [Symbol.iterator](): IterableIterator<[string, Crypto]>;
    [Symbol.toStringTag]: string;
    /**
     * Returns default crypto
     * @throws Error whenever default provider not set
     */
    get(): Crypto;
    /**
     * Returns crypto by name
     * @param key Crypto name
     * @throws Error whenever provider with specified identifier does not exist
     */
    get(key: string): Crypto;
    /**
     * Sets default crypto
     * @param value
     */
    set(value: Crypto): this;
    /**
     * Sets crypto with specified identifier
     * @param key Identifier
     * @param value crypto provider
     */
    set(key: string, value: Crypto): this;
}
/**
 * Singleton crypto provider
 */
declare const cryptoProvider: CryptoProvider;

type X509CertificatesExportType = AsnExportType | "pem-chain";
/**
 * X509 Certificate collection
 */
declare class X509Certificates extends Array<X509Certificate> implements TextObjectConvertible {
    /**
     * Creates a new instance
     */
    constructor();
    /**
     * Creates a new instance from encoded PKCS7 buffer
     * @param raw Encoded PKCS7 buffer. Supported formats are DER, PEM, HEX, Base64, or Base64Url
     */
    constructor(raw: AsnEncodedType);
    /**
     * Creates a new instance form X509 certificate
     * @param cert X509 certificate
     */
    constructor(cert: X509Certificate);
    /**
     * Creates a new instance from a list of x509 certificates
     * @param certs List of x509 certificates
     */
    constructor(certs: X509Certificate[]);
    /**
     * Returns encoded object in PEM format
     */
    export(): string;
    /**
     * Returns encoded object in DER format
     * @param format `der` format
     */
    export(format: "raw"): ArrayBuffer;
    /**
     * Returns encoded object in selected format
     * @param format `hex`, `base64`, `base64url`, `pem`. Default is `pem`
     */
    export(format?: AsnExportType): string;
    /**
     * Import certificates from encoded PKCS7 data. Supported formats are HEX, DER, Base64, Base64Url, PEM
     * @param data
     */
    import(data: AsnEncodedType): void;
    /**
     * Removes all items from collection
     */
    clear(): void;
    toString(format?: X509CertificatesExportType): string;
    toTextObject(): TextObject;
}

/**
 * Represents a chain-building engine for X509Certificate certificates
 * @example
 * ```js
 * const chain = new x509.X509ChainBuilder({
 *   certificates: [
 *     new x509.X509Certificate(raw1),
 *     new x509.X509Certificate(raw2),
 *     // ...
 *     new x509.X509Certificate(rawN),
 *   ],
 * });
 *
 * const cert = x509.X509Certificate(raw);
 * const items = await chain.build(cert);
 * ```
 */
declare class X509ChainBuilder {
    certificates: X509Certificate[];
    constructor(params?: Partial<X509ChainBuilder>);
    build(cert: X509Certificate, crypto?: Crypto): Promise<X509Certificates>;
    private findIssuer;
}

type X509CertificateCreateParamsName = string | JsonName | Name;
/**
 * Base arguments for certificate creation
 */
interface X509CertificateCreateParamsBase {
    /**
     * Hexadecimal serial number
     */
    serialNumber: string;
    /**
     * Date before which certificate can't be used
     */
    notBefore: Date;
    /**
     * Date after which certificate can't be used
     */
    notAfter: Date;
    /**
     * List of extensions
     */
    extensions?: Extension[];
    /**
     * Signing algorithm
     */
    signingAlgorithm: Algorithm | EcdsaParams;
}
/**
 * Common parameters for X509 Certificate generation
 */
interface X509CertificateCreateCommonParams extends X509CertificateCreateParamsBase {
    subject?: X509CertificateCreateParamsName;
    issuer?: X509CertificateCreateParamsName;
}
/**
 * Parameters for X509 Certificate generation with private key
 */
interface X509CertificateCreateWithKeyParams extends X509CertificateCreateCommonParams {
    publicKey: PublicKeyType;
    signingKey: CryptoKey;
}
/**
 * Parameters for X509 Certificate generation with existing signature value
 */
interface X509CertificateCreateWithSignatureParams extends X509CertificateCreateCommonParams {
    /**
     * Signature for manually initialized certificates
     */
    signature: BufferSource$1;
    /**
     * Manual signing requires CryptoKey that includes signature algorithm
     */
    publicKey: CryptoKey;
}
type X509CertificateCreateParams = X509CertificateCreateWithKeyParams | X509CertificateCreateWithSignatureParams;
/**
 * Parameters for self-signed X509 Certificate generation
 */
interface X509CertificateCreateSelfSignedParams extends X509CertificateCreateParamsBase {
    name?: X509CertificateCreateParamsName;
    keys: CryptoKeyPair;
}
/**
 * Generator of X509 certificates
 */
declare class X509CertificateGenerator {
    /**
     * Creates a self-signed certificate
     * @param params Parameters
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    static createSelfSigned(params: X509CertificateCreateSelfSignedParams, crypto?: Crypto): Promise<X509Certificate>;
    /**
     * Creates a certificate signed by private key
     * @param params Parameters
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    static create(params: X509CertificateCreateParams, crypto?: Crypto): Promise<X509Certificate>;
}

/**
 * Reason Code
 * The reasonCode is a non-critical CRL entry extension that identifies
 * the reason for the certificate revocation.
 */
declare enum X509CrlReason {
    unspecified = 0,
    keyCompromise = 1,
    cACompromise = 2,
    affiliationChanged = 3,
    superseded = 4,
    cessationOfOperation = 5,
    certificateHold = 6,
    removeFromCRL = 8,
    privilegeWithdrawn = 9,
    aACompromise = 10
}
/**
  * Representation of X509CrlEntry
  */
declare class X509CrlEntry extends AsnData<RevokedCertificate> {
    /**
     * Gets a hexadecimal string of the serial number, the userCertificate
     */
    serialNumber: string;
    /**
     * Gets the revocation date
     */
    revocationDate: Date;
    /**
     * Gets the reason code
     */
    reason?: X509CrlReason;
    /**
     * Gets the invalidity Date
     * The invalidity date is a non-critical CRL entry extension that
     * provides the date on which it is known or suspected that the private
     * key was compromised or that the certificate otherwise became invalid.
     */
    invalidity?: Date;
    /**
     * Gets crl entry extensions
     */
    extensions: Extension[];
    /**
     * Creates a new instance from DER encoded Buffer
     * @param raw DER encoded buffer
     */
    constructor(raw: BufferSource);
    /**
     * Creates a new instance
     * @param serialNumber Serial number of certificate
     * @param revocationDate Revocation date
     * @param extensions List of crl extensions
     */
    constructor(serialNumber: string, revocationDate: Date, extensions: Extension[]);
    protected onInit(asn: RevokedCertificate): void;
}

interface X509CrlVerifyParams {
    publicKey: CryptoKey | PublicKey | X509Certificate;
}
/**
 * Representation of X.509 Certificate Revocation List (CRL)
 */
declare class X509Crl extends PemData<CertificateList> {
    protected readonly tag: string;
    /**
     * ToBeSigned block of crl
     */
    private tbs;
    /**
     * Signature field in the sequence tbsCertList
     */
    private tbsCertListSignatureAlgorithm;
    /**
     * Signature algorithm field in the sequence CertificateList
     */
    private certListSignatureAlgorithm;
    /**
     * Gets a version
     */
    version?: Version;
    /**
     * Gets a signature algorithm
     */
    signatureAlgorithm: HashedAlgorithm;
    /**
     * Gets a signature
     */
    signature: ArrayBuffer;
    /**
     * Gets a string issuer name
     */
    issuer: string;
    /**
     * Gets the issuer value from the crl as an Name
     */
    issuerName: Name;
    /**
     * Gets a thisUpdate date from the CRL
     */
    thisUpdate: Date;
    /**
     * Gets a nextUpdate date from the CRL
     */
    nextUpdate?: Date;
    /**
     * Gets a crlEntries from the CRL
     */
    entries: ReadonlyArray<X509CrlEntry>;
    /**
     * Gts a list of crl extensions
     */
    extensions: Extension[];
    /**
     * Creates a new instance from ASN.1 CertificateList object
     * @param asn ASN.1 CertificateList object
     */
    constructor(asn: CertificateList);
    /**
     * Creates a new instance
     * @param raw Encoded buffer (DER, PEM, HEX, Base64, Base64Url)
     */
    constructor(raw: AsnEncodedType);
    protected onInit(asn: CertificateList): void;
    /**
     * Returns an extension of specified type
     * @param type Extension identifier
     * @returns Extension or null
     */
    getExtension<T extends Extension>(type: string): T | null;
    /**
     * Returns an extension of specified type
     * @param type Extension type
     * @returns Extension or null
     */
    getExtension<T extends Extension>(type: {
        new (raw: BufferSource): T;
    }): T | null;
    /**
     * Returns a list of extensions of specified type
     * @param type Extension identifier
     */
    getExtensions<T extends Extension>(type: string): T[];
    /**
     * Returns a list of extensions of specified type
     * @param type Extension type
     */
    getExtensions<T extends Extension>(type: {
        new (raw: BufferSource): T;
    }): T[];
    /**
     * Validates a crl signature
     * @param params Verification parameters
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    verify(params: X509CrlVerifyParams, crypto?: Crypto): Promise<boolean>;
    /**
     * Returns a SHA-1 certificate thumbprint
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getThumbprint(crypto?: Crypto): Promise<ArrayBuffer>;
    /**
     * Returns a certificate thumbprint for specified mechanism
     * @param algorithm Hash algorithm
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    getThumbprint(algorithm: globalThis.AlgorithmIdentifier, crypto?: Crypto): Promise<ArrayBuffer>;
    /**
     *  Gets the CRL entry, with the given X509Certificate or certificate serialNumber.
     *
     * @param certOrSerialNumber certificate | serialNumber
     */
    findRevoked(certOrSerialNumber: X509Certificate | string): X509CrlEntry | null;
}

interface X509CrlEntryParams {
    /**
     * Hexadecimal serial number
     */
    serialNumber: string;
    revocationDate?: Date;
    reason?: X509CrlReason;
    invalidity?: Date;
    issuer?: X509CertificateCreateParamsName;
    extensions?: Extension[];
}
/**
 * Base arguments for crl creation
 */
interface X509CrlCreateParamsBase {
    issuer: X509CertificateCreateParamsName;
    thisUpdate?: Date;
    /**
     * Signing algorithm
     */
    signingAlgorithm: Algorithm | EcdsaParams;
}
/**
 * Parameters for X509 CRL generation
 */
interface X509CrlCreateParams extends X509CrlCreateParamsBase {
    nextUpdate?: Date;
    extensions?: Extension[];
    entries?: X509CrlEntryParams[];
    signingKey: CryptoKey;
}
/**
 * Generator of X509 crl
 */
declare class X509CrlGenerator {
    /**
     * Creates a crl signed by private key
     * @param params Parameters
     * @param crypto Crypto provider. Default is from CryptoProvider
     */
    static create(params: X509CrlCreateParams, crypto?: Crypto): Promise<X509Crl>;
}

export { AlgorithmProvider, AlgorithmSerializer, AsnData, AsnDataStringFormat, AsnDefaultSignatureFormatter, AsnEcSignatureFormatter, Attribute, AttributeFactory, AuthorityKeyIdentifierExtension, BasicConstraintsExtension, CertificateIdentifier, CertificatePolicyExtension, ChallengePasswordAttribute, CryptoProvider, DefaultAlgorithmSerializer, EcAlgorithm, EdAlgorithm, ExtendedKeyUsage, ExtendedKeyUsageExtension, ExtendedKeyUsageType, Extension, ExtensionFactory, ExtensionsAttribute, GeneralName, GeneralNameType, GeneralNames, HashedAlgorithm, IAlgorithm, IAsnSignatureFormatter, IPublicKeyContainer, IdOrName, JsonAttributeAndObjectValue, JsonAttributeAndStringValue, JsonAttributeAndValue, JsonAttributeObject, JsonGeneralName, JsonGeneralNames, JsonName, JsonNameParams, KeyUsageFlags, KeyUsagesExtension, MapForEachCallback, Name, NameIdentifier, OidSerializer, PemConverter, PemHeader, PemStruct, PemStructEncodeParams, Pkcs10CertificateRequest, Pkcs10CertificateRequestCreateParams, Pkcs10CertificateRequestCreateParamsName, Pkcs10CertificateRequestGenerator, PublicKey, PublicKeyType, RsaAlgorithm, SubjectAlternativeNameExtension, SubjectKeyIdentifierExtension, TextConverter, TextObject, TextObjectConvertible, TextObjectItemType, UnknownAlgorithm, X509Certificate, X509CertificateCreateCommonParams, X509CertificateCreateParams, X509CertificateCreateParamsBase, X509CertificateCreateParamsName, X509CertificateCreateSelfSignedParams, X509CertificateCreateWithKeyParams, X509CertificateCreateWithSignatureParams, X509CertificateGenerator, X509CertificateVerifyParams, X509Certificates, X509CertificatesExportType, X509ChainBuilder, X509Crl, X509CrlCreateParams, X509CrlCreateParamsBase, X509CrlEntry, X509CrlEntryParams, X509CrlGenerator, X509CrlReason, X509CrlVerifyParams, cryptoProvider, diAlgorithm, diAlgorithmProvider, diAsnSignatureFormatter, idEd25519, idEd448, idX25519, idX448 };
