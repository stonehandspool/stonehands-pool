import * as TeamLogos from '../../assets/logos'

function UserSurvivorReport(props: any) {
    const { userInfo, unusedSurvivorPicks } = props;
    return (
        <div className='container'>
            <h4 className='title is-4'>Survivor Stats:</h4>
            <div className='columns is-vcentered'>
                <div className='column is-narrow'>
                    <h5 className='title is-5'>Teams Used:</h5>
                </div>
                {
                    userInfo?.survivorPicks.map((pick: any) => {
                        if (pick !== undefined && pick !== '') {
                            const Logo = TeamLogos[pick as keyof typeof TeamLogos];
                            return <div className='column is-narrow' key={`${pick}-survivor`}><Logo /></div>    
                        }
                    })
                }
            </div>
            <div className='columns is-vcentered is-multiline'>
                <div className='column is-narrow'>
                    <h5 className='title is-5'>Unused Teams:</h5>
                </div>
                {
                    unusedSurvivorPicks?.map((pick: any) => {
                        const Logo = TeamLogos[pick as keyof typeof TeamLogos];
                        return <div className='column is-narrow' key={`${pick}-survivor`}><Logo /></div>
                    })
                }
            </div>
        </div>
    );
}

export default UserSurvivorReport;