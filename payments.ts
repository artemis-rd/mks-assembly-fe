export class Transaction {
    TransactionType: string;
    TransID: string;
    TransTime: string;
    TransAmount: string;
    BusinessShortCode: string;
    BillRefNumber: string;
    MSISDN: string;
    FirstName: string;

}
// exposes the payments list response
export class PaymentsListResponse {
    page: number;
    perPage: number;
    paymentsCount: number;
    paymentsList: Transaction; // this should not be a string but rather a transaction object
}

