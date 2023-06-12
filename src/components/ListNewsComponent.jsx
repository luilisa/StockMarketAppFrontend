import React, { Component } from 'react';
import NewsService from '../services/NewsService';
import { Link as RouterLink } from "react-router-dom";

class ListNewsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            news: []
        }
    }

    componentDidMount() {
        NewsService.getNews().then((res) => {
            this.setState({news: res.data});
        });
    }


    render() {
        return (
            <div>
                 <br></br>
                 {/* <RouterLink to = {"/create-news"}>
                         <button className="btn btn-info">Create news </button>
                     </RouterLink> */}
                 <div className = "row"> 
                 <table className = "table table-striped table-bordered"  >
                     <thead className="dark">
                         <tr>
                             <th  style={{ width: '60rem' }}>Заголовок</th>
                             <th>Дата</th>
                             <th>Действия</th>
                         </tr>
                     </thead>

                     <tbody>
                         {
                            this.state.news.map(
                                news => 
                                <tr key = {news.id}>
                                <td> {news.title} </td>
                                <td> {news.pub_date} </td>
                            
                                <td> 
                                {/* <a href to = {news.link}> */}
                                <a href={news.link} target="_blank" className="btn btn-outline-info">Подробнее </a>
                                 {/* </a> */}
                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteNews(news.id)} className="btn btn-outline-danger">Удалить </button>
                                </td>
                                </tr>
                            )
                         }
                     </tbody>
                 </table>
                </div>
            </div>
        );
    }
}

export default ListNewsComponent;