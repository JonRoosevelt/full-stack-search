import { useQuery } from "@tanstack/react-query";
import { getCity } from "../api/cities";
import { City } from "lib";

export function useCities(id: string) {
  const { isPending, error, data, isFetching } = useQuery<City>({
    queryKey: ["cities", id],
    queryFn: () => getCity(id),
  });

  return { isPending, error, data, isFetching };
}
