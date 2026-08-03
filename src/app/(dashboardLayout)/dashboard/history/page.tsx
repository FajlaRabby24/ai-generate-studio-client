import HistoryComponent from "@/components/modules/dashboard/History/HistoryComponent";
import { getMyHistoryService } from "@/services/dashboard/history/history.service";
import { PageProps } from "@/types/general.types";
import { parseSearchParams } from "@/utils/queryString";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const HistoryPage = async ({ searchParams }: PageProps) => {
  const { queryObject } = await parseSearchParams(searchParams);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["history", queryObject],
    queryFn: () => getMyHistoryService(queryObject),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HistoryComponent initialQuery={queryObject} />
      </HydrationBoundary>
    </div>
  );
};

export default HistoryPage;
