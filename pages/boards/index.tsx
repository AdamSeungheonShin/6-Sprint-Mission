import AllArticles from "@/components/Boards/AllArticles";
import BestArticles from "@/components/Boards/BestArticles";
import instance from "@/lib/axios";
import { Article } from "@/types";

const PAGE_SIZE_MAX = 10;

export default function Boards({ articles }: { articles: Article[] }) {
  return (
    <div className="flex flex-col gap-10">
      <BestArticles />
      <AllArticles articleData={articles} />
    </div>
  );
}

export async function getServerSideProps() {
  const { data: articles } = await instance.get(
    `/articles?page=1&pageSize=10&orderBy=recent`
  );
  return {
    props: {
      articles,
    },
  };
}
