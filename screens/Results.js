import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, Text as Texts } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");
import { BarChart, Grid } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop, Text } from 'react-native-svg';
import { Button } from "../components/";
import { ChartResult } from "../components/";


class Results extends React.Component {



    renderCharts = (props, index) => {
        const chartData = [
            {
                titles: ["Title1","Title2"],
                arr: [{title:"Title1", value: 95,svg: {fill: 'url(#gradientLeft)',},},{ title:"Title2", value: 85, svg: {fill: 'url(#gradientLeft)', },}]
            },
            {
                titles: ["Sachin","Sehwag"],
                arr: [{title:"Batting", value: 25,svg: {fill: 'url(#gradientLeft)',},},{title:"Bowling", value: 65,svg: {fill: 'url(#gradientLeft)',},},{title:"Catches", value: 35,svg: {fill: 'url(#gradientLeft)',},},{ title:"Sixes", value: 35, svg: {fill: 'url(#gradientLeft)', },}]
            },
            {
                titles: ["Rahul Dravid","Virender Sehwag"],
                arr:[{title:"Sixes", value: 67,svg: {fill: 'url(#gradientLeft)',},},{ title:"Fours", value: 95, svg: {fill: 'url(#gradientLeft)', },}]
            }
        ]
    
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
            chartData.map((data, index) => (
                // <ChartResult key={index} chartData={data.arr} titles={data.titles}/>
                <Block flex key={index} style={styles.box}>
                    <Block row space="evenly" center style={styles.titles}>
                        <Block flex left>
                            <Texts style={styles.textStyle}>{data.titles[0]}<Texts style={styles.textStyle1}> (48)</Texts></Texts>
                        </Block>
                        <Block flex={1.25} right>
                            <Texts style={styles.textStyle}>{data.titles[1]}<Texts style={styles.textStyle1}> (39)</Texts></Texts>
                        </Block>
                    </Block>
                    <Block flex center style={styles.chart}> 
                        <BarChart
                            style={{ flex: 1 }}
                            data={data.arr}
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
                    <Block row space="evenly" center>
                    {data.arr.map((textAspect, i) => (
                        <Block style={styles.aspectText} key={i}>
                            <Block flex left>
                                <Texts style={styles.textStyle}>{textAspect.title}<Texts style={styles.textStyle1}> ({textAspect.value})</Texts></Texts>
                            </Block>
                        </Block>
                    ))}
                    </Block>
                    {/* <Block row space="evenly" center>
                        <Block flex left>
                            <Texts style={styles.textStyle}>Aspect1<Texts style={styles.textStyle1}> (48)</Texts></Texts>
                        </Block>
                        <Block flex={1.25} right>
                            <Texts style={styles.textStyle}>Aspect2<Texts style={styles.textStyle1}> (39)</Texts></Texts>
                        </Block>
                    </Block> */}
                </Block>
            ))
            
            // <ScrollView
            // showsVerticalScrollIndicator={false}
            // contentContainerStyle={styles.articles}>
            //     <Block row space="evenly" center style={styles.titles}>
            //         <Block flex left>
            //             <Texts style={styles.textStyle}>Title1<Texts style={styles.textStyle1}> (48)</Texts></Texts>
            //         </Block>
            //         <Block flex={1.25} right>
            //             <Texts style={styles.textStyle}>Title2<Texts style={styles.textStyle1}> (39)</Texts></Texts>
            //         </Block>
            //     </Block>
            //     <Block flex center style={styles.chart}> 
            //         <BarChart
            //             style={{ flex: 1 }}
            //             data={chartData}
            //             gridMin={0}
            //             svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            //             yAccessor={({ item }) => item.value}
            //             contentInset={{ top: 20, bottom: 20 }}
            //         >
            //             <Grid/>
            //             <GradientLeft/>
            //             <GradientRight/>
            //         </BarChart>
            //     </Block>
            // </ScrollView>
        )
    }  
  render() {
    const { navigation } = this.props;


    


    const data   = [ 10, 40 ];
    const CUT_OFF = 20;
    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <Text
                key={ index }
                x={ x(index) + (bandwidth / 2) }
                y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                fontSize={ 14 }
                fill={ value >= CUT_OFF ? 'white' : 'black' }
                alignmentBaseline={ 'middle' }
                textAnchor={ 'middle' }
            >
                {value}
            </Text>
        ))
    )

    
    const fill2 = 'GREEN';
    const data2   = [ 0, 10, 40, 0 ];
    return (
        <Block flex center style={styles.home}>
            <ImageBackground
                source={Images.ProfileBackground}
                style={styles.profileContainer}
                imageStyle={styles.profileBackground}
            >
            {/* <Block flex> 
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
            </Block> */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
                    {this.renderCharts()}
                </ScrollView>
            </ImageBackground>
        </Block>
        
    );
  }
}

const styles = StyleSheet.create({
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
      width: width/1.2,
  },
  textStyle: { 
      color:argonTheme.COLORS.WHITE, 
      marginBottom: theme.SIZES.BASE / 2 
  },
  textStyle1: { 
    color:argonTheme.COLORS.WHITE, 
    marginBottom: theme.SIZES.BASE / 2 
  },
  box: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
    margin: 10 
  },
  aspectText: {
      marginRight: 2,
      marginLeft: 2
  }

});

export default Results;
