import React from 'react';
import { Link } from 'react-router-dom';
import { LISTA_PRODUTOS } from '../data'

export default function Detalhes(props) {

    const [item, setItem] = React.useState({})

    React.useEffect(() => {
        const id = window.location.href.split('/').splice(-1)[0] //capturar a ultima posição do item, splice captura a ultima posição da url.
        setItem({...LISTA_PRODUTOS[id], id: parseInt(id)}) //construtor para recuperar dados do produto.
    }, [])


    return (
        <div className='mt-3 mx-3 row'>
            <div className="col-lg-8">
                <h2>{item.nome}</h2>
                <h5 className='py-3'>Detalhes do Produto:</h5>
                <h6>ASIN: {item.asin}</h6>
                <h6>Editora: {item.editora}</h6>
                <h6>Idioma: {item.idioma}</h6>
                <h6>Capa comum: {item.capaComum}</h6>
                <h6>ISBN-10: {item.isbn10}</h6>
                <h6>ISBN-13: {item.isbn13}</h6>
                <h6>Dimensões: {item.dimensoes}</h6>
            </div>
            <div className="col-lg-4 text-end mr-2">
                <i className='bi bi-cash-coin' style={{ fontSize: 70 }} /> <br />
                <strong>R$ {item.valor},00</strong>
            </div>

            <div className="row">
                <Link
                    to='/'
                    title='Ir para a vitrine'
                    className="btn btn-primary"
                    style={{
                        position: "absolute",
                        left: 10,
                        bottom: 10,
                        fontSize: 30,
                        width: 60
                    }}
                >
                    <i className='bi bi-house' />
                </Link>
                <Link
                    to='/carrinho'
                    title='Ir para o carrinho'
                    className="btn btn-success"
                    style={{
                        position: "absolute",
                        right: 10,
                        bottom: 10,
                        fontSize: 30,
                        width: 60
                    }}
                    onClick={() => {
                        let carrinho = window.sessionStorage.getItem('carrinho')
                        carrinho = carrinho ? JSON.parse(carrinho) : []

                        let found = false; 

                        let temp = carrinho.map(produto => { 
                            if (produto.id === item.id) {
                                produto.quantidade += 1
                                found = true
                            }
                            return produto
                        }) 

                        if (!found) {
                            temp.push({ id: item.id, quantidade: 1 })
                        }
                        window.sessionStorage.setItem('carrinho', JSON.stringify(temp))
                    }}
                >
                    <i className='bi bi-cart' />
                </Link>

            </div>

        </div>
    ) 
} 


 /* const id = window.location.href.split('/').splice(-1)[0]
       let item = LISTA_PRODUTOS[id]
       item.id = id
       setItem(item) */
