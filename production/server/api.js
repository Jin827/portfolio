"use strict";var sgMail=require("@sendgrid/mail");sgMail.setApiKey(process.env.SENDGRID_API_KEY),module.exports={sendEmail:function(e){var n=e.name,r=e.email,o=e.subject,t=e.message,s={from:r,to:process.env.MY_EMAIL,subject:"Jiah Portfolio Message - "+o,html:"<p>Name: "+n+" <br/> Contact: "+r+"<br/><br/>"+t+"</p>"};return new Promise(function(e,n){return sgMail.send(s,function(e){})}).catch(function(e){})},replyEmail:function(e){var n=e.name,r={to:e.email,from:"noreply@jiahlee.webdeveloper",subject:"Auto reply message from Jiah Lee",html:"\n                <strong>Hello "+n+"</strong>,<br/><br/>\n                Thank you for getting in touch.<br/>\n                I will reply to you as soon as possible.<br/>\n                Thank you.<br/><br/>\n                Best,<br/><br/>\n                Jiah Lee\n              "};return new Promise(function(e,n){return sgMail.send(r,function(e){})}).catch(function(e){})}};
//# sourceMappingURL=maps/api.js.map