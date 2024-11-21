import { API_URL } from "../apiUrl";

export async function getCountry(id: string) {
  const response = await fetch(`${API_URL}/countries/${id}`);

  return await response.json();
}
