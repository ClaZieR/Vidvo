import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Did() {
  const [resultUrl, setResultUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const audioUrl = useSelector(state => state.audioUrl); // get audioUrl from Redux

  const api_key = "anIuY2xhemllckBnbWFpbC5jb20:R6abRNGqSGn4mEQ3MRq4l"
  const url = "https://api.d-id.com/talks"
  let headers = {
    "Authorization": `Basic ${api_key}`,
    "Content-Type": "application/json"
  };
  let data = {
    "script": {
      "type": "audio",
      "audio_url": "https://buycheapplaycheap.com/output2.mp3", // use audioUrl from Redux
    },
    "source_url": "https://media.discordapp.net/attachments/1009788769974620253/1087449503596023859/ClaZ3R_Sosuke_aizen_illustrated_in_primary_color_blurred_8k_HD__0849d4ad-4a58-49f4-9594-e27e17139bec.png?width=604&height=604"
}

  function getResultUrl(id, headers) {
    axios.get(`https://api.d-id.com/talks/${id}`, {headers: headers})
      .then(response => { 
        const resultUrl = response.data.result_url;
        setResultUrl(resultUrl);
        setVideoUrl(resultUrl);
      })
      .catch(error => console.error(error));
  }

  function did() {
    axios.post(url, data, {headers: headers})
      .then(response => { 
        const id = response.data.id;
        console.log(id);
        const interval = setInterval(() => {
          getResultUrl(id, headers);
          if (resultUrl) {
            clearInterval(interval);
          }
        }, 1000);
        console.log(audioUrl)
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <button onClick={did}>Run D-ID</button>
      <br></br>
      {videoUrl && <video controls src={videoUrl} />}
      {!videoUrl && resultUrl && <h1>{resultUrl}</h1>}
    </div>
  )
}

export default Did;
