import AwardTooltip from './AwardTooltip';

type TopFiveMedalProps = {
  pool: string;
  year: number;
  place: number;
};

function TopFiveMedal(props: TopFiveMedalProps) {
  const { place, pool, year } = props;
  const tooltip = `${year} ${pool} Pool ${place}th place`;

  return (
    <AwardTooltip text={tooltip}>
      {/* <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${40} ${40}`}>
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
      </svg> */}
      <svg
        width={40}
        height={40}
        viewBox="0 0 120 120"
        version="1.1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <polygon
            fill="#54188b"
            points="60,13.7 70.7,19.9 83.1,19.9 89.3,30.7 100.1,36.9 100.1,49.3 106.3,60 100.1,70.7 100.1,83.1    89.3,89.3 83.1,100.1 70.7,100.1 60,106.3 49.3,100.1 36.9,100.1 30.7,89.3 19.9,83.1 19.9,70.7 13.7,60 19.9,49.3 19.9,36.9    30.7,30.7 36.9,19.9 49.3,19.9  "
          />
          <g>
            <path
              fill="#ffffff"
              d="M60,93.9c-18.7,0-33.9-15.2-33.9-33.9S41.3,26.1,60,26.1S93.9,41.3,93.9,60S78.7,93.9,60,93.9z M60,29    c-17.1,0-31,13.9-31,31s13.9,31,31,31s31-13.9,31-31S77.1,29,60,29z"
            />
          </g>
          <g>
            <path
              fill="#ffd77a"
              d="M56.3,72.6L41.6,60.9c-1.2-1-1.4-2.7-0.4-3.9l0,0c1-1.2,2.7-1.4,3.9-0.4l12.6,10.1l16.8-18.8    c1-1.1,2.8-1.2,3.9-0.2v0c1.1,1,1.2,2.8,0.2,3.9L60.1,72.3C59.1,73.4,57.4,73.5,56.3,72.6z"
            />
          </g>
        </g>
      </svg>
    </AwardTooltip>
  );
}

export default TopFiveMedal;
