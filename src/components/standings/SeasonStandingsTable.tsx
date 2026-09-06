import { useCallback, useEffect, useRef, useState } from 'react';
import playerData from '../../../data/2026/football/players.json';
import { CURRENT_WEEK, FIRST_GAME_PLAYED, SEASON_READY } from '../../constants';
import SecretGrahamModal from '../modals/SecretGrahamModal';
import supabaseClient from '../../config/supabaseClient';
import { TABLE_NAMES } from '../../config/supabaseConfig';

interface TableColumns {
  position: number;
  name: string;
  wins: number;
  losses: number;
  ties: number;
  percent: string;
  points: number;
  tiebreaker: number;
  lastWeek: number;
  change: string;
  username: string;
}

const correctOrder = [4, 22, 25];

type SignedUpInfo = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
};

function SeasonStandingsTable() {
  const [currentSequence, setCurrentSequence] = useState<number[]>([]);
  const [currentlySignedUp, setCurrentlySignedUp] = useState<SignedUpInfo[]>([]);
  const sequenceIsCorrect = useRef<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const positionRefs = useRef<HTMLTableCellElement[]>([]);

  const openModal = useCallback(() => {
    modalRef.current?.classList.add('is-active');
  }, []);

  const closeModal = useCallback(() => {
    modalRef.current?.classList.remove('is-active');
    const sequenceCopy = [...currentSequence];
    sequenceCopy.forEach(pos => {
      positionRefs.current[pos - 1].style.color = 'rgb(0, 0, 0)';
    });
    setCurrentSequence([]);
    sequenceIsCorrect.current = false;
  }, [currentSequence]);

  const updateSequence = useCallback(
    (position: number) => {
      const sequenceCopy = [...currentSequence];
      sequenceCopy.push(position);
      if (sequenceIsCorrect.current) {
        return;
      } else if (
        sequenceCopy[sequenceCopy.length - 1] === correctOrder[sequenceCopy.length - 1] &&
        sequenceCopy.length < correctOrder.length
      ) {
        // If they clicked a correct number in the right spot
        setCurrentSequence(sequenceCopy);
        positionRefs.current[position - 1].style.color = 'rgb(72, 199, 142)';
      } else if (
        sequenceCopy[sequenceCopy.length - 1] === correctOrder[sequenceCopy.length - 1] &&
        sequenceCopy.length === correctOrder.length
      ) {
        // If they successfully clicked the full sequence
        setCurrentSequence(sequenceCopy);
        sequenceIsCorrect.current = true;
        openModal();
        positionRefs.current[position - 1].style.color = 'rgb(72, 199, 142)';
      } else {
        //If they got an incorrect number
        setCurrentSequence([]);
        positionRefs.current[position - 1].style.color = 'rgb(255, 102, 133)';
        setTimeout(() => {
          sequenceCopy.forEach(pos => {
            positionRefs.current[pos - 1].style.color = 'rgb(0, 0, 0)';
          });
        }, 1500);
      }
    },
    [currentSequence, sequenceIsCorrect]
  );

  useEffect(() => {
    const fetchPicks = async () => {
      const { data } = await supabaseClient.from(TABLE_NAMES.USER_PICKS).select();

      if (data && data.length > 0) {
        // Just create an array of all of the user ids that have made picks
        console.log(data);
        setCurrentlySignedUp(
          data.map(d => {
            const info: SignedUpInfo = {
              userId: d.user_id,
              firstName: d.submission_data.firstName,
              lastName: d.submission_data.lastName,
              username: d.submission_data.username,
            };
            return info;
          })
        );
      }
    };

    if (!FIRST_GAME_PLAYED) {
      fetchPicks();
    }
  }, []);

  if (!FIRST_GAME_PLAYED && currentlySignedUp.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Once the picksheet becomes available this will show everyone who has signed up for the upcoming season.
          </h3>
        </div>
      </section>
    );
  }

  // Calculate the standings
  const calculatedPicks: TableColumns[] = [];

  // Different flows for if the first game has played or not, if it hasn't we need to go via the sign ups
  if (!FIRST_GAME_PLAYED) {
    for (let i = 0; i < currentlySignedUp.length; i++) {
      const playerInfo = currentlySignedUp[i];
      const rowInfo: TableColumns = {
        position: 0, // Doesn't matter, will get updated below
        name: `${playerInfo.firstName} ${playerInfo.lastName}`,
        points: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        percent: '0.0%',
        tiebreaker: 0,
        lastWeek: 0,
        change: '--',
        username: `${playerInfo.username}`,
      };
      calculatedPicks.push(rowInfo);
    }
  } else {
    // The normal flow during the season
    for (let i = 0; i < playerData.length; i++) {
      const playerInfo = playerData[i];
      const rowInfo: TableColumns = {
        position: playerInfo.currentWeekRank,
        name: `${playerInfo.firstName} ${playerInfo.lastName}`,
        points: playerInfo.points,
        wins: playerInfo.wins,
        losses: playerInfo.losses,
        ties: playerInfo.ties,
        percent: `${(playerInfo.percent * 100).toFixed(1)}%`,
        tiebreaker: +playerInfo.tbAvg.toFixed(1),
        lastWeek: playerInfo.lastWeekRank,
        change: playerInfo.change,
        username: playerInfo.username,
      };
      calculatedPicks.push(rowInfo);
    }
  }

  if ((!SEASON_READY && CURRENT_WEEK === 1) || !FIRST_GAME_PLAYED) {
    // If the season hasn't started, just list everyone in alphabetical order
    calculatedPicks.sort((row1, row2) => {
      const firstName1 = row1.name.split(' ')[0];
      const lastName1 = row1.name.split(' ').pop()!;
      const firstName2 = row2.name.split(' ')[0];
      const lastName2 = row2.name.split(' ').pop()!;
      return lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2);
    });
    calculatedPicks.forEach((person, index) => {
      person.position = index + 1;
    });
  } else {
    // Otherwise, sort everyone by points now
    calculatedPicks.sort((row1, row2) => row2.points - row1.points || row2.wins - row1.wins);
  }

  // For looping through the submissions
  const tableKeys: string[] = Object.keys(calculatedPicks[0]);

  return (
    <section className="section">
      <div className="container">
        <table className="table is-striped is-hoverable mx-auto">
          <thead>
            <tr>
              <th className="is-vcentered">
                <abbr title="Position">Pos</abbr>
              </th>
              <th className="is-vcentered">Name</th>
              <th className="is-vcentered">Points</th>
              <th className="is-vcentered">Wins</th>
              <th className="is-vcentered">Losses</th>
              <th className="is-vcentered">Ties</th>
              <th className="is-vcentered">Percent</th>
              <th className="is-vcentered is-nowrap">
                <abbr title="Tiebreaker Average">TBA</abbr>
              </th>
              <th className="is-vcentered">
                <abbr title="Position Last Week">Last</abbr>
              </th>
              <th className="is-vcentered">Change</th>
            </tr>
          </thead>
          <tbody>
            {calculatedPicks.map((row, index) => {
              return (
                <tr key={`${index}`}>
                  {tableKeys.map((key, ind) => {
                    if (key !== 'username') {
                      if (key === 'position') {
                        return (
                          <td
                            key={`${row.position}-${ind}`}
                            ref={(el: HTMLTableCellElement) => {
                              positionRefs.current.push(el);
                            }}
                            onClick={() => {
                              updateSequence(index + 1);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {row[key as keyof TableColumns]}
                          </td>
                        );
                      } else {
                        return (
                          <td key={`${row.position}-${ind}`} className="is-nowrap">
                            {row[key as keyof TableColumns]}
                          </td>
                        );
                      }
                    } else {
                      return;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <SecretGrahamModal ref={modalRef} closeModal={closeModal} />
    </section>
  );
}

export default SeasonStandingsTable;
