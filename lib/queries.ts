import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getArticle } from "./article";

const query = createQueryKeyStore({
  article: {
    getArticle: (articleId: number) => ({
      queryKey: [articleId],
      queryFn: () => getArticle(articleId),
    }),
  },
});

export default query;
