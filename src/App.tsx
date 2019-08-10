import * as React from 'react';
import { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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
        const newPlayer = this.state.players.filter(player => player.id !== id);
        this.setState({players: newPlayer})
    }

    public addLife(event, id): void {
        const newState = Object.assign([], this.state.players);
        const indexOfPlayer = newState.findIndex(selectedPlayer => selectedPlayer.id === id);
        const player = newState[indexOfPlayer];

        player.lives = player.lives + 1;

        this.setState({players: newState})
    }

    public removeLife(event, id): void {
        const newState = Object.assign([], this.state.players);
        const indexOfPlayer = newState.findIndex(selectedPlayer => selectedPlayer.id === id);
        const player = newState[indexOfPlayer];

        player.lives = player.lives - 1;

        this.setState({players: newState})
    }

    public getPlayer(player) {
        return <ScrollView key={player.id}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', margin: 5, color: '#EEF5DB', flexGrow: 1, flexShrink: 0, flexBasis: '17%'}}>{player.name}</Text>

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
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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