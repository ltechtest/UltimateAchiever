/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import Navigator from './Navigator'
import { Provider } from 'mobx-react'
import stores from './stores'

export default class UltimateAchiever extends Component {
	render() {
		return (
			<Provider {...stores}>
				<Navigator />
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
})

AppRegistry.registerComponent('UltimateAchiever', () => UltimateAchiever)
