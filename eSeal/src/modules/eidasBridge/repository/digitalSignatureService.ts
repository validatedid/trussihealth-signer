import axios from 'axios';
import {
  DssVerificationInput,
  DssVerificationOutput,
} from '../domain/dtos/dss';
import { removePemHeader } from '../utils/util';
import {DSS_URL} from "../../../config";

export default class DigitalSignatureService {
  constructor(private eContentUrl: string) {
    this.eContentUrl = DSS_URL.ORIGINAL_DOCUMENTS;
  }

  async getEcontent(pemCades: string): Promise<string> {
    const dssInput = {
      signedDocument: {
        bytes: removePemHeader(pemCades),
        digestAlgorithm: null,
        name: null,
      },
      originalDocuments: null,
      policy: null,
      tokenExtractionStrategy: 'NONE',
      signatureId: null,
    };
    const response = await axios.post(DSS_URL.ORIGINAL_DOCUMENTS, dssInput);
    return ((response.data as Array<unknown>)[0] as { bytes: string }).bytes;
  }
}
