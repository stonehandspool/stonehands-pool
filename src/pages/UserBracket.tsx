import { useState } from "react";
import { useParams } from "react-router-dom";
import DisplayCard from "../components/marchmadness/DisplayCard";
import {
  CURRENT_YEAR,
  MarchMadnessMatchupInfo,
  MarchMadnessPlayerInfo,
} from "../constants";
import playerPicks from "../../data/2024/marchmadness/playerPicks.json";
import teamData from "../../data/2024/marchmadness/teams.json";
import bracketData from "../../data/2024/marchmadness/matchups.json";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function UserBracket() {
  const { username } = useParams();

  // This is a lazy implementation that will not look for resizing, just on initial load
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>(getWindowDimensions());
  const isMobile = windowDimensions.width <= 768;

  const playerInfo = playerPicks.find(
    (pickInfo) => pickInfo.username === username,
  ) as unknown as MarchMadnessPlayerInfo;

  if (!playerInfo) {
    return (
      <div className="section">
        <h1 className="title has-text-warning">
          Oops! We were unable to find info for that player, did you type in the
          correct username?
        </h1>
      </div>
    );
  }

  const { userPicks } = playerInfo;

  const teamAlive = (teamName: string) => {
    return teamData.find((team) => team.name === teamName)!.alive;
  };

  const getUpToDateMatchupInfo = (matchupId: string) => {
    return bracketData.find(
      (matchup) => matchup.id === matchupId,
    )! as MarchMadnessMatchupInfo;
  };

  return (
    <section className="section px-0">
      <section className="section px-0">
        <div className="container">
          <h1 className="title has-text-centered">
            {CURRENT_YEAR} Stonehands Pool
          </h1>
          {(playerInfo.bracketTitle === undefined ||
            playerInfo.bracketTitle.length === 0) && (
            <h2 className="subtitle has-text-centered">
              March Madness Bracket for{" "}
              <b>
                {playerInfo.firstName} {playerInfo.lastName}
              </b>
            </h2>
          )}
          {playerInfo.bracketTitle && playerInfo.bracketTitle.length > 0 && (
            <h2 className="subtitle has-text-centered">
              {playerInfo.bracketTitle} ({playerInfo.firstName}{" "}
              {playerInfo.lastName}'s bracket)
            </h2>
          )}
        </div>
      </section>
      <section className="section px-0 pt-0">
        {!isMobile && (
          <div className="columns px-6">
            <div className="column is-narrow is-flex is-flex-direction-column is-justify-content-space-around">
              <p
                style={{
                  visibility: "hidden",
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                }}
              >
                <b>A</b>
              </p>
            </div>
            <div className="column">
              <h4 className="title is-4 has-text-centered">Round of 64</h4>
            </div>
            <div className="column">
              <h4 className="title is-4 has-text-centered">Round of 32</h4>
            </div>
            <div className="column">
              <h4 className="title is-4 has-text-centered">Sweet Sixteen</h4>
            </div>
            <div className="column">
              <h4 className="title is-4 has-text-centered">Elite Eight</h4>
            </div>
            <div className="column">
              <h4 className="title is-4 has-text-centered">Final Four</h4>
            </div>
            <div className="column">
              <h4 className="title is-4 has-text-centered">Finals</h4>
            </div>
          </div>
        )}
        <div className="columns is-mobile px-6">
          <div className="column is-narrow is-flex is-flex-direction-column is-justify-content-space-around">
            <p
              style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
            >
              <b>WEST</b>
            </p>
            <p
              style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
            >
              <b>EAST</b>
            </p>
            <p
              style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
            >
              <b>SOUTH</b>
            </p>
            <p
              style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
            >
              <b>MIDWEST</b>
            </p>
          </div>
          <div className="column">
            {Array.from(Array(32).keys()).map((index) => {
              const matchupInfo = userPicks[index];
              return (
                <DisplayCard
                  key={`round-of-64-${index}`}
                  customClass="first-col"
                  matchupInfo={matchupInfo}
                  topTeamAlive={teamAlive(matchupInfo.topTeam.name!)}
                  bottomTeamAlive={teamAlive(matchupInfo.bottomTeam.name!)}
                  upToDateMatchupInfo={getUpToDateMatchupInfo(matchupInfo.id)}
                  isMobile={isMobile}
                />
              );
            })}
          </div>
          <div className="column is-flex is-flex-direction-column is-justify-content-space-around">
            {Array.from(Array(16).keys()).map((index) => {
              const matchupInfo = userPicks[32 + index];
              return (
                <DisplayCard
                  key={`round-of-64-${index}`}
                  customClass="col-2"
                  matchupInfo={matchupInfo}
                  topTeamAlive={teamAlive(matchupInfo.topTeam.name!)}
                  bottomTeamAlive={teamAlive(matchupInfo.bottomTeam.name!)}
                  upToDateMatchupInfo={getUpToDateMatchupInfo(matchupInfo.id)}
                  isMobile={isMobile}
                />
              );
            })}
          </div>
          <div className="column is-flex is-flex-direction-column is-justify-content-space-around">
            {Array.from(Array(8).keys()).map((index) => {
              const matchupInfo = userPicks[48 + index];
              return (
                <DisplayCard
                  key={`round-of-64-${index}`}
                  customClass="col-3"
                  matchupInfo={matchupInfo}
                  topTeamAlive={teamAlive(matchupInfo.topTeam.name!)}
                  bottomTeamAlive={teamAlive(matchupInfo.bottomTeam.name!)}
                  upToDateMatchupInfo={getUpToDateMatchupInfo(matchupInfo.id)}
                  isMobile={isMobile}
                />
              );
            })}
          </div>
          <div className="column is-flex is-flex-direction-column is-justify-content-space-around">
            {Array.from(Array(4).keys()).map((index) => {
              const matchupInfo = userPicks[56 + index];
              return (
                <DisplayCard
                  key={`round-of-64-${index}`}
                  customClass="col-4"
                  matchupInfo={matchupInfo}
                  topTeamAlive={teamAlive(matchupInfo.topTeam.name!)}
                  bottomTeamAlive={teamAlive(matchupInfo.bottomTeam.name!)}
                  upToDateMatchupInfo={getUpToDateMatchupInfo(matchupInfo.id)}
                  isMobile={isMobile}
                />
              );
            })}
          </div>
          <div className="column is-flex is-flex-direction-column is-justify-content-space-around">
            {Array.from(Array(2).keys()).map((index) => {
              const matchupInfo = userPicks[60 + index];
              return (
                <DisplayCard
                  key={`round-of-64-${index}`}
                  customClass="col-5"
                  matchupInfo={matchupInfo}
                  topTeamAlive={teamAlive(matchupInfo.topTeam.name!)}
                  bottomTeamAlive={teamAlive(matchupInfo.bottomTeam.name!)}
                  upToDateMatchupInfo={getUpToDateMatchupInfo(matchupInfo.id)}
                  isMobile={isMobile}
                />
              );
            })}
          </div>
          <div className="column is-flex is-flex-direction-column is-justify-content-space-around">
            <DisplayCard
              customClass="last-col"
              matchupInfo={userPicks[userPicks.length - 1]}
              topTeamAlive={teamAlive(
                userPicks[userPicks.length - 1].topTeam.name!,
              )}
              bottomTeamAlive={teamAlive(
                userPicks[userPicks.length - 1].bottomTeam.name!,
              )}
              upToDateMatchupInfo={getUpToDateMatchupInfo(
                userPicks[userPicks.length - 1].id,
              )}
              isMobile={isMobile}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default UserBracket;
