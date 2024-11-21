import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Accommodations } from "lib";
import { getAccommodations } from "../api/accommodations";

export function useAccommodations() {
  const [accommodations, setAccommodations] = useState<Accommodations | null>(
    null,
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (searchValue: string) => getAccommodations(searchValue),
    onSuccess: (data) => setAccommodations(data),
    onError: () => setAccommodations(null),
  });

  const fetchAccommodations = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      const value = event.target.value;
      if (value === "") {
        setAccommodations(null);
        return;
      }
      await mutateAsync(value);
    }, 1000);
  };

  const handleClearAccommodations = () => {
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
    clearAccommodations: handleClearAccommodations,
    isPending,
    isError,
  };
}
