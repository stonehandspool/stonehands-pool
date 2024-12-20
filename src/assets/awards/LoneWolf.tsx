import AwardTooltip from './AwardTooltip';

type LoneWolfProps = {
  team: string;
  week: number;
  year: number;
};

function LoneWolf(props: LoneWolfProps) {
  const { team, week, year } = props;
  const tooltip = `Only person to choose ${team} in week ${week} of the ${year} season`;

  return (
    <AwardTooltip text={tooltip}>
      <svg fill="#54188b" width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" version="1.1">
        <path d="M15.948 1.378c-7.913 0-14.327 6.414-14.327 14.327 0 1.585 0.258 3.11 0.733 4.535 2.505-1.51 4.743-2.569 6.711-3.246-2.231 0.35-4.144 1.475-6.854 0.248 1.969-1.732 5.471-4.108 8.644-4.471 1.659-1.349 4.251-2.743 5.595-2.326 1.903-1.677 4.242-3.812 6.746-5.35l0 0c0.666 1.008 1.068 2.243 0.783 3.612-5.015 1.261-3.848 9.293 0.842 4.208 0.396 0.815 0.587 1.663 0.567 2.584-2.039 2.111-4.179 3.934-6.361 5.487 0.029 1.497-0.351 3.302-1.187 5.292-0.352 0.837-0.457 2.271 1.427 3.367 6.311-1.498 11.007-7.17 11.007-13.94-0-7.913-6.415-14.327-14.327-14.327z"></path>
      </svg>
    </AwardTooltip>
  );
}

export default LoneWolf;
