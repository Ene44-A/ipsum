import { Resend } from 'resend';
//                        re_iaCz4wcF_QBPGXQp6zXPc7jdEqCasnLoY
const resend = new Resend('re_iaCz4wcF_QBPGXQp6zXPc7jdEqCasnLoY');

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['xjorgex2011@live.com'],
    subject: 'Bienvenido, te dice WePlot',
    html: '<strong>Para nosotros es de gran agradaecimiento que hagas parte de esta familia</strong>',
  });

  if (error) {
    return console.error({ error });
  }
  console.log({ data });
})();


