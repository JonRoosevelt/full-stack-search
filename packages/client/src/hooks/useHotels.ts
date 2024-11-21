import { useQuery } from "@tanstack/react-query";
import { getHotel } from "../api/hotels";
import { Hotel } from "lib";

export function useHotels(id: string) {
  const { isPending, error, data, isFetching } = useQuery<Hotel>({
    queryKey: ["hotels", id],
    queryFn: () => getHotel(id),
  });

  return { isPending, error, data, isFetching };
}
