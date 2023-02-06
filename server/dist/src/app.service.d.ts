import * as sg from '@sendgrid/mail';
export declare class AppService {
    constructor();
    oAuth2(): Promise<any>;
    getHello(): any;
    sendEmail(): Promise<[sg.ClientResponse, {}]>;
}
