import React from 'react';
import './post-list.css';
import PostListItem from "../PostListItem/PostListItem";
import { ListGroup } from 'reactstrap';

export default function PostList({posts, onDelete, onToggle}) {
    const elements = posts.map((item) => {
        return (
            <li key={item.id} className='list-group-item'>
             <PostListItem
                 label={item.label}
                 important={item.important}
                 like={item.like}
                 onDelete={() => onDelete(item.id)}
                 onToggleImportant={() => onToggle(item.id, 'important')}
                 onToggleLiked={() => onToggle(item.id, 'like')}/>
            </li>
        )
    })

    return (
        <ListGroup className='app-list'>
            {elements}
        </ListGroup>

    )

}