import AwardTooltip from './AwardTooltip';

function FoundingMember() {
  const tooltip = 'Stonehands Founding Member';

  return (
    <AwardTooltip text={tooltip}>
      <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${40} ${40}`}>
        <rect width={36} height={36} x={2} y={2} rx={6} fill="#d4af37" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          alignmentBaseline="middle"
          textAnchor="middle"
          dy=".1em"
          fill="white"
          fontSize={30}
          fontFamily="Roboto Slab"
          fontWeight="bold"
        >
          S
        </text>
      </svg>
    </AwardTooltip>
  );
}

export default FoundingMember;
