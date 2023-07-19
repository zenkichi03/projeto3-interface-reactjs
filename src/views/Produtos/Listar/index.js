import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../config";

export const ListarProduto = ()=>{

    const[data, setData]= useState([]);

    const[status, setStatus]= useState({
        type: '',
        message: ''
    });

    const getProdutos = async()=>{
        await axios.get(api + '/listaprodutos')
        .then((response)=>{
            if(response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
                console.log(response.data.error)                
            }else{                
                setData(response.data.item);
                console.log(response.data.error) 
            }            
        })
        .catch(()=>{            
            console.log("Erro");
            setStatus({
                type: 'error',
                message: 'Erro de conexão com a API.'
            })
        });
    }

    const excluirProduto = async(idProduto)=>{
        const headers={
            'Content-type': 'application/json'
        }

        await axios.delete(api + '/excluirproduto/' + idProduto,{headers})
        .then((response)=>{
            if(response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
                getProdutos();
            }
        })
    }

    useEffect(()=>{
        getProdutos();
    },[])

    return(
        <Container>
            <div className="p-2 d-flex">
                <h1>Visualizar Produtos</h1>
                <Link to={'/cadastrar-produto'} className="btn btn-sm btn-outline-primary m-auto">Cadastrar Produto</Link>
            </div>
            {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
            {status.type == 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <td>Nome</td>
                        <td>Descrição</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item=>(
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>                                                                            
                            <td>
                                <Link to={'/atualizar-produto/' + item.id} className="btn btn-sm btn-outline-warning">Editar</Link>                                
                                <span className="btn btn-sm btn-outline-danger" onClick={()=> excluirProduto(item.id)}>Excluir</span>
                                <Link to={'/compra-produto/' + item.id} className="btn btn-sm btn-outline-primary">Compras</Link>
                            </td>
                        </tr>
                    ))}                    
                </tbody>
            </Table>
        </Container>
    )
}