export async function GetItems() {
  const res = await fetch("https://panda-market-api.vercel.app/products");
  const data = await res.json();
  return data;
}
