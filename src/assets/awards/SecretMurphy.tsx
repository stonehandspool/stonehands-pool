import AwardTooltip from './AwardTooltip';

function SecretMurphy() {
  const tooltip = 'Secret Murphy winner';

  return (
    <AwardTooltip text={tooltip}>
      <svg
        fill="#8b5b30"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="40px"
        height="40px"
        viewBox="0 0 885.851 885.851"
        xmlSpace="preserve"
      >
        <g>
          <path d="M755.125,130.775c1.399-33.9-10.8-68.2-36.7-94.1c-49.1-49.101-128.4-48.801-177.5,0.3c-38.8,38.8-47.5,96-24.2,143.6 l-336.1,336.2c-47.6-23.3-104.8-14.6-143.6,24.2c-49.1,49-49.3,128.5-0.2,177.6c25.9,25.9,60.1,38,94,36.601 c-1.4,33.899,10.8,68.2,36.7,94c49.1,49.1,128.4,48.8,177.5-0.3c38.801-38.801,47.4-96,24.101-143.601l336.1-336.1 c47.601,23.3,104.8,14.6,143.601-24.2c49.1-49.101,49.3-128.601,0.199-177.7C823.125,141.476,789.025,129.375,755.125,130.775z"></path>{' '}
        </g>
      </svg>
    </AwardTooltip>
  );
}

export default SecretMurphy;
