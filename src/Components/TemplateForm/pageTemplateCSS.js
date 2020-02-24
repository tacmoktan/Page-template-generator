/* 
    necessary CSS of template.css in string format 
*/
export const pageTemplateCSS = `
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