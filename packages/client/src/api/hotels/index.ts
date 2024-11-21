import { API_URL } from "../apiUrl";

export async function getHotel(id: string) {
  const response = await fetch(`${API_URL}/accommodations/hotels/${id}`);

  return await response.json();
}
