import { authClient } from "@/lib/auth-client";

export const authFetch = async (url, options = {}) => {
  const { data } = await authClient.token();

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${data?.token}`,
    },
  });
};