import React from 'react';
import { Link } from 'react-router-dom';
import { LISTA_PRODUTOS } from '../data';
import '../css/style.css'

export default function Vitrine(props) {
    return (
        <div>
            <h1 className='text-center my-3'>Livros Disponíveis</h1>

            <div className="col-12 row m-3">
                {LISTA_PRODUTOS.map((item, index) => <div className="card col-lg-4 col-md-6 col-sm-12 ml-2" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{item.nome}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{item.editora} - R${item.valor},00</h6>
                        <p className="card-text">{item.descricao}</p>
                        <Link
                            to="/carrinho"
                            className="btn btn-link"
                            onClick={e => {
                                let carrinho = window.sessionStorage.getItem('carrinho')
                                carrinho = carrinho ? JSON.parse(carrinho) : []

                                let found = false; //flag para checar a função

                                let temp = carrinho.map(produto => { //"update"
                                    if (produto.id === index) {
                                        produto.quantidade += 1
                                        found = true
                                    }
                                    return produto
                                })

                                if (!found) {
                                    temp.push({ id: index, quantidade: 1 }) //insert
                                }
                                window.sessionStorage.setItem('carrinho', JSON.stringify(temp)) // converter para evitar bugs
                            }}
                        >
                            Adicionar ao carrinho
                        </Link>
                        <Link to={`/detalhes/${index}`} className="card-link">Detalhes</Link>
                    </div>
                </div>
                )}
            </div>
            <Link
                to='/carrinho'
                title='Adicionar ao carrinho'
                className="btn btn-success"
                style={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    fontSize: 30,
                    width: 60
                }}
            >
                <i className='bi bi-cart' />
            </Link>
        </div>
    )
}