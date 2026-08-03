import HistoryComponent from "@/components/modules/dashboard/History/HistoryComponent";
import { PageProps } from "@/types/general.types";
import { parseSearchParams } from "@/utils/queryString";

const HistoryPage = async ({ searchParams }: PageProps) => {
  const { queryObject } = await parseSearchParams(searchParams);

  return (
    <div>
      <HistoryComponent initialQuery={queryObject} />
    </div>
  );
};

export default HistoryPage;
