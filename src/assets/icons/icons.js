import React from 'react';

const LinkedIn = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
    </svg>
);

const Twitter = () => (
    <svg className="MuiSvgIcon-root jss176" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
    </svg>
);

const Facebook = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
);

const Instagram = () => (
    <svg id="icon-instagram-filled" viewBox="125 125 550 550">
        <path d="M541.9,127.1H258.1c-72.2,0-131,58.8-131,131v283.8c0,72.3,58.8,131,131,131h283.8c72.3,0,131-58.8,131-131         V258.1C672.9,185.9,614.1,127.1,541.9,127.1z M400,568.7c-93,0-168.7-75.7-168.7-168.7c0-93,75.7-168.7,168.7-168.7         c93,0,168.7,75.7,168.7,168.7C568.7,493,493,568.7,400,568.7z M575.9,262.2c-22.4,0-40.5-18.1-40.5-40.5s18.1-40.5,40.5-40.5         c22.4,0,40.5,18.1,40.5,40.5S598.3,262.2,575.9,262.2z" />
        <path d="M400,512.2c-61.9,0-112.2-50.3-112.2-112.2S338.1,287.8,400,287.8c61.9,0,112.2,50.3,112.2,112.2         S461.9,512.2,400,512.2z" />
    </svg>
);

const CrossIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-lg"
        viewBox="0 0 16 16"
    >
        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
    </svg>
);

const Search = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
    >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
);

export { LinkedIn, Twitter, Facebook, Instagram, CrossIcon, Search };
