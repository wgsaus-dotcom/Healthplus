// Never expose browser parser/network errors or an HTML error page to applicants.
export const unconfirmedMessage = "We could not confirm your registration. Your details are still on this page. Please contact HPI on WhatsApp before submitting again so we can check whether it was received.";
export async function readRegistrationResponse(response) {
  let result;
  try {
    result = JSON.parse(await response.text());
  } catch {
    throw new Error(unconfirmedMessage);
  }
  if (!result || typeof result !== 'object') throw new Error(unconfirmedMessage);
  if (!response.ok) {
    // Only display known validation responses. Other failures may occur after storage.
    const message = response.status === 400 && typeof result.error === 'string'
      ? result.error : unconfirmedMessage;
    throw new Error(message);
  }
  if (typeof result.reference !== 'string' || !/^HPI-[A-Z0-9]{8}$/.test(result.reference) || result.resumeReceived !== true) {
    throw new Error(unconfirmedMessage);
  }
  return result.reference;
}
