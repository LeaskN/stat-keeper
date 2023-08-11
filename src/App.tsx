import { useState } from 'react'
import './App.css'

interface AllStats {
  [name: string]: {
    [teamName: string]: number;
  };
}

function App() {
  const [stats, setStats] = useState<AllStats>({});
  const [statPopup, setStatPopup] = useState(false);
  const [newStatValue, setNewStatValue] = useState('');
  const [playerOptions, setPlayerOptions] = useState(false);
  const [players, setPlayers] = useState([{ name: 'Nic', values: { team: 'team1' } }, { name: 'Ali', values: { team: 'team2' } }]);
  const [currentStat, setCurrentStat] = useState({});

  const handleNewStat = (e: any) => {
    e.preventDefault();
    setPlayers((players) => players.map((player: any) => { player[newStatValue] = 0; return player }));
    setStats((allStats: any) => { return { ...allStats, [newStatValue]: { team1: 0, team2: 0 } } });
    setStatPopup((statPopup) => !statPopup);
  }

  const updateScore = (stat: any, value: string, team: string) => {
    setCurrentStat({stat, value, team})
    setPlayerOptions(true);

    // setStats((stats) => {
    //   let updatedStats = JSON.parse(JSON.stringify(stats));
    //   updatedStats[stat[0]][team] = updatedStats[stat[0]][team] + Number(`${value === '+' ? 1 : -1}`)
    //   return updatedStats;
    // })
  }

  const addStat = (player:any) => {
    console.log(stats, player)
    setStats((stats) => {
      let updatedStats = JSON.parse(JSON.stringify(stats));
      updatedStats[stats[0]][team] = updatedStats[stats[0]][team] + Number(`${value === '+' ? 1 : -1}`)
      return updatedStats;
    })
    setPlayerOptions(false);
  }

  return (
    <>
      <div className={`playerOptions ${playerOptions === true ? '' : 'hidden'}`}>
        {
          players.map(player => {
            console.log(Object.keys(player)[0])
            return (
              <tr key={JSON.stringify(player)}>
                <td>{player.name}</td>
                <td><button onClick={() => addStat(player)} className=''>+</button></td>
              </tr>
            )
          })
        }
      </div>
      <div className={`statPopup ${statPopup ? '' : 'hidden'}`}>
        <form>
          <input onChange={(e) => setNewStatValue(e.target.value)} placeholder='Enter new stat name' />
        </form>
        <button onClick={(e) => handleNewStat(e)}>Add Stat</button>
      </div>
      <table className='statTable'>
        <thead>
          <tr>
            <th>Team1</th>
            <th></th>
            <th>Team2</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(stats).map(stat => {
              return (
                <tr key={JSON.stringify(stat)}>
                  <td><button onClick={() => { updateScore(stat, '-', 'team1') }} className='valueModifierBtn'>-</button>{stat[1].team1}<button onClick={() => { updateScore(stat, '+', 'team1') }} className='valueModifierBtn'>+</button></td>
                  <td>{[stat[0]]}</td>
                  <td><button onClick={() => { updateScore(stat, '-', 'team2') }} className='valueModifierBtn'>-</button>{stat[1].team2}<button onClick={() => { updateScore(stat, '+', 'team2') }} className='valueModifierBtn'>+</button></td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <button onClick={() => setStatPopup((statPopup) => !statPopup)}>Add Stat</button>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

export default App
