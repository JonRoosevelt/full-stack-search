import { API_URL } from "../apiUrl";

export async function getCountry(id: string) {
  const response = await fetch(`${API_URL}/accommodations/countries/${id}`);

  return await response.json();
}
