import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div>
            <p className='f3'>
                {'This brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='form center'>
                <div className='center pa4 br3 shadow-5' onChange={onInputChange}>
                    <input className='f4 pa2 w-70 center' type='text'></input>
                    <button className='w30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect Faces</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;