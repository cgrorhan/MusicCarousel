import React,{ useRef,useEffect,useState } from 'react'
import { View, Text, SafeAreaView, FlatList,Image,StyleSheet, Dimensions, Animated } from 'react-native'
import TrackPlayer, {Event} from 'react-native-track-player';
import Controller from './Controller';
import songs from './data.json'

const{width,height}=Dimensions.get('window')

export default function PlayerScreen() {
    const scrollX= useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0)
    const slider=useRef(null)
    const isPlayerReady=useRef(false)

    useEffect(() => {
       scrollX.addListener(({value})=>{
        const index = Math.round(value/width)
        setIndex(index)
       })

       TrackPlayer.addEventListener(Event.PlaybackTrackChanged,(e)=>{
           console.log(e)
       })

       TrackPlayer.setupPlayer().then(async()=>{
            console.log('player ready');
            TrackPlayer.reset()
            await TrackPlayer.add(songs)
            isPlayerReady.current = true
            TrackPlayer.play()
        })

        return () =>{
            scrollX.removeAllListeners();
        }

    }, [])
    
    useEffect(() => {
        if (isPlayerReady.current){
            TrackPlayer.skip(songs[index].id)
        }
    }, [index])


    const goNext = () =>{
        slider.current.scrollToOffset({
            offset: (index+1)*width
        })
    }

    const goPrv = () =>{
        slider.current.scrollToOffset({
            offset: (index-1)*width
        })
    }


    const renderItem=({item})=>{
    return (
        <View style={styles.imgContainer}>
            <Image style={styles.image} source={{uri:item.artwork}}/>
        </View>
    )
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{height:height/2}}>
                <FlatList 
                    data={songs} 
                    ref={slider}
                    renderItem={renderItem}
                    keyExtractor={(item)=> item.id}
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    scrollEventThrottle={16}//IOS
                    onScroll={Animated.event([{nativeEvent:{contentOffset: {x: scrollX}}}],{useNativeDriver:false})}
                    />
            </SafeAreaView>
            <View>
                <Text style={styles.title}>{songs[index].title}</Text>
                <Text style={styles.artist}>{songs[index].artist}</Text>
            </View>
            <Controller onNext={goNext} onPrv={goPrv}/>

        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-evenly',
        height:height,
        maxHeight:500,
        flex:1
    },
    image:{
        width:height/2,
        height:height/2
    },
    imgContainer:{
        width:width,
        alignItems:'center',
    },
    title:{
        fontSize:23,
        textAlign:'center',
        textTransform:'capitalize'
    },
    artist:{
        fontSize:16,
        textAlign:'center',
        textTransform:'capitalize'
    },

})