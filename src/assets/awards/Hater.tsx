import AwardTooltip from './AwardTooltip';
import * as TeamLogos from '../logos';

type HaterProps = {
  team: string;
  years: number[];
};

const formatYears = (years: number[]) => {
  if (years.length === 1) {
    return `${years[0]}`;
  } else if (years.length === 2) {
    return years.join(' and ');
  } else {
    return years.slice(0, -1).join(', ') + ', and ' + years.slice(-1);
  }
};

function Hater(props: HaterProps) {
  const { team, years } = props;
  const tooltip = `Never picked ${team} in ${formatYears(years)}`;
  const Logo = TeamLogos[team as keyof typeof TeamLogos];

  return (
    <AwardTooltip text={tooltip}>
      <svg
        width={40}
        height={40}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
      >
        <Logo size={512} />
        <path
          fill="#FF473E"
          d="M255.107 1.894C114.768 1.894 1.001 115.661 1.001 256s113.767 254.106 254.106 254.106S509.213 396.339 509.213 256S395.445 1.894 255.107 1.894zM124.924 386.183C90.151 351.41 71.001 305.176 71.001 256c0-37.761 11.303-73.78 32.289-104.214l256.03 256.031c-30.434 20.986-66.453 32.289-104.214 32.289c-49.176 0-95.409-19.151-130.182-53.923zm283.54-28.218L153.141 102.643c29.952-20.004 65.133-30.749 101.966-30.749c49.176 0 95.41 19.15 130.183 53.923c34.773 34.773 53.923 81.006 53.923 130.183c0 36.833-10.745 72.013-30.749 101.965z"
        ></path>
        {years.length > 1 && (
          <text
            x="80%"
            y="80%"
            dominantBaseline="middle"
            alignmentBaseline="middle"
            textAnchor="middle"
            dy=".1em"
            fill="black"
            fontSize={180}
            fontFamily="Roboto Slab"
            fontWeight="bold"
          >
            {`${years.length}x`}
          </text>
        )}
      </svg>
    </AwardTooltip>
  );
}

export default Hater;
