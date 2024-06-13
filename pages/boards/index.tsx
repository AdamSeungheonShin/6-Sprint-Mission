import AllArticles from "@/components/Boards/AllArticles";
import BestArticles from "@/components/Boards/BestArticles";
import instance from "@/lib/axios";
import { Article } from "@/types";

const INITIAL_PAGE_NUM: number = 1;
const INITIAL_PAGE_SIZE: number = 10;
const INITIAL_ORDER: string = "recent";

export default function Boards({ articles }: { articles: Article[] }) {
  return (
    <div className="flex flex-col gap-10">
      <BestArticles />
      <AllArticles initialData={articles} />
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await instance.get("/articles", {
    params: {
      page: INITIAL_PAGE_NUM,
      pageSize: INITIAL_PAGE_SIZE,
      orderBy: INITIAL_ORDER,
    },
  });

  return {
    props: {
      articles: data?.list,
    },
  };
}
