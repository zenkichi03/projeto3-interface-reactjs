import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../../config";

export const ProdutoCompra = ()=>{

    const {id} = useParams();

    const[data, setData]= useState([]);

    const[status, setStatus]= useState({
        type: '',
        message: ''
    });

    const getProdutoCompra = async()=>{
        await axios.get(api + '/compras/' + id + '/produtos')
        .then((response)=>{
            setData(response.data.item)
        })
        .catch(()=>{
            console.log("Erro");
        });
    }

    useEffect(()=>{
        getProdutoCompra();
    },[id])

    return(
        <Container>
            <div className="p-2 d-flex">
                <h1>Produtos da Compra</h1>
                <Link to={'/listar-compra'} className="btn btn-sm btn-outline-primary m-auto">Compras</Link>
            </div>            
            <Table striped>
                <thead>
                    <tr>
                        <th>ID do Produto</th>
                        <td>Quantidade</td>
                        <td>Valor</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>(
                        <tr key={item.ProdutoId}>
                            <td>{item.ProdutoId}</td>
                            <td>{item.quantidade}</td>
                            <td>{item.valor}</td>                            
                        </tr>
                    ))}                    
                </tbody>
            </Table>
        </Container>
    )
}