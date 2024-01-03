import { z } from "zod";

const searchParamsSchema = z.object({
  id: z.coerce.number(),
});
const ServerComProduct = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const parsedSearchParams = searchParamsSchema.safeParse(searchParams);
  return <></>;
};

export default ServerComProduct;
