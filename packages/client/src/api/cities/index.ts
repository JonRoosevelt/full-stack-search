import { API_URL } from "../apiUrl";

export async function getCity(id: string) {
  const response = await fetch(`${API_URL}/cities/${id}`);

  return await response.json();
}
