import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const TemplateForm = () => {

    const [data, setData] = useState({
        title: "",
        body: "",
        img: {},
        isDataSubmitted: false
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

    //convert JSX to HTML 
    let pageTemplate = (
        <div className="container" id="template-container">
            {Object.keys(data.img).length !== 0 && (
                <div className="img-container">
                    <img src={data.img} alt="img for template" className="template-image" />
                </div>)}
            {data.title && <h1 className="template-heading">{data.title}</h1>}
            {data.body && <p className="templatedata.-body">{data.body}</p>}
        </div>
    );

    const htmlString = ReactDOMServer.renderToStaticMarkup(pageTemplate);       //converts JSX to html string
    
    let htmlPageTemplate = document.createElement('div');
    htmlPageTemplate.innerHTML = htmlString;
    let htmlTemplateContainer = htmlPageTemplate.querySelector('#template-container')  

    const handleSubmit = e => {
        e.preventDefault();
        setData({ ...data, isDataSubmitted: true });

        domtoimage.toBlob(htmlTemplateContainer, { width: 1080, height: 960 })
            .then(function (blob) {
                window.saveAs(blob, "page-template.png");
            });
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

            {data.isDataSubmitted && pageTemplate}

        </>
    );
}
export default TemplateForm;