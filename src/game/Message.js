import React, { useState, useEffect } from 'react'

import Pusher from 'pusher-js';

export default function Message() {

    const [message, setMessage] = useState('')

    useEffect(() => {
        
        const pusher = new Pusher('6c3071d610bd137e36cd', {
            cluster: 'us3',
            encrypted: true
          });
          const channel = pusher.subscribe('p-channel-c76cb378-9bd0-4614-a632-6be5c51c7276');
          channel.bind('broadcast', data => {
              console.log('data', data)
            setMessage(data.message);
          });
    })
    return (
        <div>{message}</div>
    )
}