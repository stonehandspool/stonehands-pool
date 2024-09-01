import AwardTooltip from './AwardTooltip';

type IconProps = {
  years: number;
};

function YearCounter(props: IconProps) {
  const { years } = props;
  const tooltip = `Member for ${years} years`;

  return (
    <AwardTooltip text={tooltip}>
      <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${40} ${40}`}>
        <circle r={40 / 2} cx={40 / 2} cy={40 / 2} fill="#54188b" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          alignmentBaseline="middle"
          textAnchor="middle"
          dy=".1em"
          fill="white"
          fontSize={24}
          fontFamily="Roboto Slab"
          fontWeight="bold"
        >
          {`${years}`}
        </text>
      </svg>
    </AwardTooltip>
  );
}

export default YearCounter;
