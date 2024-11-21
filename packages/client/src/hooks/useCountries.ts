import { useQuery } from "@tanstack/react-query";
import { Country } from "lib";
import { getCountry } from "../api/countries";

export function useCountries(id: string) {
  const { isPending, error, data, isFetching } = useQuery<Country>({
    queryKey: ["countries", id],
    queryFn: () => getCountry(id),
  });

  return { isPending, error, data, isFetching };
}
