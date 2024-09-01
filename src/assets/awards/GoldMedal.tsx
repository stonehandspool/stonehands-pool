import AwardTooltip from './AwardTooltip';

type GoldMedalProps = {
  pool: string;
  year: number;
};

function GoldMedal(props: GoldMedalProps) {
  const { pool, year } = props;
  const tooltip = `${year} ${pool} winner`;

  return (
    <AwardTooltip text={tooltip}>
      <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${40} ${40}`}>
        <polygon points="40,20 30,37.32 10,37.32 0,20 10,2.68 30,2.68" fill="#d4af37" />
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
          #1
        </text>
      </svg>
    </AwardTooltip>
  );
}

export default GoldMedal;
