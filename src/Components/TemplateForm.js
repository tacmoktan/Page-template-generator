import React, { useState } from 'react';
//component
import Template from './Template';

const TemplateForm = () => {

    const [data, setData] = useState({
        title: "",
        body: "",
        img: {}
    })

    const handleInput = field => e =>
        setData({
            ...data,
            [field]: e.target.value
        });

    const handleImageInput = () => e => {
        const reader = new FileReader();

        reader.onloadend = () => setData({ ...data, img: reader.result });      
        let imageFiles = e.target.files;
        reader.readAsDataURL(imageFiles[0]);
    }

    React.useEffect(() => console.log(data));

    const handleSubmit = e => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <>
            <form id="main-form" onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Title
                    <input type="text" className="form-input" id="title" onChange={handleInput('title')} autoFocus={true} required />
                    </label>
                </div>

                <div>
                    <label>Body
                    <textarea type="text" className="form-input" id="body" onChange={handleInput('body')} required />
                    </label>
                </div>

                <div>
                    <label>Image
                    <input type="file" className="form-input" id="img" accept="image/*" onChange={handleImageInput()} required />
                    </label>
                </div>
                <button type="submit" className="button" >SUBMIT</button>
            </form>

            <Template {...data} />
        </>
    );
}
export default TemplateForm;