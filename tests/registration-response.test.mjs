import test from 'node:test';
import assert from 'node:assert/strict';
import { readRegistrationResponse, unconfirmedMessage } from '../lib/registration-response.mjs';
for (const [name, response] of [
  ['HTML gateway error', new Response('<html>Bad Gateway</html>', {status:502})],
  ['empty response', new Response('')],
  ['JSON null', new Response('null')],
  ['missing upload confirmation', Response.json({reference:'HPI-1234ABCD'})],
  ['server failure', Response.json({error:'internal error'}, {status:500})],
  ['mobile response read failure', {text:async()=>{throw new DOMException('The string did not match the expected pattern.', 'SyntaxError')}}],
]) test(name, async()=>assert.rejects(readRegistrationResponse(response), {message:unconfirmedMessage}));
test('confirmed resume receipt', async()=>assert.equal(await readRegistrationResponse(Response.json({reference:'HPI-1234ABCD',resumeReceived:true},{status:201})), 'HPI-1234ABCD'));
test('actionable validation error', async()=>assert.rejects(readRegistrationResponse(Response.json({error:'Please upload your résumé to register.'},{status:400})), {message:'Please upload your résumé to register.'}));
