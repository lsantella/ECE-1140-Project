import React, { useState, useEffect, useCallback} from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from 'firebase'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const TrainStatus = () => {

    document.body.style.overflow='hidden';
    
    const [intLights, setIntLights] = useState(false);
    const [extLights, setExtLights] = useState(false);
    const [station, setStation] = useState(false);
    const [setpointSpeed, setSetpointSpeed] = useState();
    const [temperatureControl, setTemperatureControl] = useState();
    const [currentSpeed, setCurrentSpeed] = useState();
    const [commandedSpeed, setCommandedSpeed] = useState();
    const [speedLimit, setSpeedLimit] = useState();
    const [power, setPower] = useState();
    const [authority, setAuthority] = useState();
    const [grade, setGrade] = useState();
    const [intTemp, setIntTemp] = useState();
    const [extTemp, setExtTemp] = useState();

    Firebase.app();

    function getData() {
		let ref = Firebase.database().ref('/TC/InternalLightCommand');
		ref.on('value', snapshot => {
			setIntLights(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/ExternalLightCommand');
		ref.on('value', snapshot => {
			setExtLights(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/AnnounceNextStation');
		ref.on('value', snapshot => {
			setStation(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/SetpointSpeedCommand');
		ref.on('value', snapshot => {
			setSetpointSpeed(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/TemperatureCommand');
		ref.on('value', snapshot => {
			setTemperatureControl(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/CurrentSpeed');
		ref.on('value', snapshot => {
			setCurrentSpeed(snapshot.val());
		});
        ref = Firebase.database().ref('/TM/CommandedSpeed');
		ref.on('value', snapshot => {
			setCommandedSpeed(snapshot.val());
		});
        ref = Firebase.database().ref('/TM/SpeedLimit');
		ref.on('value', snapshot => {
			setSpeedLimit(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/Power');
		ref.on('value', snapshot => {
			setPower(snapshot.val());
		});
        ref = Firebase.database().ref('/TM/Authority');
		ref.on('value', snapshot => {
			setAuthority(snapshot.val());
		});
        ref = Firebase.database().ref('/TM/Grade');
		ref.on('value', snapshot => {
			setGrade(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/InternalTemperature');
		ref.on('value', snapshot => {
			setIntTemp(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/ExternalTemperature');
		ref.on('value', snapshot => {
			setExtTemp(snapshot.val());
		});

	}

	function setData(newState, commandType) {
        if(commandType == "int"){
            Firebase.database().ref('/TC/InternalLightCommand').set(newState);
        }
        else if(commandType == "ext"){
            Firebase.database().ref('/TC/ExternalLightCommand').set(newState);
        }
        else if(commandType == "sta"){
            Firebase.database().ref('/TC/AnnounceNextStation').set(newState);
        }
        else if(commandType == "set"){
            Firebase.database().ref('/TC/SetpointSpeedCommand').set(newState);
        }
        else if(commandType == "tem"){
            Firebase.database().ref('/TC/TemperatureCommand').set(newState);
        }
	}

    const setpoint = useCallback(
        async event => {
            event.preventDefault();
            const {setpointSpeed} = event.target.elements;
            setSPS(setpointSpeed.value);
        }, []
    );

    const temperature = useCallback(
        async event => {
            event.preventDefault();
            const {temperatureControl} = event.target.elements;
            setTemp(temperatureControl.value);
        }, []
    );

    function getSPS(){
        let ref = Firebase.database().ref('/TC/SetpointSpeedCommand');
        ref.on('value', snapshot => {
            setSetpointSpeed(snapshot.val());
        });
    }

    function setSPS(newSPS){
        Firebase.database().ref('/TC/SetpointSpeedCommand').set(parseInt(newSPS))
    }

    function getTemp(){
        let ref = Firebase.database().ref('/TC/TemperatureCommand');
        ref.on('value', snapshot => {
            setTemperatureControl(snapshot.val());
        });
    }

    function setTemp(newTemp){
        Firebase.database().ref('/TC/TemperatureCommand').set(parseInt(newTemp))
    }

    useEffect(getData, []);
    useEffect(() => getSPS());
    useEffect(() => getTemp());

    return (
        <div>
            <h1>TRAIN STATUS</h1>
            <Container>
                <Col xs={4}>
                    <p>Current Speed: {currentSpeed}</p>
                    <p>Commanded Speed: {commandedSpeed}</p>
                </Col>
                <Col xs={4}>
                    <p>Speed Limit: {speedLimit}</p>
                    <p>Power: {power}</p>
                </Col>
                <Col xs={4}>
                    <p>Authority: {authority}</p>
                    <p>Grade: {grade}</p>
                </Col>
                <Col xs={4}>
                    <p>Internal Temp: {intTemp}</p>
                    <p>External Temp: {extTemp}</p>
                </Col>
            </Container>
            <Container>
                <Col xs={4}>
                    <Button 
                        variant={intLights ? "primary" : "outline-primary"}
                        onClick={() => setData(!intLights, "int")}
                    >
                        Internal Lights
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button
                        variant={extLights ? "primary" : "outline-primary"}
                        onClick={() => setData(!extLights, "ext")}
                    >
                        External Lights
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button 
                        variant={station ? "primary" : "outline-primary"}
                        onClick={() => setData(!station, "sta")}
                    >
                        Announce Next Station
                    </Button>
                </Col>
            </Container>
            <Container>
                <Col xs={4}>
                    <Form onSubmit={setpoint}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Update Setpoint Speed</Form.Label>
                            <Form.Control name="setpointSpeed" placeholder={setpointSpeed} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={4}>
                    <Form onSubmit={temperature}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Update Temperature</Form.Label>
                            <Form.Control name="temperatureControl" placeholder={temperatureControl} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}

export default TrainStatus
