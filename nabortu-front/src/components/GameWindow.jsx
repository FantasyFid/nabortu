import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import TaskCard from './TaskCard';
import { getTrackForUser } from '../utils/rest.js'
import '../styles/levels.css';

export default function GameWindow(props) {
    const [cardModalVisible, setCardModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [trackData, setTrackData] = useState({
        levels: [],
        progress: 0
    });

    useEffect(() => {
        getTrackForUser(0)
            .then(result => {
                setTrackData(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const onFrontCoverClick = (card) => {
        setCardModalVisible(true);
        setSelectedCard(card);
    }

    const chunkMaxLength = (arr, chunkSize, maxLength) => {
        const res = Array.from({length: maxLength}, () => arr.splice(0,chunkSize));
        return res;
    }

    return (
        <div>
            <div className='progress-bar'>
                <ProgressBar now={trackData.progress} label={`${trackData.progress}%`}/>
            </div>
            <ul>
                {trackData.levels.map((level, index) =>
                    <li key={level.id} className="levels-list-item">
                        <h2>
                            {'lvl'}&nbsp;{index + 1}
                        </h2>
                        <Carousel variant="dark" interval={null}>
                            {chunkMaxLength(level.cards, 4, Math.ceil(level.cards.length / 4)).map(cardsStack => 
                                <Carousel.Item>
                                    <div className='carousel-wrapper'>
                                        {!level.isActive && <div className="blackdrop"><i style={{ fontSize: '15vw', color: 'white'}} class="fa fa-lock" aria-hidden="true"></i></div>}
                                        <div className='levels-list-carousel'>
                                            {cardsStack.map(card =>
                                                <TaskCard card={card} isOnShowcase={true} onFrontCoverClick={(card) => onFrontCoverClick(card)}/>
                                            )}
                                        </div>
                                    </div>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </li>
                )}
            </ul>
            <Modal 
                contentClassName='card-modal'
                dialogClassName='card-modal'
                show={cardModalVisible}
                onHide={() => setCardModalVisible(false)}
            >
                <TaskCard card={selectedCard} isOnShowcase={false} onFrontCoverClick={null} />
            </Modal>
        </div>

    )
}