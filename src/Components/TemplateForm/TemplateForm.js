import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { pageTemplateCSS } from './pageTemplateCSS';
//css
import './css/template.css';

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
        <div className="container" id="template-container" >
            <img src={require("../assets/logo.png")} alt="logo placeholder" className="logo" />
            {/* for image */}
            {Object.keys(data.img).length !== 0 && (
                <div className="img-container">
                    <img src={data.img} alt="img for template" className="template-image" />
                </div>)}

            {data.title && <h1 className="template-heading">{data.title}</h1>}
            {data.body && <p className="template-body">{data.body}</p>}

            <div className="copyright-text">
                All Rights Reserved &copy; XYZ 2020
            </div>

            {/* Adding necessary CSS for Page Template in <style> tag */}
            <style dangerouslySetInnerHTML={{
                __html: pageTemplateCSS                     
            }} />
        </div>
    );

    const htmlString = ReactDOMServer.renderToStaticMarkup(pageTemplate);       //converts JSX to html string

    let htmlPageTemplate = document.createElement('div');
    htmlPageTemplate.innerHTML = htmlString;
    let htmlTemplateContainer = htmlPageTemplate.querySelector('#template-container');

    const handleSubmit = e => {
        e.preventDefault();
        setData({ ...data, isDataSubmitted: true });

        //image preview
        domtoimage.toPng(htmlTemplateContainer, { width: 1140, height: 512 })
            .then(function (dataUrl) {
                let img = new Image();
                img.src = dataUrl;
                img.style.display = "block";
                img.style.margin = "30px auto";
                document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }

    const downloadImage = () => {
        domtoimage.toBlob(htmlTemplateContainer, {
            width: 1140, height: 512
        })
            .then(function (blob) {
                window.saveAs(blob, "page-template.png");
            });
    }

    return (
        <>
            <div className="form-container">
                <form id="main-form" onSubmit={e => handleSubmit(e)}>
                    <div className="input-container">
                        <label className="input-label" htmlFor="title">Title* </label>
                        <input type="text" className="form-input" id="title" onChange={handleInput('title')} placeholder="10 to 50 letters" minLength={10} maxLength={50} autoFocus={true} required />
                    </div>
                    <div className="input-container">
                        <label className="input-label" htmlFor="body">Body* </label>
                        <textarea type="text" className="form-input" id="body" onChange={handleInput('body')} placeholder="500 letters max" maxLength={500} required />
                    </div>

                    {/* <div className="input-container">
                        <label className="input-label" htmlFor="img-input">Image </label>
                        <input type="file" className="form-input" id="img-input" accept="image/*" onChange={handleImageInput()} />
                    </div> */}

                    <button type="submit" className="preview button" >Preview</button>
                    {data.isDataSubmitted && <button type="button" className="download button" onClick={downloadImage}>Download</button>}
                </form>
            </div>

            {/* {data.isDataSubmitted && pageTemplate} */}

        </>
    );
}
export default TemplateForm;