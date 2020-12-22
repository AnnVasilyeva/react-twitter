import React from 'react';
import './post-list.css';
import PostListItem from "../PostListItem/PostListItem";
import { ListGroup } from 'reactstrap';

export default function PostList({posts, onDelete, onToggleImportant, onToggleLiked}) {
    const elements = posts.map((item) => {
        return (
            <li key={item.id} className='list-group-item'>
             <PostListItem
                 label={item.label}
                 important={item.important}
                 like={item.like}
                 onDelete={() => onDelete(item.id)}
                 onToggleImportant={() => onToggleImportant(item.id)}
                 onToggleLiked={() => onToggleLiked(item.id)}
             />
            </li>
        )
    })

    return (
        <ListGroup className='app-list'>
            {elements}
        </ListGroup>

    )

}