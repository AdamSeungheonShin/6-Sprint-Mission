import axios from "@/lib/axios";
import { Article } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import iconArrow from "@/public/icons/icon_arrow_down.svg";
import formatDate from "@/utils/formatDate";
import heart_active from "@/public/images/heart_active.png";
import heart_inactive from "@/public/images/heart_inactive.png";
import imgProfile from "@/public/images/skeleton_profile.png";
import icon_search from "@/public/icons/icon_search.svg";
import useClickOutside from "@/hooks/useClickOutside";

const PAGE_SIZE_MAX = 10;

export default function AllArticles({
  articleData,
}: {
  articleData: Article[];
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [keyword, setKeyword] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const pathName: string = `/articles?${new URLSearchParams({
    page: pageNum.toString(),
    pageSize: PAGE_SIZE_MAX.toString(),
    orderBy: orderBy,
  })}`;

  useEffect(() => {
    async function getArticlesByPageNum() {
      try {
        const { data } = await axios.get(pathName);
        setArticles(data.list);
      } catch (e) {
        console.error("failed to fetch", e);
      }
    }

    getArticlesByPageNum();
  }, [pageNum, orderBy, keyword]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChangeOrderBy = (orderBy: string) => {
    setOrderBy(orderBy);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropDownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropDownRef, () => setShowDropdown(false));

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className=" text-xl text-gray-900 font-bold">게시글</h2>
        <Link
          className="w-20 h-10 flex justify-center items-center bg-blue-default rounded-button text-white hover:bg-hover-blue"
          href="/"
        >
          글쓰기
        </Link>
      </div>
      <form
        className="flex w-full h-11 justify-between gap-4 relative"
        onSubmit={handleSearch}
      >
        <input
          className="flex-grow bg-gray-100 rounded-box px-9 placeholder:text-sm"
          type="text"
          value={keyword}
          placeholder="검색할 상품을 입력해주세요"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Image
          src={icon_search}
          alt="게시글검색"
          width={24}
          height={24}
          className="text-white absolute top-auto left-2 translate-y-[45%]"
        />
        <div
          className="w-32 h-11 px-4 border-solid border-gray-200 border-[1px] rounded-box flex justify-between items-center gap-3 relative"
          ref={dropDownRef}
        >
          {orderBy === "recent" ? "최신순" : "좋아요순"}
          <Image
            className="transform rotate-0 transition-transform duration-300"
            style={{
              transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
            }}
            src={iconArrow}
            alt="게시물정렬"
            width={24}
            height={24}
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="w-32 absolute top-11 left-0 border-solid border-gray-200 border-[1px] rounded-box flex flex-col">
              <button
                className="w-32 h-11 hover:bg-hover-gray px-5 rounded-t-button"
                type="button"
                onClick={() => handleChangeOrderBy("recent")}
              >
                최신순
              </button>
              <button
                className="w-32 h-11 hover:bg-hover-gray px-5 rounded-b-button"
                type="button"
                onClick={() => handleChangeOrderBy("like")}
              >
                좋아요순
              </button>
            </div>
          )}
        </div>
      </form>
      <article className="">
        {articles &&
          articles
            .filter(
              (article) =>
                keyword === "" ||
                article.title.toLowerCase().includes(keyword.toLowerCase()) ||
                article.writer.nickname
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
            )
            .map(function (article) {
              return (
                <div
                  className="h-32 border-b-gray-200 border-solid border-b-[1px] pb-6 flex flex-col gap-4"
                  key={article.id}
                >
                  <div className="h-16 flex justify-between">
                    <Link
                      className="text-gray-800 font-semibold text-xl"
                      href={`/boards/${article.id}`}
                    >
                      {article.title}
                    </Link>
                    {article.image && (
                      <Image
                        height={72}
                        width={72}
                        src={article.image}
                        alt={article.title}
                      />
                    )}
                  </div>
                  <div className="flex text-gray-400 justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={imgProfile}
                        alt="testImage"
                        width={24}
                        height={24}
                      />
                      <p className="text-gray-600">{article.writer.nickname}</p>
                      <p>{formatDate(article.createdAt)}</p>
                    </div>
                    <div className="min-w-16 flex items-center gap-2">
                      <button>
                        <Image
                          width={24}
                          height={24}
                          src={heart_inactive}
                          alt="좋아요"
                        />
                      </button>
                      <p>{article.likeCount}</p>
                    </div>
                  </div>
                </div>
              );
            })}
      </article>
    </section>
  );
}
