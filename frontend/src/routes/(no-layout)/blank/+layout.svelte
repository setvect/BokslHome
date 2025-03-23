<div>
  <slot />
</div>

<style>
  /* 모든 기본 스타일 초기화 */
  :global(body) {
    margin: 0;
    padding: 0;
  }

  div {
    /* 필요한 경우 이 레이아웃에 스타일 추가 */
    width: 100%;
    height: 100%;
  }
</style>
