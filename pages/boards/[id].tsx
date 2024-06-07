import imgProfile from "@/public/images/skeleton_profile.png";
import heart_active from "@/public/images/heart_active.png";
import heart_inactive from "@/public/images/heart_inactive.png";
import IconReturn from "@/public/icons/icon_return.svg";
import Image from "next/image";
import Link from "next/link";
import instance from "@/lib/axios";
import { GetServerSidePropsContext } from "next";
import { Article } from "@/types";
import { useState } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id;

  const res = await instance.get(`/articles/${id}`);
  const article = res.data ?? [];
  return {
    props: {
      article,
    },
  };
}

export default function Article({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-16">
      <div className="h-32 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800">{article.title}</h2>
        <div className="flex gap-2 items-center">
          <Image src={imgProfile} width={24} height={24} alt="작성자 프로필" />
          <p className="text-sm font-normal text-gray-600">Nickname</p>
          <p className="text-xs font-normal text-gray-400">0000. 00. 00</p>
          <div className="w-[1px] h-full border-solid border-[1px] border-gray" />
          <Image
            src={heart_inactive}
            width={24}
            height={24}
            alt="게시물 좋아요"
          />
          <p className="text-sm font-normal text-gray-600">999+</p>
        </div>
        <hr className="h-[1px] bg-gray-200" />
        <p className="text-base font-normal text-gray-800">Content</p>
      </div>
      <div>
        <div className="flex flex-col gap-4">
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
          />
        </div>
        <div>Comment List</div>
        <Link
          className="w-60 h-12 bg-blue-default rounded-full flex justify-center items-center gap-2"
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
