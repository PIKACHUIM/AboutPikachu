import { Hono } from 'hono';
import { homepage } from './pages/home';
import { resumeHTML, resumePDF } from './pages/resume';
import { gpgKey, sshKey, rootCa, testCa } from './pages/keys';
import pikaJpg from './assets/pika.jpg';

const app = new Hono();

app.get('/', (c) => c.html(homepage()));
app.get('/resume', (c) => c.html(resumeHTML));
app.get('/resume.pdf', resumePDF);

// Public keys & certificates
app.get('/gpg.key', gpgKey);
app.get('/ssh.key', sshKey);
app.get('/rootca.crt', rootCa);
app.get('/testca.crt', testCa);

// Avatar
app.get('/images/pika.jpg', (c) =>
  c.body(pikaJpg as ArrayBuffer, 200, {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'public, max-age=86400',
  })
);

export default app;