const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://syed-furqan-portfolio-backend-production.up.railway.app/api';

export async function sendContactMessage(payload) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Unable to send message. Please try again.');
  }

  return data;
}
