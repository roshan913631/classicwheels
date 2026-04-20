import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Car } from "../backend.d";

function useBackendActor() {
  return useActor(createActor);
}

export function useCars() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Car[]>({
    queryKey: ["cars"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCars();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCar(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Car | null>({
    queryKey: ["car", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCar(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useSubmitInquiry() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    string,
    Error,
    {
      carId: string;
      buyerName: string;
      buyerEmail: string;
      buyerPhone: string;
      message: string;
    }
  >({
    mutationFn: async ({
      carId,
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        carId,
        buyerName,
        buyerEmail,
        buyerPhone,
        message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
