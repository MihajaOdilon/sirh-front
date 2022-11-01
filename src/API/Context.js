import React from "react";

const ContextUrl = React.createContext({
    url: 'http://localhost:8080/api/v1/',
    setUrl: (url) => {
        this.url = url;
    }
});

export default ContextUrl;
