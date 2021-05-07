import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='faceImage' alt='Pic' src={imageUrl} width='500px' height='auto'></img>
                <div className='bounding-box'
                 style={{top: box.top_row, bottom: box.bottom_row, left: box.left_col, right: box.right_col}}>
                 </div>
            </div>
        </div>
    );
}

export default FaceRecognition;