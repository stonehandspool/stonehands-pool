type TopFiveMedalProps = {
  place: number;
};

function TopFiveMedal(props: TopFiveMedalProps) {
  const { place } = props;
  return (
    <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${40} ${40}`}>
      <rect width={36} height={36} x={2} y={2} fill="#54188b" />
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
        #{place}
      </text>
    </svg>
  );
}

export default TopFiveMedal;
