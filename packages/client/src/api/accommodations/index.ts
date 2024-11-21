import { Accommodations } from "lib";
import { API_URL } from "../apiUrl";

export async function getAccommodations(
  value: string,
): Promise<Accommodations> {
  const accommodationsData = await fetch(
    `${API_URL}/accommodations?search=${value}`,
  );
  return accommodationsData.json();
}
