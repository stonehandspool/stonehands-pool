import { CURRENT_YEAR } from '../constants';
import payouts from '../../data/2023/payouts.json';
import { useState } from 'react';

const headers: string[] = ['Player', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', 'Confidence', 'Survivor', 'Margin', 'High Five', 'Total'];

function Payouts() {
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    const onClick = (id: string) => {
        if (selectedRow === id) {
            setSelectedRow(null)
        } else {
            setSelectedRow(id);
        }
    };

    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>The Yearly Payouts owed to everyone after the 2023 Season</h2>
                <div className='table-container'>
                    <table className='table is-bordered is-striped is-hoverable'>
                        <thead>
                            <tr>
                                <td></td>
                                <th colSpan={18} align='center'>Payout by Week (Confidence Pool)</th>
                                <th colSpan={4} align='center'>End of Season (Confidence) and Other Pools</th>
                                <td></td>
                            </tr>
                            <tr>
                                {headers.map(heading => {
                                    return <th key={heading} className='has-text-centered'>{heading}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payouts.map(info => {
                                    return (
                                        <tr key={`${info.id}-row`} id={`${info.id}`} onClick={() => onClick(info.id)} className={selectedRow === info.id ? 'is-selected' : ''}>
                                            <td key={`${info.id}-name`}>{`${info.firstName} ${info.lastName}`}</td>
                                            {
                                                info.weeklyPayouts.map((payout, index) => {
                                                    if (payout === 0) {
                                                        return <td key={`${info.id}-payout-${index}`}>-</td>
                                                    } else {
                                                        return <td key={`${info.id}-payout-${index}`}>${payout.toFixed(2)}</td>
                                                    }
                                                })
                                            }
                                            <td key={`${info.id}-yearly`}>{info.seasonPayouts[0] > 0 ? `$${info.seasonPayouts[0].toFixed(2)}` : '-'}</td>
                                            <td key={`${info.id}-survivor`}>{info.survivorPayout > 0 ? `$${info.survivorPayout.toFixed(2)}` : '-'}</td>
                                            <td key={`${info.id}-margin`}>{info.marginPayout > 0 ? `$${info.marginPayout.toFixed(2)}` : '-'}</td>
                                            <td key={`${info.id}-high-five`}>{info.highFivePayout > 0 ? `$${info.highFivePayout.toFixed(2)}` : '-'}</td>
                                            <td key={`${info.id}-total`}>{info.totalEarned > 0 ? `$${info.totalEarned.toFixed(2)}` : '-'}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Payouts;