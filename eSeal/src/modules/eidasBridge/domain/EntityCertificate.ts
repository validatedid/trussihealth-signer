export default class EntityCertificate {
  constructor(
    private id: number,
    private entityDidId: number,
    private certificate: string,
  ) {}

  updateCertificate(eidasQec: string): void {
    this.certificate = eidasQec;
  }

  get idValue(): number {
    return this.id;
  }

  get entityDidIdValue(): number {
    return this.entityDidId;
  }

  get certificateValue(): string {
    return this.certificate;
  }
}
