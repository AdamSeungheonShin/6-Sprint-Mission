import axios from "@/lib/axios";
import { Article } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import article_badge from "@/public/icons/icon_article_badge.svg";
import heart_active from "@/public/images/heart_active.png";
import heart_inactive from "@/public/images/heart_inactive.png";
import formatDate from "@/utils/formatDate";

const PAGE_SIZE = 3;
const ORDER_BY = "like";

export default function BestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);

  const pathName: string = `/articles?${new URLSearchParams({
    page: pageNum.toString(),
    pageSize: PAGE_SIZE.toString(),
    orderBy: ORDER_BY,
  })}`;

  async function getArticlesByPageNum() {
    try {
      const { data } = await axios.get(pathName);
      setArticles(data?.list);
    } catch (e) {
      console.error("failed to fetch", e);
    }
  }

  useEffect(() => {
    getArticlesByPageNum();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h2 className=" text-xl text-gray-900 font-bold">베스트 게시글</h2>
      <article className="w-[1200px] flex gap-6">
        {articles?.map(function (article) {
          return (
            <Link
              href={`/boards/${article.id}`}
              className="w-96 h-44 px-6 pb-4 bg-gray-50 rounded-box flex flex-col gap-4"
              key={article.id}
            >
              <Image
                width={102}
                height={30}
                src={article_badge}
                alt="베스트게시글뱃지"
              />
              <div className="h-20 flex gap-2">
                <p className="font-semibold">{article.title}</p>
                {article.image && (
                  <Image
                    height={72}
                    width={72}
                    src={article.image}
                    alt={article.title}
                  />
                )}
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-normal">
                <div className="flex items-center gap-1 ">
                  <p className="text-gray-600">{article.writer.nickname}</p>
                  <Image
                    width={16}
                    height={16}
                    src={heart_inactive}
                    alt="좋아요"
                  />
                  {article.likeCount}
                </div>
                <p>{formatDate(article.createdAt)}</p>
              </div>
            </Link>
          );
        })}
      </article>
    </section>
  );
}
