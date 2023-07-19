import { Link, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../../config";
import axios from "axios";
import { useEffect, useState } from "react";

export const CompraCliente = ()=>{

    const {id} = useParams();

    const [data , setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getComprasCliente = async()=>{
        await axios.get(api + '/clientes/' + id + '/compras')
        .then((response)=>{
            if(response.data.error){                
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setData(response.data.item)
            }
        })
        .catch(()=>{
            console.log("Erro")
        });
    }

    useEffect(()=>{
        getComprasCliente();
    },[id]);
    
    return(
        <Container>
            <div className="p-2 d-flex">
                <h1>Compras do Cliente</h1>
                <Link to={'/listar-cliente'} className="btn bnt-sm btn-outline-primary m-auto">Clientes</Link>                
            </div>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID da Compra</th>
                        <td>Data da Compra</td>                        
                    </tr>
                </thead>
                <tbody>
                    {data.map(item=>(
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <td>{item.data}</td>                            
                        </tr>
                    ))}                    
                </tbody>
            </Table>
        </Container>
    )
}