import { ChangeEvent, FormEvent, useState } from "react";

export default function NewArticleForm() {
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO 테스트용, 삭제예정
    console.log(values.title);
    console.log(values.content);
    console.log(values.image);
  };

  return (
    <>
      <div className="h-11 flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">게시글 작성</h2>
        <button
          className="w-20 h-10 flex justify-center items-center bg-gray-default rounded-button text-white"
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
        <label className="text-lg font-bold" htmlFor="image">
          이미지
        </label>
        <input
          className="w-72 h-72 mb-3 bg-gray-100 rounded-box"
          placeholder="이미지등록"
          type="file"
          id="image"
          name="imageForArticle"
        />
      </form>
    </>
  );
}
