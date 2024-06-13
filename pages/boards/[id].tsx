import ProfileDefault from "@/public/images/profile_default.png";
import ImageDefault from "@/public/images/img_default.png";
import heart_active from "@/public/images/heart_active.png";
import heart_inactive from "@/public/images/heart_inactive.png";
import IconReturn from "@/public/icons/icon_return.svg";
import Image from "next/image";
import Link from "next/link";
import instance from "@/lib/axios";
import { GetServerSidePropsContext } from "next";
import { Article, Comment } from "@/types";
import formatDate from "@/utils/formatDate";
import CommentList from "@/components/Boards/CommentList";
import { ChangeEvent, FormEvent, useState } from "react";

const COMMENTS_MAX = 5;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id;

  const res = await Promise.allSettled([
    instance.get(`/articles/${id}`),
    instance.get(`/articles/${id}/comments?limit=${COMMENTS_MAX}`),
  ]);

  const article: Article =
    res[0].status === "fulfilled" ? res[0].value.data : {};
  const comments: Comment[] =
    res[1].status === "fulfilled" ? res[1].value.data.list : [];

  return {
    props: {
      article,
      comments,
    },
  };
}

export default function Article({
  article,
  comments,
}: {
  article: Article;
  comments: Comment[];
}) {
  const [commentText, setCommentText] = useState<string>("");

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(commentText);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800">{article.title}</h2>
        <div className="flex gap-2 items-center">
          <Image
            src={ProfileDefault}
            width={24}
            height={24}
            alt="작성자 프로필"
          />
          <p className="text-sm font-normal text-gray-600">
            {article.writer.nickname}
          </p>
          <p className="text-xs font-normal text-gray-400">
            {formatDate(article.createdAt)}
          </p>
          <div className="w-[1px] h-full border-solid border-[1px] border-gray" />
          <Image
            src={heart_inactive}
            width={24}
            height={24}
            alt="게시물 좋아요"
          />
          <p className="text-sm font-normal text-gray-600">
            {article.likeCount}
          </p>
        </div>
        <hr className="h-[1px] bg-gray-200" />
        <div className="h-[600px] flex justify-between gap-10 mt-8">
          <div className="w-[600px]">
            <Image
              className="w-[600px] h-[600px] rounded-box object-contain"
              src={article.image ? article.image : ImageDefault}
              width={600}
              height={600}
              alt="게시글이미지"
            />
          </div>
          <div className="text-base font-normal text-gray-800 w-[600px]">
            {article.content}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitComment}
          id="comment"
        >
          <label
            className="text-base font-semibold text-gray-800"
            htmlFor="comment"
          >
            댓글 달기
          </label>
          <textarea
            className="resize-none w-full h-28 px-6 py-4 bg-gray-100 rounded-box"
            placeholder="댓글을 입력해주세요."
            id="comment"
            name="comment"
            value={commentText}
            onChange={handleChangeComment}
          />
          <button
            className={`w-20 h-10 flex justify-center items-center rounded-button text-white ml-auto ${
              commentText.trim()
                ? "bg-blue-default"
                : "bg-gray-default cursor-not-allowed"
            } `}
            disabled={!commentText.trim()}
            type="submit"
            form="comment"
          >
            등록
          </button>
        </form>
        <CommentList comments={comments} />
        <Link
          className="w-60 h-12 bg-blue-default rounded-full flex justify-center items-center gap-2 mx-auto"
          href="/boards"
        >
          <p className="text-base font-normal text-white">목록으로 돌아가기</p>
          <Image
            src={IconReturn}
            width={24}
            height={24}
            alt="목록으로돌아가기"
          />
        </Link>
      </div>
    </div>
  );
}
