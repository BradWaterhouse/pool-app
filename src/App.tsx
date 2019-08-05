import * as React from 'react';
import { Component } from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface IState {
    players?: any[],
    name: string
}

interface IProps {}

export default class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            name: '',
            players: [],
        };

        this.handleAddingPlayer = this.handleAddingPlayer.bind(this)
        this.getPlayersName = this.getPlayersName.bind(this)
        this.reduceLife = this.reduceLife.bind(this)
    }

    public getPlayersName (name) {
        this.setState({name})
    }

    public handleAddingPlayer(): void {
        const player = {'name': this.state.name, 'lives': 3, id: 1}
        this.setState({
            players: [...this.state.players, player]
        });
        this.setState({name: ''})
    };

    public reduceLife(id): void {
        const red = 'lol'
    };

    public showAllPlayers(player) {
        return <ScrollView>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', paddingBottom: 6, flex: 1}}>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} />
                    <Text style={{fontSize: 16}}>{player.name}</Text>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} />
                    <Text style={{fontSize: 16}}>{player.lives}</Text>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} />
                    <Text onPress={this.reduceLife} style = {{ color: '#ff0300' }}>- life</Text>
                    <View style={{flex: 1, alignSelf: 'stretch' }} />
                    <Text onPress={this.reduceLife} style = {{ color: '#70ff4a' }}>+ life</Text>
                    <View style={{flex: 1, alignSelf: 'stretch' }} />
                    <Text onPress={this.reduceLife(player.id)} style = {{ color: '#ffd552' }}>Remove player</Text>
                </View>

        </ScrollView>
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', paddingBottom: 20, fontSize: 34}}>
                    Blidworth Killer
                </Text>
                <TextInput
                    onChangeText={(e) => this.getPlayersName(e)}
                    value={this.state.name}
                    placeholder={'Username'}
                    style={styles.input}
                />
                <Button title={'add player'} onPress={this.handleAddingPlayer}/>
                <ScrollView style={{paddingTop: 10}}>
                    {
                        this.state.players.map((lol, key) => { // This will render a row for each data element.
                            return this.showAllPlayers(lol);
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    paddingBottom: 10,
    textAlign:'center'
  },
  container: {
      alignItems: 'center',
      backgroundColor: '#1560ff',
      paddingTop:50,
  },
  heading: {
    alignItems: 'center',
    fontSize: 20,
    padding: 10
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: 200,
  }
});
