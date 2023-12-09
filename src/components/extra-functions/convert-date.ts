export const convertDate = (inputDateStr: string) => {
  const inputDate = new Date(inputDateStr);
  return inputDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
