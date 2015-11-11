'use strict';

import jsdomHelper from '../testHelper/jsdomHelper';
jsdomHelper();

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import IBDecorate from '../src';
import chai from 'chai';

var should = chai.should();
var root = document.createElement('div');
window.document.body.appendChild(root);

describe('api', function () {
	class TestComponent extends Component {

		constructor(props) {
			super(props);
			this.state  = {
				say: "Hello world",
				rock: false
			};
		}


		componentDidMount() {
			let self = this;
			let {rock} = this.getState();

			it('should be an Hello world', function (done) {

				setTimeout(()=> {
					if (self.unmount) return;
					self.setState({
						say: rock ? 'Rock the world' : 'Hello world',
						rock:!rock
					}, ()=> {
						if (rock) self.getState('say').should.be.equal('Rock the world');
						else self.getState('say').should.be.equal('Hello world');
						done();
					});
				}, 1000);

			})
		}

		componentWillUnmount() {
			this.unmount = true;
		}

		render() {
			return (
				<div>{this.getState('say')}</div>
			);
		}
	}

	IBDecorate(TestComponent);

	it('should have getState',()=>{
		TestComponent.prototype.should.have.property('getState');
	});

	it('should have setState',()=>{
		TestComponent.prototype.should.have.property('setState');
	});


	it('should have fromJS',()=>{
		TestComponent.prototype.should.have.property('fromJS');
	});

	ReactDOM.render(
		<TestComponent/>,
		root
	);

})