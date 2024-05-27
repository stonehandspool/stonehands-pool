import HighFivePointsTable from "./HighFivePointsTable";

function UserHighFiveReport(props: any) {
  const { userInfo, weekToShow } = props;
  return (
    <div className="container">
      <h4 className="title is-4">High Five Stats:</h4>
      <h5 className="title is-5">Points by Week:</h5>
      <HighFivePointsTable
        highFivePoints={userInfo.highFiveValues}
        weekToShow={weekToShow}
      />
    </div>
  );
}

export default UserHighFiveReport;
