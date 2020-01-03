import * as React from 'react';
import {Component} from 'react';
import {AsyncStorage, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Modal from "react-native-modal";

interface IState {
    players?: Array<{
        id: number,
        name: string,
        lives: number
    }>,
    name: string,
    modalVisible: boolean,
    prevWinners: any[]
}

export default class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            modalVisible: false,
            name: '',
            players: [],
            prevWinners: []
        };

        this.handleAddingPlayer = this.handleAddingPlayer.bind(this);
        this.getPlayersName = this.getPlayersName.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.removeLife = this.removeLife.bind(this);
        this.removeAllPlayers = this.removeAllPlayers.bind(this);
        this.sortPlayers = this.sortPlayers.bind(this);
        this.storeData = this.storeData.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
        this.showPreviousWinners = this.showPreviousWinners.bind(this);
    }

    public componentDidMount(): Promise<void> {
        return this.retrieveData();
    }

    public getPlayersName (name) {
        this.setState({name})
    }

    public handleAddingPlayer(): void {
        const players = this.state.players;
        const nextId = (this.state.players[this.state.players.length - 1] || {id: 0}).id;
        const player = {name: this.state.name, lives: 3, id: nextId + 1};

        this.setState({players: [...players, player], name: ''});
    };

    public removePlayer(event, id): void {
        const newPlayers = this.state.players.filter(player => player.id !== id);

        this.setState({players: newPlayers});
    }

    public removeAllPlayers(): void {
        this.setState({players: []});
    };

    public addLife(event, id): void {
        const newState = Object.assign([], this.state.players);
        const player = this.findPlayer(id);

        player.lives = player.lives + 1;

        this.setState({ players: newState })
    }

    public removeLife(event, id): void {
        const newState = Object.assign([], this.state.players);
        const player = this.findPlayer(id);

        player.lives = player.lives - 1;

        this.setState({ players: newState })
    }

    public isWinner(event, id): Promise<void> {
        const player = this.findPlayer(id);

        this.removeAllPlayers();
        return this.storeData(player.name, '1');
    }

    public showPreviousWinners(): void {
        this.retrieveData();

        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible
        }));
    }

    public findPlayer(id) {
        const newState = Object.assign([], this.state.players);
        const indexOfPlayer = newState.findIndex(selectedPlayer => selectedPlayer.id === id);
        return newState[indexOfPlayer];
    }

    public storeData = async (key: string, value: string) => {
        try {
            if (key && value) {
                await AsyncStorage.setItem(key, value);
            }
        } catch (error) {
            console.log(error, "problemo")
        }
    };

    public retrieveData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            this.setState({prevWinners: await AsyncStorage.multiGet(keys)})
        } catch (error) {
            console.log(error, "problemo")
        }
    };

    public sortPlayers(): void {
        const newState = Object.assign([], this.state.players);
        newState.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.name > b.name) ? 1 : -1) : -1 );

        newState.filter(val => val);

        this.setState({ players: newState });
    }

    public getPlayer(player) {
        return <ScrollView key={player.id}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>

                <Text style={{fontSize: 16, fontWeight: 'bold', margin: 5, color: '#EEF5DB', flexGrow: 1, flexShrink: 0, flexBasis: '17%'}}>{player.name}</Text>
                <Text style={{fontSize: 16, color: '#EEF5DB', flexGrow: 1, margin: 5, flexShrink: 0, flexBasis: '17%'}}>{player.lives}</Text>

                <Text onPress={(e) => {this.removeLife(e, player.id)}} style = {[styles.buttonLives, {margin: 5, flexGrow: 1, flexShrink: 0, flexBasis: '17%'}]}>- life</Text>
                <Text onPress={(e) => {this.addLife(e, player.id)}} style = {[styles.buttonLives, {margin: 5, flexGrow: 1, flexShrink: 0, flexBasis: '17%'}]}>+ life</Text>

                {this.state.players.length > 1 ?
                    <Text onPress={(e) => {this.removePlayer(e, player.id)}} style = {[styles.buttonLives, {margin: 5, flexGrow: 1, flexShrink: 0, flexBasis: '17%'}]}>Remove</Text>
                    : <Text onPress={(e) => {this.isWinner(e, player.id)}} style = {[styles.buttonLives, {margin: 5, flexGrow: 1, flexShrink: 0, flexBasis: '17%'}]}>Winner</Text>
                    }
            </View>
        </ScrollView>
    }

    public render() {
        return (
            <View style={styles.container}>
                <View>
                    <Modal isVisible={this.state.modalVisible} animationIn={"slideInDown"} animationOut={"slideInUp"} >
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{fontSize: 16, fontWeight: 'bold',alignItems: 'center', color: '#EEF5DB', marginBottom: 6}}>Previous winners</Text>
                            {
                                this.state.prevWinners.map(winners => {
                                    return <View key={winners[0]}>
                                            <Text style={{fontSize: 16, fontWeight: 'bold',alignItems: 'center', color: '#EEF5DB'}}>{winners[0]} </Text>
                                    </View>
                                })
                            }
                            <Text style={styles.bottomButtons} onPress={this.showPreviousWinners}>Hide previous winners</Text>
                        </View>
                    </Modal>
                </View>
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
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={styles.bottomButtons} onPress={this.showPreviousWinners}>Recent results</Text>
                </View>
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
        backgroundColor: 'rgba(254,173,123,0.98)',
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
        color: '#fcfaff',
        marginBottom: 10,
        padding: 15,
        width: 200
    },
    row: {
        width: 40,
    },
});
