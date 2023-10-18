import { Injectable } from '@nestjs/common';
import * as Mailjet from 'node-mailjet';

@Injectable()
export class MailService {
    private mailer:Mailjet.Client;

    constructor(){
        this.mailer=new Mailjet.Client({
            apiKey:"626b4606d6289eea26f74518dd4ded48",
            apiSecret:"c8ab81bb4a35c10625f2f1094c477349"
        });
    }

    async sendEmail({firstName,lastName,email,context,verifyCode}){
        let Subject:string;
        let TextPart:string;
        let HTMLPart:string;

            if (context=="signup") {
            Subject=`Aydın Dijital Sinemasına Hoşgeldiniz!`
            TextPart=`Merhaba ${firstName} ${lastName} . Email Onay Kodunuz = ${verifyCode}`
            HTMLPart=`
            Sevgili <h3> ${firstName} ${lastName} </h3> <br>
            Dogrulama kodunuz : <b> ${verifyCode} </b>
            `
        }

        return this.mailer.post('send',{ version: 'v3.1' }).request({
            Messages:[
                {
                    From:{
                        Email:'16008118043@ogr.bozok.edu.tr',
                        Name:'Aydın Dijital Sinema'
                    },
                    To:[
                        {
                            Email:email,
                            Name:firstName
                        }
                    ],
                    Subject,
                    TextPart,
                    HTMLPart
                }
            ]
        });
    }
}
