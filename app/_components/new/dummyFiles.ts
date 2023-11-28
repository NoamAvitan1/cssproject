export const dummyCss = `.box {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
}
.cool-text {
  width: 90%;
  color: black;
  font-size: 50px;
  text-align: center;
  animation: cool-text 1s infinite;
}
@keyframes cool-text {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
  `;

export const dummyHtml = `<div class="box">
  <div class="cool-text">Hello World!</div>
</div>
`;
