import { Form, Button, Container, Row, Col } from "react-bootstrap"


const ApplicationList = (props) => {
    return (
        <Container><Row>
            {props.applications ? (props.applications.map((application) => (
                <Col>  <Form>
                    <Form.Group>
                        <Form.Text>
                            Request by:  {application.lendee_id} to lend book: {application.title}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check id="inline-checkbox-1" type="checkbox" label="Accept" inline />
                        <Form.Check id="inline-checkbox-2" type="checkbox" label="Deny" inline />
                    </Form.Group>
                    <Button type="submit"> Sumbit</Button>
                </Form></Col>))
            ) : <h1>No requests</h1>}
        </Row>
        </Container>
    )
}

export default ApplicationList