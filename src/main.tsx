import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';

import './styles.scss';

interface IAppState {
    q: string,
    isLoading: boolean,
    results: Array<ICardItemProps>
}

interface ICardItemProps {
    hostPageUrl: string,
    thumbnailUrl: string
    thumbnail: {
        width: number,
        height: number
    },
    name: string,
    imageId: string
}

class App extends React.Component<{}, IAppState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            q: '',
            isLoading: false,
            results: []
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }


    /*
    
    
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    */

    onSearchSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        console.log(this.state.q);
        this.setState({
            isLoading: true
        });
        axios.get(`api/images?q=${encodeURI(this.state.q)}&format=json&pretty=1`, {
            headers: {}
        }).then(result => {
            return result.data;
        }).then(data => {
            console.log('data');
            console.log(data);
            this.setState({
                results: data
            });
        }).finally(() => {
            this.setState({
                isLoading: false
            });
        });
        return false;
    }
    onSearchChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            q: ev.target.value
        });
    }
    render() {
        return <div>
            <div className="hero app-hero">
                <div className="hero-body">
                    <div className="notification is-warning is-light">
                        This is an implementation of the freeCodeCamp image search project.
                        Built using React, SCSS, Bulma CSS library and an integration with Bing image search API.
                        You can find the code here on <a href="#">GitHub</a>.
                    </div>
                    <h1 className="title">Image Search</h1>
                    <h2 className="subtitle">powered by Bing</h2>

                    <nav className="level">
                        <form onSubmit={this.onSearchSubmit} className="field has-addons">
                            <div className={`control ${this.state.isLoading ? 'is-loading' : ''}`}>
                                <input className="input" type="text" onChange={this.onSearchChange} />
                            </div>
                            <div className="control">
                                <button type="submit" className="button">Search</button>
                            </div>
                        </form>
                    </nav>
                </div>

            </div>

            <section className="section">
                <div className="container image-results">
                    {this.state.results.map((item) => CardItem(item))}
                </div>
            </section>
        </div>
    }
}

function CardItem(props: ICardItemProps) {
    return (<a href={props.hostPageUrl} key={props.imageId} className="image-item box">
        <figure className="image">
            <img src={props.thumbnailUrl} width={props.thumbnail.width} height={props.thumbnail.height} alt={props.name} />
        </figure></a>);
}

ReactDOM.render(<App />, document.getElementById('image-search-app'));