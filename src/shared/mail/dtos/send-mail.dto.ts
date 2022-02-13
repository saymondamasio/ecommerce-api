interface ITemplateVariables {
  [key: string]: string | number;
}

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  context: ITemplateVariables;
}
