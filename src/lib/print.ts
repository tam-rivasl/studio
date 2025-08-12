export function triggerPrint(lang: string) {
  if (typeof window === "undefined") return;
  const previousTitle = document.title;
  document.title = `cv-${lang}`;
  window.print();
  document.title = previousTitle;
}
