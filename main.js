import "./style.css";
import Split from "split-grid";
import { encode, decode } from "js-base64";

const $ = (selector) => document.querySelector(selector);
Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector(".vertical-gutter"),
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: document.querySelector(".horizontal-gutter"),
    },
  ],
});
const $html = $("#html");
const $js = $("#js");
const $css = $("#css");

$js.addEventListener("input", update);
$css.addEventListener("input", update);
$html.addEventListener("input", update);

function init() {
  const { pathname } = window.location;

  const [rawHtml, rawCss, rawJs] = pathname.slice(1).split("%7C");
  // console.log({html,css,js})

  const html = rawHtml ? decode(rawHtml) : '';
  const css = rawCss ? decode(rawCss) : '';
  const js = rawJs ? decode(rawJs) : '';
  console.log(js)
  $html.value = html;
  $css.value = css;
  $js.value = js;

  const htmlForPreview = createHtml({ html, js, css });
  $("iframe").setAttribute("srcdoc", htmlForPreview);
}

function update() {
  const html = $html.value;
  const css = $css.value;
  const js = $js.value;
  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`;
  console.log(hashedCode);
  window.history.replaceState(null, null, `/${hashedCode}`);

  const htmlForPreview = createHtml({ html, js, css });

  $("iframe").setAttribute("srcdoc", htmlForPreview);
}

const createHtml = ({ html, js, css }) => {
  return `

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        ${css}
      </style>
    </head>
    <body>
    ${html}
    <script>
      ${js}
    </script> 
    </body>
  </html>
    `;
};

init();
