import { d as useInternetIdentity, q as useQuery, e as useQueryClient, l as useMutation, k as useActor, m as createActor } from "./index-HwI002Ox.js";
function useBackendActor() {
  return useActor(createActor);
}
function useSubmitOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected to backend");
      const result = await actor.submitOrder(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
function useOrderById(orderId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOrderById(orderId);
    },
    enabled: !!actor && !isFetching && !!orderId
  });
}
function useGetOrders() {
  const { actor, isFetching } = useBackendActor();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function useUpdateOrderStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateOrderStatus(orderId, status);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
function useDeleteOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteOrder(orderId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
export {
  useUpdateOrderStatus as a,
  useDeleteOrder as b,
  useSubmitOrder as c,
  useOrderById as d,
  useGetOrders as u
};
