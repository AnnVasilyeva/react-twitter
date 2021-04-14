import React from 'react';
import './app-header.css';
import styled from 'styled-components';


//можно прописать стили прямо в этом файле:
const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 26px;
        // Если в Header передан colored то цвет заголовка изменится
        color: ${props => props.colored ? 'red' : 'black'};
        :hover {
            color: blue;
        }
    }
    h2 {
        font-size: 1.2rem;
        color: grey;
    }
`

export default function AppHeader({liked, allPosts}) {
    return (
        <Header>
            <h1>Ann Vasilyeva</h1>
            <h2>{allPosts} записей, из них понравилось {liked}</h2>
        </Header>
    )

}