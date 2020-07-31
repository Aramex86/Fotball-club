import React from 'react';
import {Link} from 'react-router-dom';

const Tag = ({link, linkto, bck, size, color, ...props}) => {
    const template = (
    <div
      style={{
        background: bck,
        fontSize: size,
        color: color,
        padding: '5px 10px',
        display: 'inline-flex',
        fontFamily: 'Righteous',
      }}
    >
      {props.children}
    </div>
  );

  if (link) {
    return <Link to={linkto}>{template}</Link>;
  } else {
    return template;
  }
};

export default Tag;
