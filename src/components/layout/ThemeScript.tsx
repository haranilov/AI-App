/** Inline script to apply stored theme before paint (prevents flash). */
export function ThemeScript() {
  const script = `(function(){try{var k="hookai-theme";var t=localStorage.getItem(k);var d=t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
