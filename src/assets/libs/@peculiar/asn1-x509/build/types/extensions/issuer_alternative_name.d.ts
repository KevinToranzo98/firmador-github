import { GeneralNames } from "../general_names";
import { GeneralName } from '../general_name';
/**
 * ```
 * id-ce-issuerAltName OBJECT IDENTIFIER ::=  { id-ce 18 }
 * ```
 */
export declare const id_ce_issuerAltName: string;
/**
 * ```
 * IssuerAltName ::= GeneralNames
 * ```
 */
export declare class IssueAlternativeName extends GeneralNames {
    constructor(items?: GeneralName[]);
}
