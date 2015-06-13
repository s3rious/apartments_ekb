import React from 'react';

class HelloWorld extends React.Component {

  constructor(props) {
    super(props);
    //set the state as a property on the class
    this.state = {};
  }

  componentWillMount() {
    //executes when the component is about to mount onto DOM
  }

  componentWillUnmount() {
    //executes when the component is about to unmount from DOM
  }

  customMethod() {
    //force a re-render by changing the state
    this.setState({})
  }

  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}
