export default function NewArticleForm() {
  return (
    <>
      <div className="h-11 flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">게시글 작성</h2>
        <button className="w-20 h-10 flex justify-center items-center bg-gray-default rounded-button text-white">
          등록
        </button>
      </div>
      <form className="flex flex-col gap-3">
        <label className="text-lg font-bold">*제목</label>
        <input
          className="h-14 mb-3 px-6 py-4 bg-gray-100 rounded-box"
          type="text"
          placeholder="제목을 입력해주세요"
        />

        <label className="text-lg font-bold">*내용</label>
        <textarea
          className="h-72 mb-3 px-6 py-4 bg-gray-100 rounded-box"
          placeholder="내용을 입력해주세요"
        />

        <label className="text-lg font-bold">이미지</label>
        <input
          className="w-72 h-72 mb-3 bg-gray-100 rounded-box"
          placeholder="이미지등록"
        />
      </form>
    </>
  );
}
