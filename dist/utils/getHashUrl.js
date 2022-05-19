"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHashUrl(viewHash = "", panelHash = "") {
    if (panelHash.slice(0, 1) === "#") {
        return panelHash.slice(1);
    }
    return viewHash + panelHash;
}
exports.default = getHashUrl;
