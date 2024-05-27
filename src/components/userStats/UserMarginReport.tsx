import * as TeamLogos from "../../assets/logos";

function UserMarginReport(props: any) {
  const {
    bestMarginWeek,
    bestMargin,
    worstMarginWeek,
    worstMargin,
    userInfo,
    unusedMarginPicks,
    weekToShow,
  } = props;

  const bestMarginWeekColor =
    bestMargin.margin > 0
      ? "has-text-success"
      : bestMargin.margin < 0
        ? "has-text-danger"
        : "";
  const worstMarginWeekColor =
    worstMargin.margin > 0
      ? "has-text-success"
      : worstMargin.margin < 0
        ? "has-text-danger"
        : "";

  return (
    <div className="container">
      <h4 className="title is-4">Margin Stats:</h4>
      <div className="columns is-centered">
        <div className="column is-narrow mx-6">
          <h5 className="title is-5">
            Best Week: Week {bestMarginWeek} (
            <span className={bestMarginWeekColor}>
              {bestMargin && bestMargin.margin > 0
                ? `+${bestMargin.margin}`
                : `${bestMargin?.margin}`}
            </span>
            )
          </h5>
        </div>
        <div className="column is-narrow mx-6">
          <h5 className="title is-5">
            Worst Week: Week {worstMarginWeek} (
            <span className={worstMarginWeekColor}>
              {worstMargin && worstMargin.margin > 0
                ? `+${worstMargin.margin}`
                : `${worstMargin?.margin}`}
            </span>
            )
          </h5>
        </div>
      </div>
      <div className="columns is-vcentered">
        <div className="column is-narrow">
          <h5 className="title is-5">Teams Used:</h5>
        </div>
        {userInfo?.marginPicks.map((pick: any, index: number) => {
          if (index < weekToShow) {
            const Logo = TeamLogos[pick.team as keyof typeof TeamLogos];
            return (
              <div className="column is-narrow" key={`${pick.team}-margin`}>
                <Logo />
              </div>
            );
          }
        })}
      </div>
      <div className="columns is-vcentered is-multiline">
        <div className="column is-narrow">
          <h5 className="title is-5">Unused Teams:</h5>
        </div>
        {unusedMarginPicks?.map((pick: any) => {
          const Logo = TeamLogos[pick as keyof typeof TeamLogos];
          return (
            <div className="column is-narrow" key={`${pick}-margin`}>
              <Logo />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserMarginReport;
