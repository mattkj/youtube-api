import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {youTube} from '../utils/gapi';
import {data, defaultFilter} from '../data';
import Header from './Header';
import Home from './Home';
import Video from './Video';
import shuffleArray from '../utils/shuffleArray';

class App extends Component {
  constructor(){
    super();
    this.state = {
      videos: [],
      loading: true,
      currentFilter: defaultFilter
    }
    this.filterVideos = this.filterVideos.bind(this);
  }

  async filterVideos(filter){
    let videos = data;
    if (filter === defaultFilter){
      shuffleArray(videos);
    } else {
      videos = videos.filter(video => video.tags.includes(filter));
    }
    videos = videos.map(video => {
      return video.url.substring(video.url.indexOf("?v=") + 3);
    }).join();

    const filteredVideos = await youTube.getVideos(videos);
    this.setState({
      videos: filteredVideos.result.items,
      loading: false,
      currentFilter: filter
    });
  }

  render(){
    return (
        <Router>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path='/' render={() => <Home videos={this.state.videos} loading={this.state.loading} filterVideos={this.filterVideos} currentFilter={this.state.currentFilter} />} />
              <Route path='/video/:id' component={Video} />
              <Route render={() => <Home videos={this.state.videos} loading={this.state.loading} filterVideos={this.filterVideos} currentFilter={this.state.currentFilter} />} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
