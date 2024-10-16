export function useShortenText() {
  const shortenText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return {
    shortenText,
  };
}