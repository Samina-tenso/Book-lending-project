import { useEffect, useState } from "react"
import { getUserApplications } from '../api/book.api'
import { Container, Row, Col } from 'react-bootstrap'
import ApplicationList from "./ApplicationList"

const MyApplications = () => {
    const [applications, setApplication] = useState()
    useEffect(() => {
        getUserApplications().then((response) => {
            console.log(response)
            return setApplication(response)
        })
    }, [])
    return (
        <Container>
            <h1>My Applications</h1>
            <ApplicationList applications={applications} />

        </Container>
    )
}
export default MyApplications