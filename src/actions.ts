export const sendEmail = (email: string, message?: string) => {
  console.log(`Sending EMAIL to ${email}`);
};

export const sendSms = (phone_num: string, message?: string) => {
  console.log(`Sending SMS to ${phone_num}`);
};

export const PREDEFINED_ACTIONS: { [key: string]: Function } = {
  send_email: sendEmail,
  send_sms: sendSms,
};
