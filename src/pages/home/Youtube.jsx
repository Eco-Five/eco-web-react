import axios from 'axios'
import 'react'
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap'

import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// https://www.youtube.com/watch?v={{id.videoId}}
// https://www.youtube.com/channel/{{snippet.channelId}}

const Youtube = () => {
    const [youtubeData, setYoutubeData] = useState([]);

    useEffect(() => {
        const axiosYoutubeData = async () => {
            try {
                const response = await axios.get('node/users/youtube')
                setYoutubeData(response.data.items)
                console.log(response.data)
            } catch (error) {
                console.error("Error axios youtube data: ", error)
            }
        }
        axiosYoutubeData()
    }, [])

    return (
        <>
            <div className='ms-3 mb-3 mt-3' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <FontAwesomeIcon icon={faYoutube} style={{ color: 'red' }}/> 유튜브 추천영상
            </div>
            <div className='d-flex'>
                {youtubeData.map((item, key) => (
                    <Card key={key} className='m-2' style={{ width: '30rem' }}>
                        <Card.Img variant="top" src={item.snippet.thumbnails.medium.url} 
                            onClick={() => window.open("https://www.youtube.com/watch?v=" + item.id.videoId, '_blank')} />
                        <Card.Body>
                            <Card.Title style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.snippet.title}</Card.Title>
                            <Card.Text style={{ fontSize: '0.9rem' }}>
                                {item.snippet.description}
                            </Card.Text>
                            <Button variant="success" size='sm' 
                                onClick={() => window.open("https://www.youtube.com/channel/" + item.snippet.channelId, '_blank')}>
                                유튜브채널
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Youtube