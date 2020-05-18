import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, Text as Texts } from 'react-native';
import { Block, theme } from 'galio-framework'; 
const { width, height } = Dimensions.get("screen");
import { Images, argonTheme } from '../constants';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop, Text } from 'react-native-svg';


class ChartResult extends React.Component {
  
    render() {
    const { navigation, chartData } = this.props;
    const titleData = this.props.titles;
    
    const GradientLeft = () => (
        <Defs key={'gradientLeft'}>
            <LinearGradient id={'gradientLeft'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
            </LinearGradient>
        </Defs>
    )
    const GradientRight = () => (
        <Defs key={'gradientRight'}>
            <LinearGradient id={'gradientRight'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                <Stop offset={'100%'} stopColor={'rgb(67, 244, 82, 1)'}/>
            </LinearGradient>
        </Defs>
    )
    
    
    return (
      <Block flex>
        <Block row space="evenly" center style={styles.titles}>
            <Block flex left>
                <Texts style={styles.textStyle}>Title1<Texts style={styles.textStyle1}> (48)</Texts></Texts>
            </Block>
            <Block flex={1.25} right>
                <Texts style={styles.textStyle}>Title2<Texts style={styles.textStyle1}> (39)</Texts></Texts>
            </Block>
        </Block>
        <Block flex center style={styles.chart}> 
            <BarChart
                style={{ flex: 1 }}
                data={chartData}
                gridMin={0}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                yAccessor={({ item }) => item.value}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid/>
                <GradientLeft/>
                <GradientRight/>
            </BarChart>
        </Block>

        
      </Block>
    );
  }
}



const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: argonTheme.COLORS.PRIMARY
  },
  search: {
    height: 40,
    width: width * 0.3,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    margin: 10
  },
  chkBox:{
    marginBottom: 16,
    marginTop: 16,
    marginLeft: 10
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  home: {
    width: width,
    backgroundColor: "#3C57C4", 
  },
  articles: {
    width: width,
    paddingVertical: theme.SIZES.BASE,
    borderWidth: 0,
  },
  profileContainer: {
    width: width,
    height: height-250,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height-250
  },
  chart: {
    flexDirection: 'row', 
    height: height-250, 
    width: width/2,
    paddingVertical: 16
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  titles: {
      marginTop: 20,
      width: width/2,
  },
  textStyle: { 
      color:argonTheme.COLORS.WHITE, 
      marginBottom: theme.SIZES.BASE / 2 
  },
  textStyle1: { 
    color:argonTheme.COLORS.WHITE, 
    marginBottom: theme.SIZES.BASE / 2 
  }
});

export default withNavigation(ChartResult);