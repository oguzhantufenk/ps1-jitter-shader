import { useEffect, useRef } from "react";

const useClickToToggle = (setIsRunning, setClickDisabled, clickDisabled) => {
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e) => {
      startPos.current = { x: e.clientX, y: e.clientY };
      isDragging.current = false;
    };

    const handleMouseMove = (e) => {
      if (
        Math.abs(e.clientX - startPos.current.x) > 5 ||
        Math.abs(e.clientY - startPos.current.y) > 5
      ) {
        isDragging.current = true;
      }
    };

    const handleMouseUp = (e) => {
      if (
        !clickDisabled &&
        !isDragging.current &&
        !e.target.closest(".leva-controls")
      ) {
        setIsRunning((prev) => !prev);
        setClickDisabled(true);
        setTimeout(() => {
          setClickDisabled(false);
        }, 400);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [clickDisabled, setIsRunning, setClickDisabled]);
};

export default useClickToToggle;
