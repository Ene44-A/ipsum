import { Resend } from 'resend';
//                        re_iaCz4wcF_QBPGXQp6zXPc7jdEqCasnLoY
const resend = new Resend('re_iaCz4wcF_QBPGXQp6zXPc7jdEqCasnLoY');

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['xjorgex2011@live.com'],
    subject: 'Hola Pancho',
    html: '<strong>Chupelo pai</strong>',
  });

  if (error) {
    return console.error({ error });
  }
  console.log({ data });
})();


