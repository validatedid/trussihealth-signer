export interface EntityData {
  did: string;
  data: KeyData;
  name: string;
}

export interface KeyData {
  key?: string;
}

export interface EntityKeyPair {
  did: string;
  data: KeyPairData;
}

export interface KeyPairData {
  key?: string;
}
