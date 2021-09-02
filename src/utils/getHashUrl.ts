export default function getHashUrl(viewHash: string = "", panelHash: string = ""): string {
  if (panelHash.slice(0, 1) === "#") {
    return panelHash.slice(1);
  }    
  return viewHash + panelHash;
}