/**
 * ```
 * keyBag BAG-TYPE ::=
 *      {KeyBag              IDENTIFIED BY {bagtypes 1}}
 * ```
 */
export declare const id_keyBag: string;
/**
 * ```
 * pkcs8ShroudedKeyBag BAG-TYPE ::=
 *     {PKCS8ShroudedKeyBag IDENTIFIED BY {bagtypes 2}}
 * ```
 */
export declare const id_pkcs8ShroudedKeyBag: string;
/**
 * ```
 * certBag BAG-TYPE ::=
 *     {CertBag             IDENTIFIED BY {bagtypes 3}}
 * ```
 */
export declare const id_certBag: string;
/**
 * ```
 * crlBag BAG-TYPE ::=
 *     {CRLBag              IDENTIFIED BY {bagtypes 4}}
 * ```
 */
export declare const id_CRLBag: string;
/**
 * ```
 * secretBag BAG-TYPE ::=
 *     {SecretBag           IDENTIFIED BY {bagtypes 5}}
 * ```
 */
export declare const id_SecretBag: string;
/**
 * ```
 * safeContentsBag BAG-TYPE ::=
 *     {SafeContents        IDENTIFIED BY {bagtypes 6}}
 * ```
 */
export declare const id_SafeContents: string;
/**
 * ```
 * pkcs-9 OBJECT IDENTIFIER ::= {iso(1) member-body(2) us(840)
 *   rsadsi(113549) pkcs(1) 9}
 * ```
 */
export declare const id_pkcs_9 = "1.2.840.113549.1.9";
