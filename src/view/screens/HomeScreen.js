import { StatusBar, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, Dimensions, Modal, ScrollView, ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabOne from '../components/HeaderTabOne';
import Swiper from 'react-native-deck-swiper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { chatuser, selectPackages, selectUser } from '../../../redux/reducers/Reducers'
import Notifictaions from '../../view/components/Notifictaions';
const { height, width } = Dimensions.get('window');



function RenderCard({ data, navigation }) {
    const [flake, setFlake] = useState('')
    return (
        <View style={{
            marginTop: -50,
            // height: '80%',
            backgroundColor: COLORS.white,
            elevation: 5,
            borderRadius: 25,
            paddingHorizontal: 5
        }}>
            <View style={{
                paddingTop: 5,
            }}>
                <Image source={{ uri: data?.userDetails?.image1 }} resizeMode='cover'
                    style={{
                        height: height / 1.7,
                        borderRadius: 20,
                        width: '100%',
                        paddingHorizontal: 10
                    }}
                />
                {data?.userDetails?.Flake > 0 &&
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 15,
                        marginTop: height / 2,
                        alignItems: 'center',
                        position: 'absolute',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginLeft: 15
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            // textAlign: 'center'
                            fontWeight: 'bold'
                        }}>
                            #flakemeter
                        </Text>
                        {data?.userDetails?.Flake == 1 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    width: 20,
                                    height: 20
                                }} />
                                <Text>
                                    +{data?.userDetails?.Flake}
                                </Text>
                            </View>
                            // <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                        }
                        {data?.userDetails?.Flake == 2 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    width: 20,
                                    height: 20
                                }} />
                                <Text>
                                    +{data?.userDetails?.Flake}
                                </Text>
                            </View>
                        }
                        {data?.userDetails?.Flake == 3 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Text>
                                    +{data?.userDetails?.Flake}
                                </Text>
                            </View>
                        }
                        {data?.userDetails?.Flake > 3 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Text>
                                    +{data?.userDetails?.Flake}
                                </Text>
                            </View>
                        }
                        {data?.userDetails?.Flake < 1 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                <Text>
                                    +0
                                </Text>
                            </View>

                        }
                    </View>
                }
            </View>
            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    paddingTop: 10
                }}>
                    <Image source={require('../../assets/dot.png')} resizeMode='contain'
                        style={{
                            width: 5,
                            height: 5,
                            marginRight: 5
                        }} />
                    <Text style={{
                        fontSize: 20, fontWeight: 'bold',
                        color: COLORS.black,
                        marginRight: 5
                    }}>{data?.userDetails?.Name}</Text>
                    <Text style={{
                        fontSize: 20,
                        color: COLORS.black,
                        marginRight: 5
                    }}>{data?.userDetails?.Age}</Text>
                    <Image source={require('../../assets/conform.png')} resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                        }} />
                </View>
            </View>


            <View style={{
                paddingBottom: 20
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: COLORS.black,
                        marginRight: 5
                    }}>Model at Instagaram</Text>
                    <Text style={{
                        color: COLORS.black,
                        marginRight: 5,
                        backgroundColor: COLORS.main,
                        padding: 3,
                        borderRadius: 5
                    }}>2.1 Miles Away</Text>
                </View>
            </View>

            {/* <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 50,
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>
                    <View style={{
                        padding: 20,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        elevation: 5
                    }}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                style={{
                                    width: 15,
                                    height: 15
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 15,
                        borderRadius: 40,
                        backgroundColor: COLORS.pink
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CongratsMatchScreen')}>
                            <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 20,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        elevation: 5
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                            <Image source={require('../../assets/message.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20
                                }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
        </View>
    )
}

function StatusCard({ text }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{text}</Text>
        </View>
    );
};

function RenderModal({ data }) {
    // console.log(data);
    // return (
    //   <View style={styles.cardsText}>
    //     <Text>{data.name}</Text>
    //   </View>
    // );
};
const HomeScreen = ({ navigation }) => {
    const [swiper, setSwiper] = useState();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState();
    const [modalData, setModalData] = useState();
    const [modalDataUid, setModalDataUid] = useState();
    const [swapLeft, setSwapLeft] = useState([]);
    const [swipedAllCards, setswipedAllCards] = useState(false);
    const [swipeDirection, setswipeDirection] = useState('');
    const [cardIndex, setcardIndex] = useState(0);
    const [ChatUserId, setChatUserId] = useState();
    const [ChatUserDetail, setChatUserDetail] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [recentMessage, setRecentMessage] = useState([]);
    const [unreadMessage, setUnreadMessage] = useState([]);
    const user = useSelector(selectUser);
    const userPackage = useSelector(selectPackages);
    const CurrentUser = auth().currentUser.uid;
    const dispatch = useDispatch();




    // const ByMemeberShips = (item) => {
    //     var Data = new Object();
    //     Data.discountPercentage = item.discountPercentage;
    //     Data.discountPrice = item.discountPrice;
    //     Data.id = item.id;
    //     Data.name = item.name;
    //     Data.numberOfCards = item.numberOfCards;
    //     Data.numberOfChats = item.numberOfChats;
    //     Data.otherCategory = item.otherCategory;
    //     Data.rate = item.rate;
    //     Data.status = item.status;
    //     Data.description = item.description;
    //     // console.log('test data: ', Data);
    //     dispatch(packages(Data))
    //     // console.log(MembershipName);
    //     // console.log(item.id);
    //     const MembershipName = item.otherCategory.split(' ')[0]
    //     const useRef = firestore().collection('Users')
    //         .doc(CurrentUser)
    //     useRef.update({
    //         'userDetails.AccountType': MembershipName,
    //         'userDetails.PackageId': item.id,
    //     }).then(() => {
    //         setBuyPack(true)
    //         // console.log('Notices send!');
    //     });
    // }
    // const fetchMemberships = async () => {
    //     setUploading(true)
    //     try {
    //         // console.log('hello');
    //         await firestore()
    //             .collection('Package')
    //             .get()
    //             .then(querySnapshot => {
    //                 // console.log('Total user: ', querySnapshot.size);
    //                 const membership = [];
    //                 const membershipsuid = [];
    //                 querySnapshot.forEach((documentSnapshot) => {
    //                     // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
    //                     membership.push(documentSnapshot.data());
    //                     membershipsuid.push(documentSnapshot.id);
    //                 });
    //                 setMemberships(membership)
    //                 setMembershipUid(membershipsuid)
    //             })
    //         // console.log('membershipData: ', memberships);

    //     } catch (e) {
    //         console.log(e);
    //     }
    //     setUploading(false)
    // };


    const fetchUsersUid = () => {
        if (CurrentUser) {
            try {
                const userRef = firestore().collection('Users')
                    .doc(CurrentUser)
                userRef.onSnapshot((querySnap) => {
                    // console.log('doc exists: ', querySnap.data());
                    if (!querySnap.data()?.PrivateChat) {
                        console.log('private chats not found');
                        // console.log('private chat here');
                    } else {
                        const ChatUid = []
                        querySnap.data()?.PrivateChat.map(chats => {
                            // console.log('total chats here', chats.ChatuserDetails.uid);
                            ChatUid.push(chats.ChatuserDetails.uid)
                        })
                        setChatUserId(ChatUid)
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
        else {
            dispatch(chatuser(null))
            setChatUserDetail(null)
        }
    };

    const fetchLockUser = (ChatUserId) => {
        // console.log('lock user here');
        if (!ChatUserId == '') {
            try {
                const LockedUser = []
                ChatUserId.map(item => {
                    firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                        // console.log('Match User: ', documentSnapshot.data());
                        if (docSnapshot.data()?.PrivateChat) {
                            const UserDetailLock = docSnapshot.data().userDetails.UserLock;
                            // console.log('LockUser: ',userdetails);
                            if (UserDetailLock == true) {
                                docSnapshot.data()?.PrivateChat.map(secUser => {
                                    if (secUser.ChatuserDetails.uid == CurrentUser) {
                                        // console.log('Lockeduser', docSnapshot.data().userDetails);
                                        LockedUser.push(docSnapshot.data().userDetails)
                                    }
                                    else {
                                        console.log('no locked user found');
                                        // LockedUser.push('')
                                    }
                                })
                            }
                            dispatch(chatuser(LockedUser.slice(0, 2)))
                            setChatUserDetail(LockedUser.slice(0, 2))
                        }
                        else {
                            console.log('data not found');
                            setChatUserDetail('')
                        }
                    })
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            setChatUserDetail('')
        }
    }

    const fetchMatchUsers = (ChatUserId) => {
        // console.log('chat id', ChatUserId);
        if (!userPackage == '') {
            const Package = userPackage.id;
            if (Package == 123) {
                if (!ChatUserId == '') {
                    // console.log(ChatUserId);
                    try {
                        const MatchedUser = []
                        ChatUserId.map(item => {
                            firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', docSnapshot.data().PrivateChat);
                                if (docSnapshot.data()?.PrivateChat) {
                                    // console.log('data here' , docSnapshot.data().userDetails.UserLock);
                                    const UserDetailLock = docSnapshot.data().userDetails
                                    // console.log(UserDetailLock);
                                    docSnapshot.data()?.PrivateChat.map(secUser => {
                                        if (secUser.ChatuserDetails.uid == CurrentUser) {

                                            MatchedUser.push(docSnapshot.data().userDetails)
                                        } else {
                                            console.log('no match found');
                                            // setChatUserDetail('')
                                        }
                                        // setChatUserId(chats.ChatuserDetails)
                                    })
                                    dispatch(chatuser(MatchedUser.slice(0, 2)))
                                    // console.log('final', MatchedUser);
                                    setChatUserDetail(MatchedUser.slice(0, 2))
                                    // setChatUserDetail(MatchedUser)
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
            else if (Package == 456) {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = []
                        ChatUserId.map(item => {
                            firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', documentSnapshot.data());
                                if (docSnapshot.data()?.PrivateChat) {
                                    // console.log('data here');
                                    docSnapshot.data()?.PrivateChat.map(secUser => {
                                        if (secUser.ChatuserDetails.uid == CurrentUser) {

                                            const docid = docSnapshot.data().userDetails.uid > CurrentUser ? CurrentUser + "-" + docSnapshot.data().userDetails.uid : docSnapshot.data().userDetails.uid + "-" + CurrentUser
                                            // console.log(docid);

                                            const messageRef = firestore().collection('chatrooms')
                                                .doc(docid)
                                                .collection('messages')
                                                .orderBy('createdAt', "desc")
                                                .limit(1)
                                            messageRef.onSnapshot((querySnap) => {
                                                const allmsg = querySnap.docs.map(docSanp => {
                                                    const data = docSanp.data();
                                                    // setRecentMessage(data.text)
                                                    console.log(data);
                                                })
                                            })
                                            // docSnapshot.data().userDetails.recentMessages = recentMessage
                                            // MatchedUser.push(docSnapshot.data().userDetails)
                                        } else {
                                            console.log('no match found');
                                        }
                                        // setChatUserId(chats.ChatuserDetails)
                                    })
                                    // setChatUserDetail(MatchedUser)
                                    // console.log('final', MatchedUser);
                                    setChatUserDetail(MatchedUser.slice(0, 3))
                                    dispatch(chatuser(MatchedUser.slice(0, 3)))
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
            else {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = []
                        ChatUserId.map(item => {
                            firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', documentSnapshot.data());
                                if (docSnapshot.data()?.PrivateChat) {
                                    // console.log('data here');
                                    docSnapshot.data()?.PrivateChat.map(secUser => {
                                        if (secUser.ChatuserDetails.uid == CurrentUser) {
                                            const docid = docSnapshot.data().userDetails.uid > CurrentUser ? CurrentUser + "-" + docSnapshot.data().userDetails.uid : docSnapshot.data().userDetails.uid + "-" + CurrentUser
                                            // console.log(item);

                                            const messageRef = firestore().collection('chatrooms')
                                            .doc(docid)
                                            .collection('messages')
                                            // .limit(1)
                                            .orderBy('createdAt', "desc")
                                            messageRef.onSnapshot((querySnap) => {
                                                const unreaded = []
                                                const recentmsg = []
                                                const allmsg = querySnap.docs.map(docSanp => {
                                                    const data2 = docSanp.data();
                                                    recentmsg.push(data2.text)
                                                    if (data2.read == false && data2.sentBy == item) {
                                                        // setRecentMessage(data?.text)
                                                        // docSnapshot.data().userDetails.recentMessages = recentMessage
                                                        // return data2.text
                                                        unreaded.push(data2.text)
                                                    }
                                                })
                                            })
                                            dataupdated = {
                                                ...docSnapshot.data().userDetails,
                                                // recentMessages: recentmsg.slice(0, 1),
                                                unreadMessages: '2',
                                                recentMessages: 'Hello there',
                                            }
                                            // console.log(docSnapshot.data().userDetails);
                                            //     docSnapshot.data().userDetails.unreadMessages = unreaded
                                            //     console.log(docSnapshot.data().userDetails);
                                            MatchedUser.push(dataupdated);
                                            // })
                                        } else {
                                            console.log('no match found');
                                        }
                                        // console.log('push: ', MatchedUser);
                                        // setChatUserId(chats.ChatuserDetails)
                                    })
                                    // console.log('final', MatchedUser.slice(0, 5));
                                    // const finalMatch = MatchedUser.slice(0, 5)
                                    setChatUserDetail(MatchedUser.slice(0, 25))
                                    dispatch(chatuser(MatchedUser.slice(0, 25)))
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
        }
        else {
            // console.log('===>',ChatUserId);
            if (!ChatUserId == '') {
                try {
                    const MatchedUser = []
                    ChatUserId.map(item => {
                        firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                            // console.log('Match User: ', docSnapshot.data());
                            if (docSnapshot.data()?.PrivateChat) {
                                // console.log('data here');
                                docSnapshot.data()?.PrivateChat.map(secUser => {
                                    if (secUser.ChatuserDetails?.uid == CurrentUser) {
                                        const docid = docSnapshot.data().userDetails.uid > CurrentUser ? CurrentUser + "-" + docSnapshot.data().userDetails.uid : docSnapshot.data().userDetails.uid + "-" + CurrentUser
                                        // console.log(docid);

                                        const messageRef = firestore().collection('chatrooms')
                                            .doc(docid)
                                            .collection('messages')
                                            .limit(1)
                                            .orderBy('createdAt', "desc")
                                        messageRef.onSnapshot((querySnap) => {
                                            const allmsg = querySnap.docs.map(docSanp => {
                                                const data = docSanp.data();
                                                setRecentMessage(data.text)
                                            })
                                        })
                                        docSnapshot.data().userDetails.recentMessages = recentMessage
                                        MatchedUser.push(docSnapshot.data().userDetails)
                                    } else {
                                        console.log('no match found');
                                        // MatchedUser.push('')
                                        // setChatUserDetail('')
                                    }
                                    // setChatUserId(chats.ChatuserDetails)
                                })
                                dispatch(chatuser(MatchedUser.slice(0, 1)))
                                setChatUserDetail(MatchedUser.slice(0, 1))
                            } else {
                                console.log('data not found');
                                setChatUserDetail('')
                            }
                        })
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                setChatUserDetail('')
            }

        }
    };


    const fetchChatuserMain = () => {
        // console.log('testing: ', userData.userLock);
        if (user.userLock == true) {
            fetchLockUser(ChatUserId);
        } else {
            fetchMatchUsers(ChatUserId);
            // console.log('else');
        }
    }


    const fetchusersMain = async () => {
        // console.log(user.Gender);
        setLoading(true)
        if (user.Gender == 'Male') {
            fetchFemaleUsers();
        }
        else {
            fetchMaleUsers();
        }
        setLoading(false)
    }

    const fetchMaleUsers = async () => {
        // const Package = userPackage.otherCategory;
        // console.log(Package);
        if (!userPackage == '') {
            const Package = userPackage.id;
            // console.log('male filter', Package);
            // for basic package 
            if (Package == 123) {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Male")
                    // .limit(2)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Male"}`) {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 2))
                        setModalDataUid(modalDataUid.slice(0, 2))
                    })
            }
            // for Standar pacakge 
            else if (Package == 456) {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Male")
                    // .limit(3)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Male"}`) {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 3))
                        setModalDataUid(modalDataUid.slice(0, 3))
                    })
            }
            // for premium package 
            else {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Male")
                    // .limit(25)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Male"}`) {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 25))
                        setModalDataUid(modalDataUid.slice(0, 25))
                    })
            }
        }
        else {
            // try {
            // console.log('hello');
            await firestore()
                .collection('Users')
                // .where("userDetails.Gender", '==', "Male")
                // .limit(1)
                .onSnapshot(querySnapshot => {
                    // console.log('Total user: ', querySnapshot.size);
                    const users = [];
                    const modalDataUid = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        const data = documentSnapshot.data().userDetails;
                        const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                        if (data.Gender == `${user.filterGender ? user.filterGender : "Male"}`) {
                            if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                users.push(documentSnapshot.data());
                                modalDataUid.push(documentSnapshot.id);
                            }
                            else if (!user.filterMinAge || !user.filterMinAge) {
                                users.push(documentSnapshot.data());
                                modalDataUid.push(documentSnapshot.id);
                            }
                        }
                        else if (user.filterGender == 'Both') {
                            if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                users.push(documentSnapshot.data());
                                modalDataUid.push(documentSnapshot.id);
                            }
                            else if (!user.filterMinAge || !user.filterMinAge) {
                                users.push(documentSnapshot.data());
                                modalDataUid.push(documentSnapshot.id);
                            }
                            // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                            // users.push(documentSnapshot.data());
                        }
                    });
                    setUsers(users.slice(0, 1))
                    setModalDataUid(modalDataUid.slice(0, 1))
                })
            // console.log('MaleUsers: ', users);

            // } catch (e) {
            //   console.log(e);
            // }
        }

    };

    const fetchFemaleUsers = async () => {
        // console.log('packages',userPackage);
        if (!userPackage == '') {
            const Package = userPackage.id;
            // for basic package 
            if (Package == 123) {
                // console.log('female filter', Package);
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Female")
                    .limit(2)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 2))
                        setModalDataUid(modalDataUid.slice(0, 2))
                    })
                // console.log('FemaleUsers: ', users);
            }
            else if (Package == 456) {
                // console.log('female filter', Package);
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Female")
                    // .limit(3)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                    // console.log(documentSnapshot.data());
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 3))
                        setModalDataUid(modalDataUid.slice(0, 3))
                    })
            }
            // for premium package 
            else {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', user.filterGender ? user.filterGender : "Female")
                    // .limit(25)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 25))
                        setModalDataUid(modalDataUid.slice(0, 25))
                    })
            }
        }
        else {
            try {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Female")
                    // .limit(1)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            // console.log('=====>',data.Gender);
                            if (data.Gender == 'Female') {
                                // console.log('asdjk'); 
                                if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
                                    if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                        // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                        users.push(documentSnapshot.data());
                                        modalDataUid.push(documentSnapshot.id);
                                        // console.log('yetduh');
                                    }
                                    else if (!user.filterMinAge || !user.filterMinAge) {
                                        users.push(documentSnapshot.data());
                                        modalDataUid.push(documentSnapshot.id);
                                        // console.log('etg');
                                    }
                                }
                                else if (user.filterGender == 'Both') {
                                    if (years >= user.filterMinAge && typeof years == typeof user.filterMinAge && typeof years == typeof user.filterMaxAge && years <= user.filterMaxAge) {
                                        // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                        users.push(documentSnapshot.data());
                                        modalDataUid.push(documentSnapshot.id);
                                    }
                                    else if (!user.filterMinAge || !user.filterMinAge) {
                                        users.push(documentSnapshot.data());
                                        modalDataUid.push(documentSnapshot.id);
                                    }
                                    // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                    // users.push(documentSnapshot.data());
                                }
                            }
                        });
                        setUsers(users.slice(0, 1))
                        setModalDataUid(modalDataUid.slice(0, 1))
                    })
                // console.log('FemaleUsers: ', users);
            } catch (e) {
                console.log(e);
            }
        };
    }

    useEffect(() => {
        fetchusersMain();
        fetchUsersUid();
        // fetchCurrentUsers();
    }, [userPackage])

    useEffect(() => {
        fetchChatuserMain();
        // console.log(ChatUserId);
    }, [ChatUserId]);

    const openSettingsModal = (cardIndex) => {
        setModalData(users[cardIndex]);
        setModalVisible(!modalVisible);
        // console.log('here is current card index',cardIndex);
        // cardData = cards[cardIndex]
        // console.log('modal data', users[cardIndex]);
    }

    const OpenForChating = (cardIndex) => {
        // console.log('Chating data', users[cardIndex]);
        const Data = users[cardIndex];
        const DataId = modalDataUid[cardIndex]
        // console.log( Data);
        SubmitChatUSer(Data, DataId)
        MatchUsers(Data, DataId)
        // SendToChatUSer(CurrentuserData, DataId);
        // navigation.navigate('Message')
    }

    const SubmitChatUSer = (Data, DataId) => {
        if (!Data == '') {
            // console.log('Submit data', DataId);
            // return;
            firestore()
                .collection('Users').doc(CurrentUser).update({
                    PrivateChat: firestore.FieldValue.arrayUnion({
                        ChatuserDetails: Data.userDetails
                    }),
                })
                .then(() => {
                    // console.log('You like', Data.userDetails.Name);
                    // navigation.navigate('MessagesScreen')
                    Notifictaions(
                        Docuser = DataId,
                        noticeStatus = 'Unread',
                        tag = 'likes you',
                        type = 'Swap',
                        RequestStatus = 'Unaccepted',
                        noticeID = CurrentUser,
                        NoticeName = user.Name,
                    )
                });
        } else {
            console.log('card user not found!!');
        }
    }

    const MatchUsers = (Data, DataId) => {
        if (!DataId == '') {
            try {
                firestore().collection('Users').doc(DataId).onSnapshot(docSnapshot => {
                    if (docSnapshot.data()?.PrivateChat) {
                        docSnapshot.data()?.PrivateChat.map(chats => {
                            if (chats.ChatuserDetails.uid == CurrentUser) {
                                // console.log('test');
                                Notifictaions(
                                    Docuser = CurrentUser,
                                    noticeStatus = 'Unread',
                                    tag = 'is your match founded',
                                    type = 'Swap',
                                    RequestStatus = 'Accepted',
                                    noticeID = DataId,
                                    NoticeName = Data.userDetails.Name,
                                )
                                Notifictaions(
                                    Docuser = DataId,
                                    noticeStatus = 'Unread',
                                    tag = 'is your match founded',
                                    type = 'Swap',
                                    RequestStatus = 'Accepted',
                                    noticeID = CurrentUser,
                                    NoticeName = user.Name,
                                )
                                // console.log('notices send both-hand');
                            } else {
                                console.log('no match found');
                            }
                        })
                    } else {
                        console.log('data not found');
                    }
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('Match not found');
        }
    };


    const onSwiped = (type) => {
        console.log(`on swiped ${type}`)
    }

    const onSwipedAllCards = () => {
        setswipedAllCards(true)
    };

    // const useSwiper = useRef(null).current;
    // const handleOnSwipedLeft = () => useSwiper.swipeLeft()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.black} />
            <HeaderTabOne onpress={() => navigation.openDrawer()} Lefticon={require('../../assets/menu3.png')} logo={require('../../assets/splashlogo.png')} />
            {modalData && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <HeaderTabOne Lefticon={require('../../assets/menu3.png')} logo={require('../../assets/splashlogo.png')} />
                    <View style={{
                        marginHorizontal: 10,
                        alignItems: 'center'
                    }}>
                        <View style={{
                            // marginTop: 0, 
                            // paddingHorizontal: 20, 
                            // backgroundColor: COLORS.white 
                            width: '100%',
                            marginBottom: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 25,
                            // paddingHorizontal: 10,
                            paddingBottom: 20,
                            marginTop: 10,
                            borderWidth: 5,
                            borderColor: COLORS.white
                        }}>
                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                <View style={{
                                    borderRadius: 20,
                                }}>
                                    <View style={{
                                        // paddingTop: 10,
                                        // marginTop:10
                                        borderRadius: 20,

                                    }}>
                                        <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='cover'
                                            style={{
                                                height: 380,
                                                width: '100%',
                                                borderRadius: 20,
                                                // paddingHorizontal: 10
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setModalVisible(!modalVisible)}
                                            style={{
                                                position: 'absolute',
                                                margin: 20
                                            }}>
                                            <Image source={require('../../assets/arrowleft.png')} resizeMode='contain' style={{
                                                tintColor: COLORS.white,
                                                width: 25,
                                                height: 25,
                                            }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 5,
                                            paddingTop: 10
                                        }}>
                                            <Image source={require('../../assets/dot.png')} resizeMode='contain'
                                                style={{
                                                    width: 5,
                                                    height: 5,
                                                    marginRight: 5
                                                }} />
                                            <Text style={{
                                                fontSize: 20, fontWeight: 'bold',
                                                color: COLORS.black,
                                                marginRight: 5
                                            }}>{modalData.userDetails.Name}</Text>
                                            <Text style={{
                                                fontSize: 20,
                                                color: COLORS.black,
                                                marginRight: 5
                                            }}>25</Text>
                                            <Image source={require('../../assets/conform.png')} resizeMode='contain'
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                }} />
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 5,
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                marginRight: 5
                                            }}>Model at Instagaram</Text>
                                            <Text style={{
                                                color: COLORS.black,
                                                marginRight: 5,
                                                backgroundColor: COLORS.main,
                                                padding: 3,
                                                borderRadius: 5
                                            }}>2.1 Miles Away</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 50,
                                            justifyContent: 'space-between',
                                            marginTop: 10
                                        }}>
                                            <View style={{
                                                padding: 15,
                                                borderRadius: 30,
                                                backgroundColor: COLORS.white,
                                                elevation: 5

                                            }}>
                                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                                    <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                                        style={{
                                                            width: 15,
                                                            height: 15
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{
                                                padding: 15,
                                                borderRadius: 40,
                                                backgroundColor: 'red'
                                            }}>
                                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>

                                                    <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                                        style={{
                                                            width: 40,
                                                            height: 40
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{
                                                padding: 15,
                                                borderRadius: 30,
                                                backgroundColor: COLORS.white,
                                                elevation: 5
                                            }}>
                                                <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                                                    <Image source={require('../../assets/message.png')} resizeMode='contain'
                                                        style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <View style={{
                                                backgroundColor: COLORS.main,
                                                padding: 8,
                                                borderRadius: 10,
                                            }}>
                                                <Image source={require('../../assets/modal/bio.png')} resizeMode='contain' style={{
                                                    width: 15,
                                                    height: 15,
                                                    tintColor: COLORS.white
                                                }} />
                                            </View>
                                            <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>Bio</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: width,
                                        }}>
                                            <View style={{ width: '85%' }}>
                                                <Text style={{ paddingVertical: 10, }}>
                                                    {modalData.userDetails.Bio}
                                                </Text>
                                            </View>
                                            {/* <TouchableOpacity style={{ width: '25%' }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingBottom: 10,
                                            }}>
                                                <View style={{
                                                    backgroundColor: COLORS.main,
                                                    padding: 8,
                                                    borderRadius: 10,
                                                }}>
                                                    <Image source={require('../../assets/modal/address.png')} resizeMode='contain' style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: COLORS.white
                                                    }} />
                                                </View>
                                                <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                    Address here!
                                                </Text>
                                            </View>
                                            {/* <View>
                      <Image source={require('../../assets/hello.png')} resizeMode='contain' />
                    </View> */}
                                        </View>
                                        <View>
                                            <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='cover' style={{
                                                width: '100%',
                                                height: 250,
                                                borderRadius: 20,
                                            }} />
                                            {/* <TouchableOpacity style={{
                      paddingHorizontal: 20,
                      alignItems: 'flex-end',
                      marginTop: -65,
                      flex: 1
                    }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <View style={{
                                                backgroundColor: COLORS.main,
                                                padding: 8,
                                                borderRadius: 10,
                                            }}>
                                                <Image source={require('../../assets/modal/info.png')} resizeMode='contain' style={{
                                                    width: 15,
                                                    height: 15,
                                                    tintColor: COLORS.white
                                                }} />
                                            </View>
                                            <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                {modalData.userDetails.Name}'s info
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            marginHorizontal: 20,
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity style={{
                                                // width: '40%',
                                                paddingRight: 10,
                                                marginRight: 5,
                                                marginBottom: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                // marginRight: 5,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/like2.png')} resizeMode='contain'
                                                        style={{
                                                            height: 40,
                                                            width: 40
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>Single</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info4.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{modalData.userDetails.Education}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info3.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>Height, {modalData.userDetails.Hieght}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info8.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{modalData.userDetails.Gender}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info7.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>English</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info6.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{modalData.userDetails.Drink}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info9.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{modalData.userDetails.Kids}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info5.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{modalData.userDetails.Nature}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info2.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{modalData.userDetails.Smoke}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <View style={{
                                                    backgroundColor: COLORS.main,
                                                    padding: 8,
                                                    borderRadius: 10,
                                                }}>
                                                    <Image source={require('../../assets/modal/gallery.png')} resizeMode='contain' style={{
                                                        tintColor: COLORS.white,
                                                        width: 15,
                                                        height: 15,
                                                    }} />
                                                </View>
                                                <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                    Gallery
                                                </Text>
                                            </View>
                                        </View>

                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 20,
                                            }}>
                                                <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='cover' style={{
                                                    width: 250,
                                                    height: 150,
                                                    borderRadius: 20,
                                                    marginRight: 10,
                                                }} />
                                                <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='contain' style={{
                                                    width: 250,
                                                    height: 150,
                                                    borderRadius: 20,
                                                    marginRight: 10,
                                                }} />
                                            </View>
                                        </ScrollView>
                                    </View>

                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 20,
                                    }}>
                                        <View>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Verification
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: 10,
                                            marginBottom: 80
                                        }}>
                                            <View style={{
                                                padding: 8,
                                                backgroundColor: COLORS.main,
                                                borderRadius: 30,
                                            }}>
                                                <Image source={require('../../assets/modal/tick.png')} resizeMode='contain' style={{
                                                    width: 10,
                                                    height: 10,
                                                    tintColor: COLORS.white
                                                }} />
                                            </View>
                                            <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                {modalData.userDetails.Name}???s photo-verified
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            </ScrollView>

                        </View>
                    </View>
                </Modal >
            )}

            <View style={styles.container}>

                <View style={{
                    height: '75%',
                    backgroundColor: COLORS.white,
                    // flex:3,
                    // justifyContent:'flex-end',
                    // marginTop: -59,
                }}>
                    <View>
                        {users ? (
                            <Swiper
                                ref={swiper => setSwiper(swiper)}
                                onSwiped={() => onSwiped('general')}
                                onSwipedLeft={() => onSwiped('left')}
                                // onSwipedRight={() => onSwiped('right')}
                                onSwipedRight={(cardIndex) => {
                                    OpenForChating(cardIndex);
                                }}
                                disableTopSwipe={true}
                                disableBottomSwipe={true}
                                // onSwipedTop={() => onSwiped('top')}
                                // onSwipedBottom={() => onSwiped('bottom')}
                                cards={users}
                                renderCard={(cards) => <RenderCard data={cards} navigation={navigation} />}
                                cardIndex={0}
                                // onTapCard={(cards) => openSettingsModal(cards) }
                                onTapCard={(cardIndex) => {
                                    openSettingsModal(cardIndex);
                                }}
                                infinite
                                showSecondCard={false}
                                // cardVerticalMargin={30}
                                onSwipedAll={onSwipedAllCards}
                                stackSize={3}
                                stackSeparation={25}
                                overlayLabels={{
                                    bottom: {
                                        title: 'BLEAH',
                                        style: {
                                            label: {
                                                backgroundColor: 'black',
                                                borderColor: 'black',
                                                color: 'white',
                                                borderWidth: 1
                                            },
                                            wrapper: {
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }
                                        }
                                    },
                                    left: {
                                        title: 'NOPE',
                                        style: {
                                            label: {
                                                backgroundColor: 'black',
                                                borderColor: 'black',
                                                color: 'white',
                                                borderWidth: 1
                                            },
                                            wrapper: {
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                justifyContent: 'flex-start',
                                                marginTop: 30,
                                                marginLeft: -30
                                            }
                                        }
                                    },
                                    right: {
                                        title: 'LIKE',
                                        style: {
                                            label: {
                                                backgroundColor: 'red',
                                                borderColor: 'red',
                                                color: 'white',
                                                borderWidth: 1
                                            },
                                            wrapper: {
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                marginTop: 30,
                                                marginLeft: 30
                                            }
                                        }
                                    },
                                    top: {
                                        title: 'SUPER LIKE',
                                        style: {
                                            label: {
                                                backgroundColor: 'black',
                                                borderColor: 'black',
                                                color: 'white',
                                                borderWidth: 1
                                            },
                                            wrapper: {
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }
                                        }
                                    }
                                }}
                                animateOverlayLabelsOpacity
                                animateCardOpacity
                                swipeBackCard
                            >
                            </Swiper>

                        ) : (
                            <View style={{
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: height,
                            }}>
                                <ActivityIndicator size="small" color={COLORS.main} animating={loading} />
                            </View>
                        )}
                    </View>
                </View>

                {/* <View style={{
                    marginTop: 5,
                    height: '57%', backgroundColor: COLORS.white,
                    elevation: 5,
                    borderRadius: 25,
                    paddingHorizontal: 5
                }}>
                    <View style={{
                        paddingTop: 5,
                    }}>
                        <Image source={require('../../assets/profilepic2.png')} resizeMode='stretch'
                            style={{
                                height: 380,
                                width: 350,
                                paddingHorizontal: 10
                            }}
                        />
                    </View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            paddingTop: 10
                        }}>
                            <Image source={require('../../assets/dot.png')} resizeMode='contain'
                                style={{
                                    width: 5,
                                    height: 5,
                                    marginRight: 5
                                }} />
                            <Text style={{
                                fontSize: 20, fontWeight: 'bold',
                                color: COLORS.black,
                                marginRight: 5
                            }}>Sofia Toly,</Text>
                            <Text style={{
                                fontSize: 20,
                                color: COLORS.black,
                                marginRight: 5
                            }}>25</Text>
                            <Image source={require('../../assets/conform.png')} resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                }} />
                        </View>
                    </View>


                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                marginRight: 5
                            }}>Model at Instagaram</Text>
                            <Text style={{
                                color: COLORS.black,
                                marginRight: 5,
                                backgroundColor: COLORS.main,
                                padding: 3,
                                borderRadius: 5
                            }}>2.1 Miles Away</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 50,
                            justifyContent: 'space-between',
                            marginTop: 10
                        }}>
                            <View style={{
                                padding: 20,
                                borderRadius: 30,
                                backgroundColor: COLORS.white,
                                elevation: 5

                            }}>
                                <TouchableOpacity>

                                    <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                        style={{
                                            width: 15,
                                            height: 15
                                        }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                padding: 15,
                                borderRadius: 40,
                                backgroundColor: COLORS.pink
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('CongratsMatchScreen')}>

                                    <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                        style={{
                                            width: 30,
                                            height: 30
                                        }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                padding: 20,
                                borderRadius: 30,
                                backgroundColor: COLORS.white,
                                elevation: 5
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                                    <Image source={require('../../assets/message.png')} resizeMode='contain'
                                        style={{
                                            width: 20,
                                            height: 20
                                        }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: '45%' }}>

                </View> */}

                <View style={{
                    // height: '35%',
                    height: '25%',
                    // position: 'absolute',
                    marginTop: -5,
                    width: '100%',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 70,
                        justifyContent: 'space-between',
                        // marginTop: -20
                    }}>
                        <View style={{
                            padding: 15,
                            borderRadius: 30,
                            backgroundColor: COLORS.white,
                            elevation: 5
                        }}>
                            {/* onLeft={swiper.swipeLeft()} onRight={swiper.swipeRight()} */}
                            <TouchableOpacity onPress={() => swiper.swipeLeft()}>
                                <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                    style={{
                                        width: 15,
                                        height: 15
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: 15,
                            borderRadius: 40,
                            backgroundColor: 'red'
                        }}>
                            <TouchableOpacity onPress={() =>
                                swiper.swipeRight()
                                // navigation.navigate('CongratsMatchScreen')
                            }
                            >
                                <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                    style={{
                                        width: 40,
                                        height: 40
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: 15,
                            borderRadius: 30,
                            backgroundColor: COLORS.white,
                            elevation: 5
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                                <Image source={require('../../assets/message.png')} resizeMode='contain'
                                    style={{
                                        width: 20,
                                        height: 20
                                    }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <TouchableOpacity onPress={() => { }}>
                    <Text>Left</Text>
                </TouchableOpacity> */}



            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // justifyContent:'center'
        height: '100%',
        width: width,
        // flex:1,
        backgroundColor: COLORS.white,
        // alignContent: 'center',
        // justifyContent: 'center',
    },
})