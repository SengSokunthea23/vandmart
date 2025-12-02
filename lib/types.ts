// Type definitions for the registration and payment system

export interface IUserForm {
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: string;
  phone?: string;
  note?: string;
  amount?: string;
}

export interface IUserValidateForm {
  firstname?: boolean;
  lastname?: boolean;
  email?: boolean;
  address?: boolean;
  amount?: boolean;
}

export interface IBillTo {
  email: string;
  address: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ICustomer {
  internalId: string;
  billTo: IBillTo;
  id?: string;
}

export interface IBakongData {
  hash: string;
  fromAccountId: string;
  toAccountId: string;
  currency: string;
  amount: string;
  description: string | null;
  createdDateMs: number;
  acknowledgedDateMs: number | null;
  trackingStatus: any;
  receiverBank: any;
  receiverBankAccount: any;
  instructionRef: any;
  externalRef: any;
}

export interface IBakongResponse {
  message: string;
  timestamp: string;
  status: string;
  data: {
    responseCode: number;
    responseMessage: string;
    errorCode: any;
    data: IBakongData | null;
  } | null;
}

export interface IQRCodeGeneratorResponse {
  data?: {
    qr: string;
    md5: string;
  };
}

export interface IInvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ICreateInvoicePayload {
  customer: string;
  status: string;
  items: IInvoiceItem[];
}
