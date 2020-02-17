import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
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

    const pageTemplateCSS = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      #template-container {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
        "Droid Sans", "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

        max-width: 1140px;
        margin: 20px auto;
        padding: 60px;
        background: #633a82;
        color: #f1fcfc;
        position: relative;
        z-index: 1;
      }
      
      #template-container .logo {
        width: 100px;
        height: 100px;
        display: block;
        margin-left: auto;
      }
      
      #template-container .img-container .template-image {
        height: 100px;
        width: 100px;
      }
      
      #template-container .template-heading {
        text-transform: uppercase;
        position: relative;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        margin: 0 auto;
      }
      
      #template-container .template-heading:after {
        content: "";
        position: absolute;
        width: 10vw;
        min-width: 100px;
        border-bottom: 2px solid;
        bottom: -5px;
        left: 50%;
        -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
      }
      
      #template-container .template-body {
        text-align: left;
        margin: 60px 0;
      }
      
      #template-container .copyright-text {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        margin: 0 auto;
        position: relative;
        background: #633a82;
        -webkit-box-shadow: 0px 0px 0px 8px #633a82;
                box-shadow: 0px 0px 0px 8px #633a82;
      }
      
      #template-container .copyright-text:before {
        content: "";
        position: absolute;
        width: 50vw;
        min-width: 300px;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%);
                transform: translate(-50%);
        border-bottom: 1px solid;
        z-index: -1;
      } `

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
                        <input type="text" className="form-input" id="title" onChange={handleInput('title')} placeholder="10 letters min" minLength={10} autoFocus={true} required />
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