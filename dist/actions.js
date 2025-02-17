"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PREDEFINED_ACTIONS = exports.sendSms = exports.sendEmail = void 0;
const sendEmail = (email, message) => {
    console.log(`Sending EMAIL to ${email}`);
};
exports.sendEmail = sendEmail;
const sendSms = (phone_num, message) => {
    console.log(`Sending SMS to ${phone_num}`);
};
exports.sendSms = sendSms;
exports.PREDEFINED_ACTIONS = {
    send_email: exports.sendEmail,
    send_sms: exports.sendSms,
};
