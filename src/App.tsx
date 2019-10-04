import * as React from 'react';
import { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface IState {
    activePlayerIndex: number;
    players?: any[],
    name: string,
    index: number;
}

export default class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            activePlayerIndex: 0,
            index: 0,
            name: '',
            players: []
        };

        this.handleAddingPlayer = this.handleAddingPlayer.bind(this);
        this.getPlayersName = this.getPlayersName.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.removeLife = this.removeLife.bind(this);
        this.removeAllPlayers = this.removeAllPlayers.bind(this);
        this.sortPlayers = this.sortPlayers.bind(this);
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
        const newPlayer = this.state.players.filter(player => player.id !== id);
        const indexOfNextPlayer = newPlayer.findIndex(selectedPlayer => selectedPlayer.id === id + 1);

        this.setState({ activePlayerIndex: indexOfNextPlayer });
        this.setState({players: newPlayer})
    }

    public removeAllPlayers(): void {
        this.setState({players: []});
        this.setState({activePlayerIndex: 0})
    };

    public addLife(event, id): void {
        const newState = Object.assign([], this.state.players);
        const indexOfPlayer = newState.findIndex(selectedPlayer => selectedPlayer.id === id);
        const player = newState[indexOfPlayer];

        let indexOfNextPlayer = newState.findIndex(selectedPlayer => selectedPlayer.id === id + 1);

        if (indexOfNextPlayer === -1) {
            indexOfNextPlayer = 0
        }

        player.lives = player.lives + 1;

        this.setState({ activePlayerIndex: indexOfNextPlayer });
        this.setState({players: newState})
    }

    public removeLife(event, id): void {
        const newState = Object.assign([], this.state.players);
        const indexOfPlayer = newState.findIndex(selectedPlayer => selectedPlayer.id === id);
        const player = newState[indexOfPlayer];

        let indexOfNextPlayer = newState.findIndex(selectedPlayer => selectedPlayer.id === id + 1);

        if (indexOfNextPlayer === -1) {
            indexOfNextPlayer = 0
        }

        player.lives = player.lives - 1;

        this.setState({ activePlayerIndex: indexOfNextPlayer });
        this.setState({ players: newState })
    }

    public sortPlayers(): void {
        const newState = Object.assign([], this.state.players);
        newState.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.name > b.name) ? 1 : -1) : -1 );

        this.setState({ players: newState })
    }

    public getPlayer(player) {
        return <ScrollView key={player.id}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                {this.state.activePlayerIndex === player.id ?
                <Text style={{fontSize: 16, fontWeight: 'bold', margin: 5, color: '#030603', flexGrow: 1, flexShrink: 0, flexBasis: '17%'}}>{player.name}</Text>
                    :
                <Text style={{fontSize: 16, fontWeight: 'bold', margin: 5, color: '#EEF5DB', flexGrow: 1, flexShrink: 0, flexBasis: '17%'}}>{player.name}</Text>
                }
                <Text style={{fontSize: 16, color: '#EEF5DB', flexGrow: 1, margin: 5, flexShrink: 0, flexBasis: '17%'}}>{player.lives}</Text>

                <Text onPress={(e) => {this.removeLife(e, player.id)}} style = {[styles.buttonLives, {margin: 5, flexGrow: 1, flexShrink: 0, flexBasis: '17%'}]}>- life</Text>

                <Text onPress={(e) => {this.addLife(e, player.id)}} style = {[styles.buttonLives, {margin: 5, flexGrow: 1, flexShrink: 0, flexBasis: '17%'}]}>+ life</Text>

                <Text onPress={(e) => {this.removePlayer(e, player.id)}} style = {[styles.buttonLives, {margin: 5, flexGrow: 1, flexShrink: 0, flexBasis: '17%'}]}>Remove</Text>
            </View>

        </ScrollView>
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', paddingBottom: 20, fontSize: 34, color: '#EEF5DB'}}>Killer</Text>
                <TextInput onChangeText={(e) => this.getPlayersName(e)} value={this.state.name} placeholder={'Username'} style={styles.input}/>

                <Text style={styles.button} onPress={this.handleAddingPlayer}>add player</Text>
                <ScrollView style={{display: 'flex', paddingTop: 20, alignSelf: 'stretch', alignContent: 'center', paddingRight: 5, paddingLeft: 5}}>
                    {
                        this.state.players.map(player => {
                            return this.getPlayer(player);
                        })
                    }
                    <Text>{this.state.activePlayerIndex}</Text>
                </ScrollView>
                {this.state.players.length > 0 ?
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                        <Text style={styles.bottomButtons} onPress={this.removeAllPlayers}>New Game</Text>
                        <Text style={styles.bottomButtons} onPress={this.sortPlayers}>Sort Players</Text>
                    </View>
                    : false}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottomButtons: {
        alignContent:'center',
        backgroundColor: '#4f6367',
        borderColor: '#EEF5DB',
        borderRadius: 5,
        borderWidth: 1,
        color: '#EEF5DB',
        fontSize: 12,
        fontWeight: 'bold',
        margin: 5,
        marginTop: 12,
        overflow: 'hidden',
        padding: 8,
        textAlign:'center'
    },
    button: {
        alignContent:'center',
        backgroundColor: '#4f6367',
        borderColor: '#EEF5DB',
        borderRadius: 5,
        borderWidth: 1,
        color: '#EEF5DB',
        fontSize: 12,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign:'center'
    },
    buttonLives: {
        alignContent:'center',
        backgroundColor: '#4f6367',
        borderColor: '#EEF5DB',
        borderRadius: 3,
        borderWidth: 1,
        color: '#EEF5DB',
        fontSize: 10,
        overflow: 'hidden',
        padding: 3,
        textAlign:'center'
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#fe5f55',
        flex: 1,
        paddingBottom: 40,
        paddingTop:55
    },
    heading: {
        alignItems: 'center',
        fontSize: 20,
        padding: 10
    },
    input: {
        borderColor: '#EEF5DB',
        borderRadius: 5,
        borderWidth: 1,
        color: '#EEF5DB',
        marginBottom: 10,
        padding: 15,
        width: 200
    },
    row: {
        width: 40,
    },
});
