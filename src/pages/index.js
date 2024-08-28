import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard(){
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST

    const [number, setNumber] = useState(0)
    const [result, setResult] = useState([])
    const [error, setError] = useState({})

    const changeNumber = (e)=> setNumber(e.target.value)

    const doValidate = ()=>{
        if (parseInt(number)==0){
            alert("Form Salah")

            return false
        }

        return true
    }

    const doCalculateSegitiga = async ()=>{
        let response
        try{
            if (doValidate()==false)
                return

            let url = API_HOST+'/calculate/segitiga'
            console.log(url)

            response = await axios.post(url, {
                number: number
            })
            console.log('r', response)
            if (response.status!=200)
                throw new Error("error")

            setResult(response.data.data)
            setError({})
        }catch(e){
            setResult([])
            console.log(response)
            setError(response.data)
        }
    }

    const doCalculateGanjil = async ()=>{
        let response
        try{
            if (doValidate()==false)
                return

            let url = API_HOST+'/calculate/ganjil'

            response = await axios.post(url, {
                number: number
            })

            if (response.status!=200)
                throw new Error("error")

            setResult(response.data.data)
            setError({})
        }catch(e){
            setResult([])
            setError(response.data)
        }
    }

    const doCalculatePrima = async ()=>{
        let response
        try{
            if (doValidate()==false)
                return

            let url = API_HOST+'/calculate/prima'

            response = await axios.post(url, {
                number: number
            })

            if (response.status!=200)
                throw new Error("error")

            setResult(response.data.data)
            setError({})
        }catch(e){
            setResult([])
            setError(response.data)
        }
    }

    // useEffect(()=>{
    //     console.log(number)
    //     console.log(result)
    //     console.log(error)
    // }, [number, result, error])

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <input type="number" placeholder="Input Angka" onChange={(e)=> changeNumber(e)}></input>
                </Col>
                <Col md={4}>
                    <button onClick={doCalculateSegitiga}>Segitiga</button>
                </Col>
                <Col md={4}>
                    <button onClick={doCalculateGanjil}>Ganjil</button>
                </Col>
                <Col md={4}>
                    <button onClick={doCalculatePrima}>Prima</button>
                </Col>
                <Col md={12}>
                    <h2>Result :</h2>
                    <hr />
                    {
                        Array.isArray(result) && result.length>0 && result.map((e)=>(
                            <p key={`key-${e}`}>
                                {e}
                            </p>
                        ))
                    }
                </Col>
            </Row>
        </Container>
    )
}
