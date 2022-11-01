import React, { Component } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {show : true};
  }
  render() {
    return (
        <>
          <Header className={'container-fluid p-0 header position-sticky'}/>            <Footer/>
        </>
    )
  }
}

