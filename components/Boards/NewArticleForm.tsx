import { ChangeEvent, FormEvent, useState } from "react";
import ImageInput from "./ImageInput";
import postArticle from "@/lib/postArticle";
import { useRouter } from "next/router";

interface Values {
  title: string;
  content: string;
  image?: File | undefined;
}

export default function NewArticleForm() {
  const [values, setValues] = useState<Values>({
    title: "",
    content: "",
    image: undefined,
  });

  const router = useRouter();

  const handleChangeValues = (
    name: string,
    value: File | string | undefined
  ): void => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChangeValues(name, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postArticle(values, values.image);
    router.push("/boards");
  };

  return (
    <>
      <div className="h-11 flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">게시글 작성</h2>
        <button
          className={`w-20 h-10 flex justify-center items-center rounded-button text-white ${
            values.title.trim() && values.content.trim()
              ? "bg-blue-default"
              : "bg-gray-default cursor-not-allowed"
          }`}
          disabled={!values.title.trim() || !values.content.trim()}
          type="submit"
          form="article"
        >
          등록
        </button>
      </div>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
        id="article"
      >
        <label className="text-lg font-bold" htmlFor="title">
          *제목
        </label>
        <input
          className="h-14 mb-3 px-6 py-4 bg-gray-100 rounded-box"
          placeholder="제목을 입력해주세요"
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleInputChange}
        />
        <label className="text-lg font-bold" htmlFor="content">
          *내용
        </label>
        <textarea
          className="h-72 mb-3 px-6 py-4 bg-gray-100 rounded-box"
          placeholder="내용을 입력해주세요"
          id="content"
          name="content"
          value={values.content}
          onChange={handleInputChange}
        />
        <h2 className="text-lg font-bold">이미지</h2>
        <ImageInput
          name="image"
          value={values.image}
          onChange={handleChangeValues}
        />
      </form>
    </>
  );
}
