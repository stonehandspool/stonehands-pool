interface IconProps {
  size?: string | number;
  opacity?: number;
}

function WAS(props: IconProps) {
  const { size, opacity } = props;
  return (
    <svg width={size} height={size} opacity={opacity} viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(20 -35)">
        <path
          fill="#ffb612"
          d="m334.104 124 14.704 45.082-10.94 33.501L312.329 124H197.846l-20.535 62.99L156.858 124H20l42.9932 69.815 58.8958 180.906h110.823l22.272-68.388 22.21 68.388h121.245L480 124ZM78.2962 186.722 49.9649 140.73h94.7341l23.802 73.31-40.656 124.884zM220.49 358.363h-81.354l66.444-204.109 40.615 125.03zm-1.716-217.633h81.395l28.952 88.923-40.739 125.174zm167.361 217.53h-81.334l61.543-189.075-9.264-28.455h99.821z"
        />
        <path
          fill="#5a1414"
          d="m329.058 229.674-40.739 125.175-69.546-214.118h81.396zm28.021-88.943 9.223 28.455-61.542 189.075h81.333l70.849-217.53zm-212.381 0H49.9646l28.3312 45.991 49.6312 152.203 40.574-124.885zm-5.562 217.53h81.457l25.705-78.976-40.718-125.03z"
        />
      </g>
    </svg>
  );
}

WAS.defaultProps = {
  size: 40,
  opacity: 1,
};

export default WAS;
