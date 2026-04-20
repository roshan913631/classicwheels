import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Order, OrderInput } from "../backend.d";

function useBackendActor() {
  return useActor(createActor);
}

export function useSubmitOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<string, Error, OrderInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected to backend");
      const result = await actor.submitOrder(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useOrderById(orderId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOrderById(orderId);
    },
    enabled: !!actor && !isFetching && !!orderId,
  });
}

export function useGetOrders() {
  const { actor, isFetching } = useBackendActor();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

// Alias for backward compat
export const useOrders = useGetOrders;

export function useUpdateOrderStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { orderId: string; status: string }>({
    mutationFn: async ({ orderId, status }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateOrderStatus(orderId, status);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useDeleteOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteOrder(orderId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
