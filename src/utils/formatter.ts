// 숫자 세 자리마다 쉼표를 추가
export const numberFormatter = (number: number | string | undefined) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
