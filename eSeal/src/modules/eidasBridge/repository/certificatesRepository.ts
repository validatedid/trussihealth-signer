import { Injectable } from '@nestjs/common';
import EntityCertificate from '../domain/EntityCertificate';
import {CERTIFICATE} from "../../../config";

@Injectable()
export default class CertificatesRepository {
  constructor() {}

  loadCertificate =  (): string => {
    return CERTIFICATE;
  };
}
