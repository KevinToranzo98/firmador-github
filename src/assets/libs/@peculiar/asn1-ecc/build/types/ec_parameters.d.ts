/**
 * ```
 * ECParameters ::= CHOICE {
 *   namedCurve         OBJECT IDENTIFIER
 *   -- implicitCurve   NULL
 *   -- specifiedCurve  SpecifiedECDomain
 * }
 *   -- implicitCurve and specifiedCurve MUST NOT be used in PKIX.
 *   -- Details for SpecifiedECDomain can be found in [X9.62].
 *   -- Any future additions to this CHOICE should be coordinated
 *   -- with ANSI X9.
 * ```
 */
export declare class ECParameters {
    namedCurve?: string;
    constructor(params?: Partial<ECParameters>);
}
