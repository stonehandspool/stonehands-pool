import AwardTooltip from './AwardTooltip';
import * as TeamLogos from '../logos';

type MostLoyalProps = {
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

function MostLoyal(props: MostLoyalProps) {
  const { team, years } = props;
  const tooltip = `Picked ${team} every week in ${formatYears(years)}`;
  const Logo = TeamLogos[team as keyof typeof TeamLogos];

  return (
    <AwardTooltip text={tooltip}>
      <svg width={40} height={40}>
        <Logo />
        {years.length > 1 && (
          <text
            x="80%"
            y="80%"
            dominantBaseline="middle"
            alignmentBaseline="middle"
            textAnchor="middle"
            dy=".1em"
            fill="black"
            fontSize={14}
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

export default MostLoyal;
