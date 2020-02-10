import React from 'react';

const Template = ({ title, body, img }) => {
    return (
        <>
            { Object.keys(img).length !== 0 && <img src={img} alt="img for template" /> }
            <h1>{title}</h1>
            <p>{body}</p>
        </>
    );
}

export default Template;