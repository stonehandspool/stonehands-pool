import AwardTooltip from './AwardTooltip';

function SecretMango() {
  const tooltip = 'Found the Secret Mango Award!';

  return (
    <AwardTooltip text={tooltip}>
      <svg
        fill="#cd661d"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="40px"
        height="40px"
        viewBox="0 0 121.6 121.6"
        xmlSpace="preserve"
      >
        <g>
          <path d="M30,108.785c9,4.601,19.1,7,29.2,7.2c0.5,0,1.1,0,1.6,0c10.2,0,20.3-2.2,29.5-6.6c8.399-4,16-10,21.601-17.5 c6.399-8.601,9.699-18.9,9.699-29.601c0-6.8,0-13.5,0-20.3c0-7.4,0-14.7,0-22.1c0-2.6,0-5.2,0-7.7c0-4.7-4.699-7.8-9-6.1l-22.8,9.5 c-1.5,0.6-3.2,0.7-4.7,0.1c-7.4-2.9-15.6-4.4-24.3-4.4s-16.9,1.6-24.3,4.4c-1.5,0.6-3.2,0.5-4.7-0.1L9,6.385c-4.3-1.8-9,1.4-9,6.1 c0,3.5,0,7.1,0,10.6c0,7.3,0,14.6,0,22c0,6.2,0,12.3,0,18.5c0,9.9,3.2,19.5,8.9,27.5C14.3,98.585,21.7,104.585,30,108.785z M83,62.485c5.5,0,10,4.5,10,10s-4.5,10-10,10s-10-4.5-10-10C73,66.886,77.5,62.485,83,62.485z M38.6,62.485c5.5,0,10,4.5,10,10 s-4.5,10-10,10s-10-4.5-10-10C28.6,66.886,33.1,62.485,38.6,62.485z"></path>{' '}
        </g>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          alignmentBaseline="middle"
          textAnchor="middle"
          dy="-.2em"
          fill="white"
          fontSize={48}
          fontFamily="Roboto Slab"
          fontWeight="bold"
        >
          ?
        </text>
      </svg>
    </AwardTooltip>
  );
}

export default SecretMango;
