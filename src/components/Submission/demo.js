import React, {Component, createElement, useEffect, useState} from 'react';
import { gapi } from 'gapi-script';
import axios from "axios";

const SCOPE = 'https://www.googleapis.com/auth/drive';
const CLIENT_ID="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"


function Demo(){

    useEffect(()=>{
        function start() {
            gapi.client.init({
                apiKey: "284247270990-gdn3hpqk4c4fjckvmd45k4ajeeov4msb.apps.googleusercontent.com",
                clientId: "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",
                scope: SCOPE
            })
        }
        gapi.load('client:auth2', start)
    })

    const createDemo = async () => {
        axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + 'ya29.A0ARrdaM_mevmaySYJJ5Gx-oFg_95vbXvK97gFBzWCnx4jWq1-qa0qbvoxzeE8CrvO_H4iICAgTXmJg-pWxantl2yfwQ19QRvXAhENSswSIM0UzRGR5O2E8B5gDBirUQc-IVaNSHnwhQsIgtLJh_-Vs_HOJYjv'},
            url: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        }).then(
                function (response) {
                    console.log(response)
                }
            )
    }


    return (
        <div className="App">
            <button onClick={()=>createDemo()}>Sign Out</button>
        </div>
    );
}

export default Demo;