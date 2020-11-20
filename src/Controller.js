import React, {useEffect, useState} from 'react'
import { View, Text,StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Controller({onNext, onPrv}) {
    
    const playbackState=usePlaybackState();
    const [isPlaying, setIsPlaying]=useState(false)
    useEffect(() => {
        if(playbackState===3 || playbackState==="playing"){
            setIsPlaying(true)
        }else if(playbackState===2 || playbackState==="paused"){
            setIsPlaying(false)        
        }
    }, [playbackState])

    /*const renderPlayBtn = ()=>{
        switch (isPlaying) {
            case "playing":
                return <Icon name="pause" size={30} color="#000000" />

            case "paused":
                return <Icon name="play" size={30} color="#000000" />

            default:
                return <ActivityIndicator size={30} />

        }
    }*/

    const onPlayPause = ()=>{
        console.log(playbackState)
        if(playbackState===3 || playbackState==="playing"){
            TrackPlayer.pause()
        }else if(playbackState===2 || playbackState==="paused"){
            TrackPlayer.play()
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPrv}>
                <Icon name="step-backward" size={30} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayPause}>
                {
                    isPlaying ? <Icon name="pause" size={30} color="#000000" />  :<Icon name="play" size={30} color="#000000" /> 
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={onNext}>
                <Icon name="step-forward" size={30} color="#000000" />
            </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
    }
})