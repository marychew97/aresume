import React from 'react';
import {Helmet} from 'react-helmet';
import { render } from 'react-dom';
import { AFrameRenderer, Marker } from 'react-web-ar'

class Scanner extends React.Component{
    render(){
        return(
            <div className="application">
            {/* <Helmet>
                <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
                <script src="https://raw.githack.com/jeromeetienne/AR.js/2.0.4/aframe/build/aframe-ar.js"></script>
            </Helmet>
            ...
            <div style={{margin : "0px", overflow: "hidden"}}>
            <a-scene embedded arjs>
                <a-marker preset="hiro">
                    <a-box position='0 0.5 0' material='color: yellow;'></a-box>
                </a-marker>
                <a-entity camera></a-entity>
                </a-scene>
            </div> */}
            <AFrameRenderer
                arToolKit={{ sourceType: 'image', sourceUrl: 'https://stemkoski.github.io/AR-Examples/markers/hiro.png'}}
                stats
            >
            <Marker parameters={{ preset: 'hiro' }}>
                <a-box color='pink' material='opacity: 1;' position="0 0.003 0" scale='0.4 0.4 0.4'>
                    <a-animation attribute="rotation" to="360 0 0" dur="5000" easing="linear" repeat="indefinite" />
                </a-box>
            </Marker>
            </AFrameRenderer>
        </div>
        )
    }
}

export default Scanner;