import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react'
import { taskStatuses } from '../utils/consts'
import '../styles/levels.css'

export default function TaskCard({ card, isOnShowcase, onFrontCoverClick }) {
    const [isFliped, setIsFliped] = useState(false);

    const cardClass = isOnShowcase ? 'task-card' : 'bigger-task-card';

    const getDifficulty = () => {
        let result = [];
        for (let i = 0; i < card.difficulty; i++) {
            result.push(<i style={{ margin: '3px' }} className="fa fa-circle"></i>)
        }
        return result
    }

    const FrontTaskCard = () => {
        return (
            <div className={cardClass} style={{ borderColor: card.color, backgroundColor: '#FFFFFF'}} onClick={ isOnShowcase ? () => onFrontCoverClick(card) : () => setIsFliped(!isFliped)}>
                <div className="task-card-align-right" style={{ fontSize: isOnShowcase ? '45px' : '67.5px'}}>
                    {getDifficulty()}
                </div>
                <i style={{ fontSize: isOnShowcase ? '60px' : '90px'}} className={`fa ${card.icon}`}></i>
                <h3 style={{ fontSize: isOnShowcase ? '40px' : '60px'}}>{card.title}</h3>
                {!isOnShowcase && <h5>{card.block}</h5>}
                <div className='task-card-align-right'>
                    <div className={isOnShowcase ? 'task-card-status' : 'bigger-task-card-status'} style={{ backgroundColor: taskStatuses[card.status]}}></div>
                </div>
            </div>
        )
    }
    
    const BackTaskCard = () => {
        return (
            <div className="task-card-back" style={{ borderColor: card.color, backgroundColor: '#FFFFFF'}} onClick={() => setIsFliped(!isFliped)}>
                <div className='task-card-align-right' style={{ justifyContent: 'left', fontSize: '67.5px'}}>
                    {getDifficulty()}
                </div>
                <Accordion style={{ width: '100%' }} onClick={(event) => event.stopPropagation()}>
                    {
                        card.subtasks.map(subtask => 
                            <Accordion.Item eventKey={subtask.id}>
                                <Accordion.Header>{subtask.header}</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        {subtask.text}
                                    </p>
                                    <Button variant={subtask.isDone ? 'success' : 'primary'}>{subtask.isDone ? 'Сделано' : 'Завершить'}</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    }
                </Accordion>
            </div>
        )
    }

    return (
        <ReactCardFlip isFlipped={isFliped}>
            <FrontTaskCard/>
            <BackTaskCard/>
        </ReactCardFlip>
    )
}