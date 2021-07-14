export default function getHashUrl(viewHash = "", panelHash = "") {
  if (panelHash.slice(0, 2) === "./") {
    return viewHash + panelHash.slice(1);
  } 
  if (panelHash.slice(0, 1) === "/") {
    return panelHash.slice(1);
  } 
  return viewHash + panelHash;
}