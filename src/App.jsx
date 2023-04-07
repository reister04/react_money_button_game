import React, {useState}from 'react';
import {Container, Button, Col, Row, Card} from 'react-bootstrap';

import './app.css';

const App = () => {
    const [money, setMoney] = useState(500);
    const [chances, setChances] = useState(10);

    const randomValue = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const getDate = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        let hours = d.getHours();
        const minutes = d.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}-${year} ${hours}:${minutes < 10 ? '0' + minutes : minutes}${ampm}`
    }

    const [prompt, setPrompt] = useState([<p className="mb-1">({getDate()}) Welcome to Money Button Game!</p>]);

    const handleReset = () => {
        setChances(10);
        setMoney(500);
        setPrompt([<p className="mb-1">({getDate()}) Welcome to Money Button Game!</p>]);
    }

    const handleBet = (betType) => {
        const date = getDate();
        if (chances > 0 && money > 0) {
            let rand = 0;
            if (betType == 'Low') {
                rand = randomValue(-25, 100);
            } else if (betType == 'Moderate') {
                rand = randomValue(-100, 1000);
            } else if (betType == 'High') {
                rand = randomValue(-500, 2500);
            } else if (betType == 'Severe') {
                rand = randomValue(-3000, 2500);
            }
            let currentMoney = money + rand;
            let currentChances = chances - 1;
            setMoney(currentMoney);
            setChances(currentChances);
            setPrompt(prompt => [...prompt, <p className={`mb-1 ${rand > 0 ? "text-success" : "text-danger"}`}>({date}) You clicked "{`${betType} Risk`}", value is {rand}. Current Money is {currentMoney} with {currentChances} chance(s) left.</p>]);
            if ((currentMoney) < 0) {
                setPrompt(prompt => [...prompt, <p className="text-primary">({date}) GAME OVER, YOU LOST ALL YOUR MONEY!!!</p>]);               
            }
        }
        if (chances - 1 == 0 && money > 0) {
            setPrompt(prompt => [...prompt, <p className="text-primary">({date}) GAME OVER!!!</p>]);               
        }
    }

    return (
        <div>
            <Container className='pt-3'>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="fs-5 fw-bold mb-0">Your Money: {money}</h1>
                    <Button variant="danger" className="border border-dark border-2" onClick={() => {handleReset()}}>Reset</Button>
                </div>
                <p className="fs-5">Chances left: {chances}</p>
                <Row>
                    <Col xs="6 mb-2" md="6" lg="3">
                        <Card className="d-flex flex-column align-items-center py-1 border border-dark border-2 w-100">
                            <p className="my-3">Low Risk</p>
                            <Button variant="success" className="border border-dark border-2" onClick={() => {handleBet("Low")}}>Bet</Button>
                            <p className='my-3'>-25 to 100</p>
                        </Card>
                    </Col>
                    <Col xs="6 mb-2" md="6" lg="3">
                        <Card className="d-flex flex-column align-items-center py-1 border border-dark border-2 w-100">
                            <p className="my-3">Moderate Risk</p>
                            <Button variant="success" className="border border-dark border-2" onClick={() => {handleBet("Moderate")}}>Bet</Button>
                            <p className='my-3'>-100 to 1000</p>
                        </Card>
                    </Col>
                    <Col xs="6 mb-2" md="6" lg="3">
                        <Card className="d-flex flex-column align-items-center py-1 border border-dark border-2 w-100">
                            <p className="my-3">High Risk</p>
                            <Button variant="success" className="border border-dark border-2" onClick={() => {handleBet("High")}}>Bet</Button>
                            <p className='my-3'>-500 to 2500</p>
                        </Card>
                    </Col>
                    <Col xs="6 mb-2" md="6" lg="3">
                        <Card className="d-flex flex-column align-items-center py-1 border border-dark border-2 w-100">
                            <p className="my-3">Severe Risk</p>
                            <Button variant="success" className="border border-dark border-2" onClick={() => {handleBet("Severe")}}>Bet</Button>
                            <p className='my-3'>-3000 to 5000</p>
                        </Card>
                    </Col>
                </Row>
                <div className='mt-2'>
                    <h2>Game Host:</h2>
                    <Container className="bg-light border border-dark border-2 overflow-auto" style={{height:400}}>
                        {prompt.map((p, index) => (
                            <React.Fragment key={index}>{p}</React.Fragment>
                        ))}
                    </Container>
                </div>
            </Container>
        </div>
    )
}

export default App