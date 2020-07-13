import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Block, Text } from 'galio-framework';
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get("screen");


import { Table, TableWrapper, Row } from 'react-native-table-component';
//import Button from 'react-native-flat-button';

class IncidentHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Offence Type', 'Count'],
            widthArr: [210, 115],
            widthArrNoRecords: [325],
            noRecords: ['No offence data available'],
        }

        this.totalCount = this.totalCount.bind(this);
    }

    totalCount(){
        let sum = 0;
        this.props.dataAPI.map((o, i) => (
            sum = sum + o.count
        ));
        return sum;
        console.log(sum);
    }

    render() {
        return (
            <View>
                <View>
                    <View style={styles.addView}>
                        <Block row style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                {/* <Button type="custom"
                                    containerStyle={{ 
                                        alignSelf: 'flex-end',
                                        backgroundColor: '#00c5e8', 
                                        marginRight: 10,
                                        marginTop: 10,
                                        height: 35,
                                        width: 70
                                    }}
                                    onPress={() => this.props.closePopUp()}>
                                    Close
                                </Button> */}
                                <Button  
                                        icon={{ name: "cancel", size: 20, color: "#00c5e8"}} 
                                        type="clear" 
                                        onPress={() => this.props.closePopUp()} />
                        </Block>
                        <Block center row style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={styles1.container}>
                                <ScrollView horizontal={true}>
                                    <View>
                                        <Table borderStyle={{ borderWidth: 1, borderColor: '#00c5e8' }}>
                                            <Row 
                                                data={this.state.tableHead} 
                                                widthArr={this.state.widthArr} 
                                                style={styles1.header} 
                                                textStyle={styles1.textHeader} />
                                        </Table>
                                        {/* dataAPI */}
                                        <ScrollView>
                                            <Table borderStyle={{ borderWidth: 1, borderColor: '#00c5e8' }}>
                                                {this.props.dataAPI.length > 0 ?    
                                                   this.props.dataAPI.map((o, i) => (
                                                    <Row 
                                                        key={i}
                                                        style={styles1.nonHeader} 
                                                        textStyle={styles1.text}
                                                        widthArr={this.state.widthArr} 
                                                        data={new Array(o.offenceName, o.count)}>
                                                    </Row>))
                                                    :<Row 
                                                        style={styles1.nonHeader} 
                                                        textStyle={styles1.text}
                                                        widthArr={this.state.widthArrNoRecords} 
                                                        data={this.state.noRecords}>
                                                    </Row>
                                                }
                                            </Table>
                                        </ScrollView>
                                    </View>
                                </ScrollView>
                            </View>
                        </Block>
                        <Block style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ textAlign: 'center', marginRight: 10 , fontWeight: 'bold', color: 'orange' }}>
                                Total : {this.totalCount()}
                            </Text>
                        </Block>
                        {/* <Button containerStyle={styles.createButton3} type='clear'
                                titleStyle={{ color: '#00c5e8', fontSize: 13 }}
                                title='Dismiss' 
                                onPress={this.props.closePopUp} 
                        /> */}

                        {/* <Button type="custom"
                            containerStyle={{ 
                                alignSelf: 'flex-end',
                                backgroundColor: '#00c5e8', 
                                marginRight: 10,
                                marginTop: 10,
                                height: 35,
                                width: 70
                            }}
                            onPress={() => this.props.closePopUp()}>
                            Close
                        </Button> */}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    createButtonNew: {
        width: width * 0.1,
        marginTop: 10,
        marginRight: 5,
        borderWidth: 0,
        borderColor: 'transparent',
        shadowOpacity: 0,
        shadowColor: 'transparent',
        color: '#fff',
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent'
    },
    createButton3: {
        // width: width * 0.25,
        marginTop: 10,
        // //backgroundColor: '#5E72E4'
        // backgroundColor: 'transparent',
        //borderWidth: 0,
        // alignSelf: 'flex-end'
        width: width * 0.2,
        marginRight: 5,
        //marginBottom: 25,
        //backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#00c5e8',
        alignSelf: 'flex-end'

    },
    btnIcon: {
        color: '#00c5e8'
    },
    btnText: {
        marginLeft: 5,
        marginTop: 5,
    },
    imageContainer: {
        width: width - 20,
        height: height * 0.40,
        backgroundColor: "#1d2123",
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
    },
    location: {
        flexDirection: 'row',
        backgroundColor: '#2DCE89',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 5,
        marginBottom: '3%',
    },
    createButton1: {
        width: width * 0.15,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1
    },
    createButton: {
        width: width * 0.20,
        marginTop: 10,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1,
        marginRight: 5,
        marginLeft: 5
    },
    gradient: {
        flex: 1
    },
    gradientJob: {
        marginLeft: '5%',
        marginRight: '5%',
        height: '20%',
        borderRadius: 15
    },
    addView: {
        flexDirection: 'column',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 10,
        borderColor: 'orange',
        paddingBottom: '5%',
        //paddingTop: '2%',

        backgroundColor: 'black',
        //opacity: 0.6
        opacity: 0.9,
        //backgroundColor: '#0A121A',
    },
    profileText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        marginTop: '2%',
        marginLeft: '5%',
        marginBottom: '2%'
    },
    jobCard: {
        height: '100%',
        borderColor: 'transparent',

    },
    horizontalText: {
        fontWeight: '700',
        color: 'black',
        marginLeft: '5%',
        marginTop: '3%',
        paddingBottom: '3%',

    },
    tickerText: {
        color: 'black',
        backgroundColor: 'red'

    },
    imageView: {
        marginTop: '2%',
        flexDirection: 'column',
        backgroundColor: '#1D2123',
        marginBottom: '2%'
    },
    horizontalButton: {
        borderRadius: 230,
        width: '5%',
        justifyContent: 'space-between',
        marginTop: '1%',
    },
    img1S1: {
        height: 75,
        width: 75,
        borderRadius: 35,

    },
    MessageText: {
        alignSelf: 'flex-start',
        fontWeight: '700',

        color: '#fff',
        marginLeft: '5%',
        marginTop: '2%',

    },
    loginCard: {
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: '#680d64',
        borderColor: 'transparent'

    },
    camera: {
        paddingLeft: '2%',
        marginTop: 32,
        marginRight: 10,
        color: '#00c5e8'
    },
    loginIcon: {
        paddingLeft: '2%',
        //marginBottom:'2%',
        marginTop: '2%'
    },
    textLogin: {
        fontSize: 15,
        fontWeight: '400',
        color: '#fff',
        alignSelf: 'center',
        paddingLeft: '2%',
        //marginBottom:'2%',
    },
    locationCard: {
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: '#680d64',
        borderColor: 'transparent'
    },
    locationIcon: {
        paddingLeft: '7%',
        marginTop: '6%'
    },
    locationText: {
        fontSize: 15,
        fontWeight: '400',
        color: 'grey',
        alignSelf: 'center',
        marginTop: '2%',
        paddingLeft: '5%'
    },
    textRow1: {
        color: 'grey',
        marginRight: '5%',
        marginTop: '3%',
        paddingBottom: '3%',
        fontWeight: 'bold'
    },
    textRow2: {
        color: 'grey',
        marginRight: '5%',
        marginTop: '3%',
        paddingBottom: '3%',
        fontWeight: 'bold'
    },
    firstCardImg: {
        borderRadius: 25,
        marginLeft: '5%',
        width: 50,
        height: 50
    },
    Mao: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: '15%',
        // paddingTop:'2%'
    },
    maoIcon: {
        // paddingBottom:'40%',
        // marginTop:'2%'
    },
    Designer: {
        color: 'grey',
        marginLeft: '15%',
        marginBottom: '25%',
    },
    badge: {
        // marginTop:'5%'
    },
    textareaContainer1: {
        height: 30,
        padding: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    textarea1: {
        textAlignVertical: 'top',  // hack android
        height: 30,
        fontSize: 12,
        color: 'white',
    },
    drpdown: {
        textAlignVertical: 'top',  // hack android
        height: 30,
        fontSize: 18,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 3,
        color: 'black',
        backgroundColor: '#fff',
    },
    textareaContainer: {
        height: 80,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    registerContainer: {
        width: width * 0.95,
        height: height * 0.80,
        backgroundColor: "#1d2123",
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 110,
        fontSize: 12,
        color: 'black',
        paddingLeft: 5
    },
    submitButton: {
        backgroundColor: '#fc408a',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'black'
    },
    friendsView: {
        marginTop: '1%',
        paddingBottom: '5%'
    },
    friends: {
        borderRadius: 100,
        alignSelf: 'center',
        // marginTop:'4%',
    },
});

const styles1 = StyleSheet.create({
    container: { flex: 1, padding: 2, paddingTop: 2, backgroundColor: 'black' },
    header: { height: 35, backgroundColor: 'black' },
    nonHeader: { height: 30, backgroundColor: 'black' },
    textHeader: { textAlign: 'center', fontWeight: 'bold', color: 'orange' },
    text: { textAlign: 'center', fontWeight: '100', color: 'orange' },
    dataWrapper: { marginTop: -1 },
    row: { height: 20, backgroundColor: 'black' }
  });
  
export default IncidentHistory;

