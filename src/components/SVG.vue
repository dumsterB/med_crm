<template>
  <svg
    id="svg-sprite"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="display: none">
    <symbol :id="$options.icons.LOGOUT" viewBox="0 0 24 20" fill="none">
      <path
        d="M17.0711 17.0708C17.4616 16.6803 17.4616 16.0471 17.0711 15.6566C16.6805 15.2661 16.0474 15.2661 15.6569 15.6566L17.0711 17.0708ZM15.6569 4.3429C16.0474 4.73343 16.6805 4.73343 17.0711 4.3429C17.4616 3.95238 17.4616 3.31921 17.0711 2.92869L15.6569 4.3429ZM20.7474 6.33564C20.3805 5.92285 19.7484 5.88567 19.3357 6.25259C18.9229 6.61951 18.8857 7.25158 19.2526 7.66436L20.7474 6.33564ZM22.6667 10L23.4141 10.6644C23.7509 10.2855 23.7509 9.71452 23.4141 9.33564L22.6667 10ZM19.2526 12.3356C18.8857 12.7484 18.9229 13.3805 19.3357 13.7474C19.7484 14.1143 20.3805 14.0771 20.7474 13.6644L19.2526 12.3356ZM22.5 11C23.0523 11 23.5 10.5523 23.5 10C23.5 9.44771 23.0523 9 22.5 9V11ZM10 9C9.44773 9 9.00002 9.44771 9.00002 10C9.00002 10.5523 9.44773 11 10 11V9ZM2.92893 2.92869C-0.976311 6.83393 -0.976311 13.1656 2.92893 17.0708L4.34315 15.6566C1.21895 12.5324 1.21895 7.4671 4.34315 4.3429L2.92893 2.92869ZM2.92893 17.0708C6.83418 20.9761 13.1658 20.9761 17.0711 17.0708L15.6569 15.6566C12.5327 18.7808 7.46734 18.7808 4.34315 15.6566L2.92893 17.0708ZM17.0711 2.92869C13.1658 -0.976555 6.83418 -0.976555 2.92893 2.92869L4.34315 4.3429C7.46734 1.21871 12.5327 1.21871 15.6569 4.3429L17.0711 2.92869ZM19.2526 7.66436L21.9193 10.6644L23.4141 9.33564L20.7474 6.33564L19.2526 7.66436ZM21.9193 9.33564L19.2526 12.3356L20.7474 13.6644L23.4141 10.6644L21.9193 9.33564ZM22.5 9H10V11H22.5V9Z"
        fill="currentColor" />
    </symbol>

    <symbol :id="$options.icons.DASHBOARD" viewBox="0 0 23 24" fill="none">
      <path
        d="M20.2718 15.8158C19.6608 17.3283 18.689 18.6683 17.4412 19.719C16.1935 20.7697 14.7076 21.4992 13.1132 21.8439C11.5189 22.1886 9.86436 22.1381 8.294 21.6967C6.72363 21.2553 5.28509 20.4364 4.1038 19.3115C2.92252 18.1865 2.03436 16.7897 1.51676 15.2428C0.99917 13.6959 0.867859 12.0458 1.13428 10.4365C1.4007 8.82717 2.05677 7.30746 3.04527 6.00986C4.03377 4.71227 5.3247 3.67619 6.80548 2.99197M15.8268 1.83095C15.0768 1.52028 14.2935 1.30281 13.4944 1.18204C12.6753 1.05824 12 1.74132 12 2.56975L12 9.56975C12 10.3982 12.6716 11.0697 13.5 11.0697L20.5 11.0698C21.3284 11.0698 22.0115 10.3945 21.8877 9.57536C21.7669 8.77628 21.5495 7.99296 21.2388 7.24292C20.7363 6.02966 19.9997 4.92727 19.0711 3.99868C18.1425 3.0701 17.0401 2.3335 15.8268 1.83095Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round" />
    </symbol>

    <symbol :id="$options.icons.USER_TAG" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97998C3 3.33998 4.34 2.01001 6 2.01001H18C19.66 2.01001 21 3.33998 21 4.97998V15.89C21 17.52 19.66 18.86 18 18.86Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M12.0019 10C13.2887 10 14.3319 8.95681 14.3319 7.66998C14.3319 6.38316 13.2887 5.34003 12.0019 5.34003C10.7151 5.34003 9.67188 6.38316 9.67188 7.66998C9.67188 8.95681 10.7151 10 12.0019 10Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M16 15.66C16 13.86 14.21 12.4 12 12.4C9.79 12.4 8 13.86 8 15.66"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </symbol>

    <symbol :id="$options.icons.NOTE" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2V5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M16 2V5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M21 8.5V13.63C20.11 12.92 18.98 12.5 17.75 12.5C16.52 12.5 15.37 12.93 14.47 13.66C13.26 14.61 12.5 16.1 12.5 17.75C12.5 18.73 12.78 19.67 13.26 20.45C13.63 21.06 14.11 21.59 14.68 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M7 11H13"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M7 16H9.62"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M23 17.75C23 18.73 22.72 19.67 22.24 20.45C21.96 20.93 21.61 21.35 21.2 21.69C20.28 22.51 19.08 23 17.75 23C16.6 23 15.54 22.63 14.68 22C14.11 21.59 13.63 21.06 13.26 20.45C12.78 19.67 12.5 18.73 12.5 17.75C12.5 16.1 13.26 14.61 14.47 13.66C15.37 12.93 16.52 12.5 17.75 12.5C18.98 12.5 20.11 12.92 21 13.63C22.22 14.59 23 16.08 23 17.75Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M17.75 20.25C17.75 18.87 18.87 17.75 20.25 17.75C18.87 17.75 17.75 16.63 17.75 15.25C17.75 16.63 16.63 17.75 15.25 17.75C16.63 17.75 17.75 18.87 17.75 20.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </symbol>

    <symbol :id="$options.icons.BOARD" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.9292 6.76001L18.5592 20.29C18.3192 21.3 17.4192 22 16.3792 22H3.23915C1.72915 22 0.649169 20.5199 1.09917 19.0699L5.30916 5.55005C5.59916 4.61005 6.46917 3.95996 7.44917 3.95996H19.7492C20.6992 3.95996 21.4892 4.53997 21.8192 5.33997C22.0092 5.76997 22.0492 6.26001 21.9292 6.76001Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10" />
      <path
        d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M9.67969 6.38L10.7197 2.06006"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M16.3789 6.39001L17.3189 2.05005"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M7.69922 12H15.6992"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M6.69922 16H14.6992"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </symbol>

    <symbol :id="$options.icons.SEARCH" viewBox="0 0 24 24" fill="none">
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </symbol>

    <symbol :id="$options.icons.BELL" viewBox="0 0 26 23" fill="none">
      <path
        d="M20.3333 8.01449C20.3333 6.15413 19.5607 4.36997 18.1855 3.0545C16.8102 1.73902 14.9449 1 13 1C11.0551 1 9.18982 1.73902 7.81455 3.0545C6.43928 4.36997 5.66667 6.15413 5.66667 8.01449C5.66667 13.9484 3.21304 16.809 1.86406 17.9333C1.6615 18.1021 1.79337 18.5362 2.05706 18.5362H8.52214C8.6391 18.5362 8.74073 18.6154 8.77521 18.7271C8.99911 19.4529 9.99866 22 13 22C16.0013 22 17.0009 19.4529 17.2248 18.7271C17.2593 18.6154 17.3609 18.5362 17.4779 18.5362H23.9429C24.2066 18.5362 24.3385 18.1021 24.1359 17.9333C22.787 16.809 20.3333 13.9484 20.3333 8.01449Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </symbol>

    <symbol :id="$options.icons.FILTER" viewBox="0 0 22 22" fill="none">
      <path
        d="M20.168 5.95831H14.668"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M5.4987 5.95831H1.83203"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M9.16536 9.16667C10.9373 9.16667 12.3737 7.73025 12.3737 5.95833C12.3737 4.18642 10.9373 2.75 9.16536 2.75C7.39345 2.75 5.95703 4.18642 5.95703 5.95833C5.95703 7.73025 7.39345 9.16667 9.16536 9.16667Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M20.1667 16.0417H16.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M7.33203 16.0417H1.83203"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M12.8333 19.25C14.6052 19.25 16.0417 17.8136 16.0417 16.0416C16.0417 14.2697 14.6052 12.8333 12.8333 12.8333C11.0614 12.8333 9.625 14.2697 9.625 16.0416C9.625 17.8136 11.0614 19.25 12.8333 19.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </symbol>

    <symbol :id="$options.icons.CHEVRON_DOWN" viewBox="0 0 18 9" fill="none">
      <path
        d="M16.2583 1.20416L10.2816 7.18083C9.57578 7.88666 8.42078 7.88666 7.71495 7.18083L1.73828 1.20416"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </symbol>

    <symbol :id="$options.icons.PLUS" fill="currentColor" viewBox="0 0 24 24" fill-rule="evenodd">
      <path
        fill-rule="evenodd"
        d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" />
    </symbol>
  </svg>
</template>

<script>
import * as icons from '@/enums/icons.enum';

export default {
  name: 'SVG',
  icons: icons,
};
</script>
