import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../config";

export const CompraProduto = ()=>{

    const { id } = useParams();

    const[data, setData]= useState([]);

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getComprasProduto = async()=>{
        await axios.get(api + '/produtos/' + id + '/compras')
        .then((response)=>{
            if(response.data.error){
                console.log(response.data)
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                console.log(response.data);
                setData(response.data.item);
            }
        })
        .catch(()=>{
            console.log("Erro");
        });
    }

    useEffect(()=>{
        getComprasProduto();
    },[id])

    return(
        <Container>
            <div className="p-2 d-flex">
                <h1>Compras do Produto</h1>
                <Link to={'/listar-produto'} className="btn btn-sm btn-outline-primary m-auto">Produtos</Link>                
            </div>
            {status.type == 'error' ? <Alert>{status.message}</Alert> : ''}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID da Compra</th>
                        <td>Valor</td>
                        <td>Quantidade</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>(
                        <tr key={item.CompraId}>
                            <th>{item.CompraId}</th>
                            <td>{item.valor}</td>
                            <td>{item.quantidade}</td>
                        </tr>
                    ))}                    
                </tbody>
            </Table>
        </Container>
    )
}