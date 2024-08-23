function SilverMedal() {
  return (
    <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${40} ${40}`}>
      <polygon points="19.99,0 39.02,13.82 31.76,36.18 8.24,36.18 0.98,13.82" fill="#88878b" />
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
        #2
      </text>
    </svg>
  );
}

export default SilverMedal;
