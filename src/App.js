import './App.css';
import React, {Component} from 'react';
import AppHeader from "./components/AppHeader/AppHeader";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import PostStatusFilter from "./components/PostStatusFilter/PostStatusFilter";
import PostList from "./components/PostList/PostList";
import PostAddForm from "./components/PostAddForm/PostAddForm";
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`

// const StyledAppBlock = styled(AppBlock)`
//     background-color: grey;
// `


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    label: 'Going to learn React',
                    important: true,
                    like: false,
                    id: 1
                },
                {
                    label: 'That is so good',
                    important: false,
                    like: false,
                    id: 2
                },
                {
                    label: 'I need a break...',
                    important: false,
                    like: false,
                    id: 3
                }
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.maxId = 4;
    }

    deleteItem (id) {
        //нельзя просто удалить splice элемент из массива
        //это нарушает структуру state
        this.setState(({data}) => {
            //находим эдемент по индексу
            const index = data.findIndex(elem => elem.id === id);
            //вырезаем из массива всех элементов
            //все что до этого элемента
            const before = data.slice(0, index);
            //и все что после
            const after = data.slice(index + 1);
            //формируем и возвращаем новый массив объектов
            const newArr = [...before, ...after];

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({data})=> {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            //ищем индекс нужного элемента
            const index = data.findIndex(elem => elem.id === id);

            //в нем мы заменяем свойство like на противоположное
            const old = data[index];
            const newItem = {...old, important: !old.important};

            // вырезаем массив с двух сторон,
            // до измененного объекта и после. и вместо старого объекта вставляем новый
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {data: newArr}
        })

    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            //ищем индекс нужного элемента
            const index = data.findIndex(elem => elem.id === id);

            //в нем мы заменяем свойство like на противоположное
            const old = data[index];
            const newItem = {...old, like: !old.like};

            // вырезаем массив с двух сторон,
            // до измененного объекта и после. и вместо старого объекта вставляем новый
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {data: newArr}
        })
    }

    searchPost(items, term) {
        if(term.length === 0) {
           return items
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })

    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        if(filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

  render () {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

      return (
          <AppBlock>
              <AppHeader
                  liked={liked}
                  allPosts={allPosts}
              />
              <div className='search-panel d-flex'>
                  <SearchPanel
                      onUpdateSearch={this.onUpdateSearch}
                  />
                  <PostStatusFilter
                      filter={filter}
                      onFilterSelect={this.onFilterSelect}
                  />
              </div>
              <PostList
                  posts={visiblePosts}
                  onDelete={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleLiked={this.onToggleLiked}
              />
              <PostAddForm
                  onAdd={this.addItem}
              />
          </AppBlock>

      );
  }
}


