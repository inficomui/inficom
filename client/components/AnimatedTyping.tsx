import { useEffect, useState } from "react";

const taglines = [
  "Leading IT Solutions Provider",
  "Empowering Digital Transformation",
  "Your Technology Partner"
];

function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === taglines.length) return;

    if (subIndex === taglines[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="text-lg sm:text-xl text-gray-200 block h-8">
      {`${taglines[index].substring(0, subIndex)}|`}
    </span>
  );
}

export default TypingEffect