(() => {
  // 1.日本語検出用
  const japaneseRegex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
  // 2. `anond:123456` 形式検出用（大文字小文字は無視）
  const anondRegex = /^anond:\d+$/i;
  // 3. ■記号（U+25A0）削除用
  const blackSquare = /\u25A0/g;

  document.querySelectorAll('div.section').forEach((section, idx) => {
    const h3 = section.querySelector('h3');
    if (!h3) return;

    // 元のテキスト
    const rawText = h3.innerText || h3.textContent;
    const text = rawText.trim();
    // ■を除いた「実質テキスト」
    const effectiveText = text.replace(blackSquare, '').trim();

    // 非表示にしない条件
    const keepVisible =
      effectiveText === '' ||                    // 1. 空
      japaneseRegex.test(effectiveText) ||       // 2. 日本語含む
      anondRegex.test(effectiveText);            // 3. anond:数字

    if (keepVisible) {
      // 非表示スキップ
      return;
    }

    // 上記に該当しない＝日本語もanond:数字もなければ非表示に
    console.log(
      `[%cHide Non-Japanese Sections%c] hiding section #${idx + 1}: "${text}"`,
      'color:#fff; background:#e74c3c; padding:2px 4px; border-radius:2px;',
      ''
    );
    section.style.display = 'none';
  });
})();
