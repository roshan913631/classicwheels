import { q as useQuery, e as useQueryClient, l as useMutation, k as useActor, m as createActor } from "./index-HwI002Ox.js";
function useBackendActor() {
  return useActor(createActor);
}
function useCars() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCars();
    },
    enabled: !!actor && !isFetching
  });
}
function useCar(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCar(id);
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useSubmitInquiry() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      carId,
      buyerName,
      buyerEmail,
      buyerPhone,
      message
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        carId,
        buyerName,
        buyerEmail,
        buyerPhone,
        message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    }
  });
}
export {
  useCar as a,
  useSubmitInquiry as b,
  useCars as u
};
