import { AsnArray } from "@peculiar/asn1-schema";
/**
 * ```asn
 * id-ri OBJECT IDENTIFIER  ::=
 *               { iso(1) identified-organization(3)
     dod(6) internet(1) security(5) mechanisms(5) pkix(7) ri(16) }
 * ```
 */
export declare const id_ri: string;
/**
 * ```asn
 * id-ri-ocsp-response OBJECT IDENTIFIER ::= { id-ri 2 }
 * ```
 */
export declare const id_ri_ocsp_response: string;
/**
 * ```asn
 * id-ri-scvp OBJECT IDENTIFIER ::= { id-ri 4 }
 * ```
 */
export declare const id_ri_scvp: string;
/**
 * ```asn
 * OtherRevocationInfoFormat ::= SEQUENCE {
 *   otherRevInfoFormat OBJECT IDENTIFIER,
 *   otherRevInfo ANY DEFINED BY otherRevInfoFormat }
 * ```
 */
export declare class OtherRevocationInfoFormat {
    otherRevInfoFormat: string;
    otherRevInfo: ArrayBuffer;
    constructor(params?: Partial<OtherRevocationInfoFormat>);
}
/**
 * ```asn
 * RevocationInfoChoice ::= CHOICE {
 *   crl CertificateList,
 *   other [1] IMPLICIT OtherRevocationInfoFormat }
 * ```
 */
export declare class RevocationInfoChoice {
    other: OtherRevocationInfoFormat;
    constructor(params?: Partial<RevocationInfoChoice>);
}
/**
 * ```asn
 * RevocationInfoChoices ::= SET OF RevocationInfoChoice
 * ```
 */
export declare class RevocationInfoChoices extends AsnArray<RevocationInfoChoice> {
    constructor(items?: RevocationInfoChoice[]);
}