import React from 'react';

export default props => {
    let textToDisplay = 'Text long enough';

    if (props.textLength < 5) {
        textToDisplay = 'Text too short';
    }

    return (
        <div>
            {textToDisplay}
        </div>
    );
};