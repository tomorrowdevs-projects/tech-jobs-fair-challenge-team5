export default function useLongPress() {
  return function (callback: () => void) {
    let timeout: number | undefined;
    let preventClick = false;

    function start() {
      timeout = setTimeout(() => {
        preventClick = true;
        callback();
      }, 500);
    }

    function clear() {
      timeout && clearTimeout(timeout);
      preventClick = false;
    }

    function clickCaptureHandler(e: { stopPropagation: () => void; }) {
      if (preventClick) {
        e.stopPropagation();
        preventClick = false;
      }
    }

    return {
      onMouseDown: start,
      onTouchStart: start,
      onMouseUp: clear,
      onMouseLeave: clear,
      onTouchMove: clear,
      onTouchEnd: clear,
      onClickCapture: clickCaptureHandler
    };
  }
}