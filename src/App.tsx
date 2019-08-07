import * as React from 'react';
import { Component } from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface IState {
    players?: any[],
    name: string,
    index: number;
}

interface IProps {}

export default class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            index: 0,
            name: '',
            players: []
        };

        this.handleAddingPlayer = this.handleAddingPlayer.bind(this);
        this.getPlayersName = this.getPlayersName.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.removeLife = this.removeLife.bind(this);
    }

    public getPlayersName (name) {
        this.setState({name})
    }

    public handleAddingPlayer(): void {
        const players = this.state.players;
        const index = this.state.index;

        const player = {name: this.state.name, lives: 3, id: index};
        this.setState({players: [...players, player], index: index + 1, name: ''});
    };

    public removePlayer(event, id): void {
        const data = this.state.players.filter(player => player.id !== id);

        this.setState({players: data})
    }

    public removeLife(event, id): void {
        const player = this.state.players[id];
        player.lives = player.lives - 1;
        this.setState({players: {
                ...this.state.players,
                [this.state.players[id]]: {...player}
    }
    })
    }

    public showAllPlayers(player) {
        return <ScrollView key={player.id}>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', paddingBottom: 6, flex: 1}}>
                <Text style={{fontSize: 16}}>{player.name}</Text>
                <View style={ styles.row } />
                <Text style={{fontSize: 16}}>{player.lives}</Text>
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <Text onPress={(e) => {this.removeLife(e, player.id)}} style = {{ color: '#ff0300' }}>- life</Text>
                <View style={ styles.row } />
                <Text onPress={this.removePlayer} style = {{ color: '#70ff4a' }}>+ life</Text>
                <View style={styles.row} />
                <Text onPress={(e) => {this.removePlayer(e, player.id)}} style = {{ color: '#ffd552' }}>Remove player</Text>
            </View>

        </ScrollView>
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', paddingBottom: 20, fontSize: 34}}>Blidworth Killer</Text>
                <TextInput onChangeText={(e) => this.getPlayersName(e)} value={this.state.name} placeholder={'Username'} style={styles.input}/>

                <Text style={styles.button} onPress={this.handleAddingPlayer}>add player</Text>
                <ScrollView style={{paddingTop: 10, alignSelf: 'stretch', alignContent: 'center', paddingRight: 5, paddingLeft: 5}}>
                    {
                        this.state.players.map(player => {
                            return this.showAllPlayers(player);
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignContent:'center',
        backgroundColor: 'black',
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign:'center'
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
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        padding: 12,
        width: 200,
    },
    row: {
        width: 40,
    },
});