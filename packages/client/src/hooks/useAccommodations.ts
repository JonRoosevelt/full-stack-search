import { useState, useEffect, useRef } from "react";

export type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};

export type City = { _id: string; name: string };

export type Country = {
  country: string;
  countryisocode: string;
};

type Accommodations = {
  hotels: Hotel[];
  countries: Country[];
  cities: City[];
};

const fetchData = async (
  value: string,
  apiUrl: string,
): Promise<Accommodations> => {
  const accommodationsData = await fetch(
    `${apiUrl}/accommodations?search=${value}`,
  );
  return accommodationsData.json();
};

export function useAccommodations(apiUrl: string) {
  const [accommodations, setAccommodations] = useState<Accommodations | null>(
    null,
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAccommodations = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (timeoutRef.current) {
      console.log("here");

      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      if (event.target.value === "") {
        setAccommodations(null);
        return;
      }
      const accommodationsData = await fetchData(event.target.value, apiUrl);
      setAccommodations(accommodationsData);
    }, 1000);
  };

  const handleClearAccomodations = () => {
    setAccommodations(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    accommodations,
    fetchAccommodations,
    clearAccommodations: handleClearAccomodations,
  };
}
