import axios from 'axios';

const SENDGRID_API_KEY = '';

export const sendEmail = async (recipient, subject, body) => {
  try {
    const response = await axios.post(
      '',
      {
        personalizations: [{to: [{email: recipient}]}],
        from: {email: ''},
        subject,
        content: [{type: 'text/plain', value: body}],
      },
      {
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.status === 1;
  } catch (error) {
    console.error('Email sending failed', error);
    return false;
  }
};
