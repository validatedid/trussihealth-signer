export interface IError {
  title: string;
  status: number;
  detail: string;
}

class HTTPError extends Error {
  constructor(
    protected title: string,
    protected status: number,
    protected detail: string,
  ) {
    super(title);
    this.name = 'HTTPError';
    this.title = title;
    this.status = status;
    this.detail = detail;
  }

  get Name(): string {
    return this.name;
  }

  get Title(): string {
    return this.title;
  }

  get Status(): number {
    return this.status;
  }

  get Detail(): string {
    return this.detail;
  }

  print(): IError {
    return {
      title: this.title,
      status: this.status,
      detail: this.detail,
    };
  }
}

export default HTTPError;
