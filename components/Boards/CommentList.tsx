import ProfileDefault from "@/public/images/profile_default.png";
import Image from "next/image";

export default function CommentList() {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <div>Content</div>
      <div className="flex items-center gap-2">
        <Image
          src={ProfileDefault}
          width={32}
          height={32}
          alt="댓글프로필이미지"
        />
        <div>
          <p className="text-gray-600">nickname</p>
          <p className="text-gray-400">times ago</p>
        </div>
      </div>
      <hr className="h-[1px] bg-gray-200" />
    </div>
  );
}
