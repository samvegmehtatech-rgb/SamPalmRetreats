import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Sends a booking confirmation email to the guest.
 * Silently fails — a broken email should never block the booking save.
 */
export async function sendConfirmationEmail({ name, email, checkin, checkout, guests, pkg, requests }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) return

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email:   email,
        guest_name: name,
        package:    pkg,
        checkin,
        checkout,
        guests,
        requests:   requests || 'None',
      },
      PUBLIC_KEY
    )
  } catch {
    // Email failure is non-blocking
  }
}
