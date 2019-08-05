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
        this.removePlayer = this.removePlayer.bind(this)
    }

    public getPlayersName (name) {
        this.setState({name})
    }

    public handleAddingPlayer(): void {
        const players = this.state.players;
        const player = {'name': this.state.name, 'lives': 3, id: players.length};
        this.setState({
            players: [...players, player]
        });
        this.setState({name: ''})
    };

    public removePlayer(id): void {
        const data = this.state.players.filter(player => {
            return player.id !== id
        });

        this.setState({players: data })
    }

    public showAllPlayers(player) {
        return <ScrollView>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', paddingBottom: 6, flex: 1}}>
                    <Text style={{fontSize: 16}}>{player.name}</Text>
                    <View style={ styles.row } />
                    <Text style={{fontSize: 16}}>{player.id}</Text>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} />
                    <Text onPress={this.removePlayer(player.id)} style = {{ color: '#ff0300' }}>- life</Text>
                    <View style={ styles.row } />
                    <Text onPress={this.removePlayer(player.id)} style = {{ color: '#70ff4a' }}>+ life</Text>
                    <View style={styles.row} />
                    <Text onPress={this.removePlayer(player.id)} style = {{ color: '#ffd552' }}>Remove player</Text>
                </View>

        </ScrollView>
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', paddingBottom: 20, fontSize: 34}}>
                    Blidworth pool
                </Text>
                <TextInput
                    onChangeText={(e) => this.getPlayersName(e)}
                    value={this.state.name}
                    placeholder={'Username'}
                    style={styles.input}
                />
                <Text style={styles.button} onPress={this.handleAddingPlayer}>add player</Text>
                <ScrollView style={{paddingTop: 10, alignSelf: 'stretch', alignContent: 'center', paddingRight: 5, paddingLeft: 5}}>
                    {
                        this.state.players.map((lol, key) => {
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
    borderRadius: 5,
    borderWidth: 1,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
      padding: 8,
    textAlign:'center',
      alignContent:'center'
  },
  container: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingTop:55,
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
       borderRadius: 5,
    padding: 12,
    width: 200,
    },
  row: {
    width: 40,
    },
});
