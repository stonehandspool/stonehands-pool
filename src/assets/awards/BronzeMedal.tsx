import AwardTooltip from './AwardTooltip';

type BronzeMedalProps = {
  pool: string;
  year: number;
};

function BronzeMedal(props: BronzeMedalProps) {
  const { pool, year } = props;
  const tooltip = `${year} ${pool} Pool 3rd place`;

  return (
    <AwardTooltip text={tooltip}>
      <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${40} ${40}`}>
        <rect width={36} height={36} x={2} y={2} fill="#b08d57" />
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
          #3
        </text>
      </svg>
    </AwardTooltip>
  );
}

export default BronzeMedal;
