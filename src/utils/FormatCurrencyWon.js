export function formatCurrencyWon(number) {
  const amount = Number(number).toLocaleString("ko-KR");
  const price = amount + "원";
  return price;
}
