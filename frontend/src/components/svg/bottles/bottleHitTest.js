export function isPointOnBottle(svg, clientX, clientY, solidOnly = false) {
  if (!svg) return false;

  const selector = solidOnly ? '[data-bottle-solid]' : '[data-bottle-hit]';
  return Array.from(svg.querySelectorAll(selector)).some((path) => {
    const transform = path.getScreenCTM();
    if (!transform) return false;

    // 装着位置の変換も含め、各パーツの座標へ戻して輪郭を判定します。
    const point = new DOMPoint(clientX, clientY).matrixTransform(transform.inverse());
    return path.isPointInFill(point);
  });
}
