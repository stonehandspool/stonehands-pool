import { ReactNode, useEffect, useRef } from 'react';

type ConfidenceTooltipProps = {
  text: string;
  isVisible: boolean;
  children: ReactNode;
};

const padding: number = 5;

function ConfidenceTooltip(props: ConfidenceTooltipProps) {
  const { text, isVisible, children } = props;
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) {
      return;
    }

    const { width } = textRef.current.getBoundingClientRect();
    textRef.current.style.width = `${width + padding}px`;
    textRef.current.style.marginLeft = `-${(width + padding) / 2}px`;
    textRef.current.style.padding = '3px 4px';
  }, []);

  return (
    <div className={`is-inline-block ${isVisible ? 'tooltip-active' : null}`}>
      <span ref={textRef} className="tooltip-text">
        {text}
      </span>
      {children}
    </div>
  );
}

export default ConfidenceTooltip;
