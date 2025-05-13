'use server';
import ky from 'ky';

export async function getEmail(values: { email: string, password: string, proxy?: string }) {
  const res = await ky.get(
    values.proxy
      ? `http://120.78.1.125:8000/email/${values.password}/${values.email}?proxy=${values.proxy}`
      : `http://120.78.1.125:8000/email/${values.password}/${values.email}`,
    {
      timeout: 120000, // 2 minutes timeout
    },
  ).text();
  return res;
}
