/** Runs before paint — full reload always opens at the top. */
export const scrollInitScript = `
(function () {
  try {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  } catch (e) {}
})();
`;
