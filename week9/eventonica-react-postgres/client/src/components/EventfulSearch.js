import React, { Component } from 'react';

export default class EventfulSearch extends Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {events: [], firstSearch: true, loading: false};
  }

  search = (browserEvent) => {
    browserEvent.preventDefault();

    const keywords = this.inputRef.current.value;
    const params = {keywords, page_size: 5};
    const queryString = Object.keys(params)
      .map(k => `${k}=${encodeURIComponent(params[k])}`)
      .join('&');

    fetch(`http://localhost:5001/events?${queryString}`)
      .then(resp => resp.json())
      .then(json => this.setState({events: json, loading: false}));

    this.setState({loading: true, firstSearch: false});
  }

  render() {
    const { events, firstSearch, loading } = this.state;

    // TODO: probably want to replace with your own <Event/> component
    const eventItems = events.map(e => <li>{e.title}</li>);

    const resultsContent = firstSearch ? 'Search event keywords above.' : (
      loading ? 'loading...' : (
        events.length ? eventItems : 'No Results.'
      )
    );

    return (
      <React.Fragment>
        <form>
          <input type="text" ref={this.inputRef}/>
          <button onClick={this.search}>Search</button>
        </form>
        <h2>Results</h2>
        <ul className="results">
          {resultsContent}
        </ul>
      </React.Fragment>
    );
  }
}