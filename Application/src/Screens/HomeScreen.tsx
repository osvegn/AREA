import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, Dimensions, ScaledSize, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Globals } from "../Common/Globals";
import { SingleArea } from "../Common/Interfaces";
import AreaBlock from "../Components/AreaBlock";
import Circles from "../Components/Circles";
import { NavigatorshowModal } from "../Navigator";

interface AreaBlockProps {
    index: number
    area: SingleArea
}

export default function HomeScreen() {
    const window: ScaledSize = Dimensions.get("window")
    const [allAreas, setAllAreas] = useState<Array<SingleArea>>([])

    function navigateToProfile() {
    }

    function navigateToAddArea() {
    }

    function removeAreaFromList(index: number) {
        Alert.alert(
            "Supprimer",
            "Tu vas supprimer une AREA, veux-tu continuer ?",
            [
              {
                text: "Annuler",
                style: "cancel"
              },
              {
                text: "Supprimer",
                onPress: () => {
                    let copyAreas = [...allAreas]
                    copyAreas.splice(index, 1)
                    setAllAreas(copyAreas)
                },
                style: "destructive"
              }
            ]
          )
    }

    function AreaBlock(props: AreaBlockProps) {
        return (
            <View style={areaBlock.container}>
                <View style={areaBlock.textContainer}>
                    <Text style={areaBlock.text}>{props.area.action}</Text>
                    <Text style={areaBlock.text}>{props.area.reaction}</Text>
                </View>
                <View style={areaBlock.trashContainer}>
                    <TouchableOpacity style={areaBlock.imageSize} onPress={() => removeAreaFromList(props.index)}>
                        <Image source={require("../assets/trash.png")} style={areaBlock.imageSize}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Circles/>
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.titlePage}>Re-Bonjour !</Text>
                    <TouchableOpacity
                        onPress={navigateToProfile}
                        style={{
                            width: window.width / 100 * 10,
                            height: window.width / 100 * 10,
                        }}>
                        <Image source={require("../assets/avatar.png")}
                            style={[styles.fillContainer, styles.avatarIcon]}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitleText}>AREA actives</Text>
                    <TouchableOpacity
                        onPress={navigateToAddArea}
                        style={{
                            width: window.width / 100 * 10,
                            height: window.width / 100 * 10
                        }}>
                        <Image source={require("../assets/add.png")} style={styles.fillContainer}/> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <ScrollView style={styles.bottomContainer} contentContainerStyle={styles.bottomContainerContent}>
                    {
                        allAreas.map((item, index) => {
                            return (
                                <AreaBlock area={item} index={index}/>
                            )}
                        )
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Globals.Colors.lightBackground,
    },
    topContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    bottomContainer: {
        flex: 5
    },
    bottomContainerContent: {
        alignItems: "center"
    },
    headerContainer: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "100%",
        paddingHorizontal: 35,
        alignItems: "center"
    },
    titlePage: {
        fontFamily: "Poppins-Bold",
        fontSize: 35
    },
    avatarIcon: {
        borderRadius: 50
    },
    subtitleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "100%",
        paddingHorizontal: 50
    },
    subtitleText: {
        fontFamily: "Poppins-Medium",
        fontSize: 20
    },
    fillContainer: {
        width: "100%",
        height: "100%"
    }
})

const areaBlock = StyleSheet.create({
    container: {
        width: "90%",
        height: 100,
        borderRadius: 20,
        backgroundColor: Globals.Colors.main,
        marginTop: 24,
        flexDirection: "row"
    },
    textContainer: {
        flex: 5,
        justifyContent: "space-around",
        paddingVertical: 12
    },
    text: {
        marginLeft: 20,
        fontSize: 15,
        fontFamily: "Poppins-Regular"
    },
    trashContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    imageSize: {
        width: 40,
        height: 40
    }
})