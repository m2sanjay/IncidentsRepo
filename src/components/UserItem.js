import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Checkbox, Text, theme } from 'galio-framework';
const { width, height } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants";
import Icon from './Icon';
import Button from './Button';

const BASE_SIZE = theme.SIZES.BASE;

class UserItem extends React.Component {
  render() {
    const { navigation, user } = this.props;
    return (
        <Block row space="evenly" style={styles.card} key={user.title}>
            <Block left style={styles.avatarContainer}>
                <Image source={{ uri: user.pic }} style={styles.avatar}/>
            </Block>
            <Block flex center style={styles.name}>
                <Text size={16} style={styles.title}>{user.title}</Text>
                <Text size={14} style={styles.title}>{user.subtitle}</Text>
            </Block>
            <Block flex right>
                <Icon family="Ionicon" style={styles.right} size={20} name="md-checkmark-circle" color={argonTheme.COLORS.SUCCESS}/>
                {/* <Button style={styles.right}>
                    <Icon size={BASE_SIZE} name="ios-arrow-forward" family="Ionicon" color={argonTheme.COLORS.SECONDARY} />
                </Button> */}
            </Block>
        </Block>
    );
  }
}


const styles = StyleSheet.create({
    card: {
        borderColor: 'transparent',
        marginHorizontal: BASE_SIZE * 2,
        padding: 5,
        //backgroundColor: argonTheme.COLORS.PRIMARY,
        shadowOpacity: 0.40,
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 0,
        borderRadius: 0,
        borderBottomColor: argonTheme.COLORS.PRIMARY,
        borderBottomWidth: 2
    },
    avatarContainer: {
        position: "relative",
        marginTop: 5
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 70,
        borderWidth: 0
    },
    name:{
        alignItems: 'flex-start',
        marginLeft: 10,
        width: width - theme.SIZES.BASE * 1.5
    },
    title: {
        color: argonTheme.COLORS.SECONDARY
    }, 
    right: {
        width: BASE_SIZE * 2,
        backgroundColor: 'transparent',
        elevation: 0,
        marginTop: 10
    }
});

export default withNavigation(UserItem);