export interface EidasKeysInput {
  did: string;
  eidasQec: string; // hexadecimal string
}

export interface EidasKeysData extends EidasKeysInput {
  eidasQecId: string;
}
