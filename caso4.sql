CREATE DATABASE IF NOT EXISTS caso_quatro_test;

/* 
Criacao de tabelas
*/

CREATE TABLE IF NOT EXISTS clientes(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS vendedores(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS vendas(
    id SERIAL PRIMARY KEY,
    valor_total INTEGER NOT NULL,
    data DATE NOT NULL,
    cliente_id INTEGER NOT NULL,
    vendedor_id INTEGER NOT NULL,
    FOREIGN KEY(cliente_id) REFERENCES clientes(id),
    FOREIGN KEY(vendedor_id) REFERENCES vendedores(id)
);

/* 
Insercao de mock
*/

INSERT INTO clientes (nome, email, telefone)
VALUES  ('alfredo', 'teste1@teste.com', '986467388'),
        ('jose', 'teste2@teste.com', '986467389'),
        ('maria', 'teste3@teste.com', '986467387');
        
INSERT INTO vendedores (nome)
VALUES  ('vendedor 1'),
        ('vendedor 2');

/* ex 1 -> Faça uma consulta e traga todas as vendas do cliente com nome alfredo*/

WITH cliente_infos AS (
    SELECT id FROM clientes WHERE nome = 'alfredo')
SELECT * FROM vendas WHERE cliente_id = (SELECT id FROM cliente_infos);

/* ex 2 -> Faça uma consulta e traga todas as vendas do vendedor 1*/

WITH vendedor_infos AS (
    SELECT id FROM vendedores WHERE nome = 'vendedor 1')
SELECT * FROM vendas WHERE vendedor_id = (SELECT id FROM vendedor_infos);

/* ex 3 -> Atualize todas as vendas do do cliente com o id 1 */

UPDATE vendas SET valor_total = 0 WHERE cliente_id = 1;

/* ex 4 -> Exclua os dados do vendedor com id 2 */

DELETE FROM vendedores WHERE id = 2;