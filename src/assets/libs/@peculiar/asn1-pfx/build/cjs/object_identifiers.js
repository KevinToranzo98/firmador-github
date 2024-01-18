"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id_bagtypes = exports.id_pbewithSHAAnd40BitRC2_CBC = exports.id_pbeWithSHAAnd128BitRC2_CBC = exports.id_pbeWithSHAAnd2_KeyTripleDES_CBC = exports.id_pbeWithSHAAnd3_KeyTripleDES_CBC = exports.id_pbeWithSHAAnd40BitRC4 = exports.id_pbeWithSHAAnd128BitRC4 = exports.id_pkcs_12PbeIds = exports.id_pkcs_12 = exports.id_pkcs = exports.id_rsadsi = void 0;
exports.id_rsadsi = "1.2.840.113549";
exports.id_pkcs = `${exports.id_rsadsi}.1`;
exports.id_pkcs_12 = `${exports.id_pkcs}.12`;
exports.id_pkcs_12PbeIds = `${exports.id_pkcs_12}.1`;
exports.id_pbeWithSHAAnd128BitRC4 = `${exports.id_pkcs_12PbeIds}.1`;
exports.id_pbeWithSHAAnd40BitRC4 = `${exports.id_pkcs_12PbeIds}.2`;
exports.id_pbeWithSHAAnd3_KeyTripleDES_CBC = `${exports.id_pkcs_12PbeIds}.3`;
exports.id_pbeWithSHAAnd2_KeyTripleDES_CBC = `${exports.id_pkcs_12PbeIds}.4`;
exports.id_pbeWithSHAAnd128BitRC2_CBC = `${exports.id_pkcs_12PbeIds}.5`;
exports.id_pbewithSHAAnd40BitRC2_CBC = `${exports.id_pkcs_12PbeIds}.6`;
exports.id_bagtypes = `${exports.id_pkcs_12}.10.1`;