import { FlatList, Text, SafeAreaView } from "react-native";
import { Avatar, Card, ListItem, Icon, Button } from "@rneui/themed";


// Convert distance from location (meters to miles)
function metersToMi (dist) {
    return dist = (dist * 0.000621371).toFixed(2)
}

// Content of each item in flatlist
const Item = ({ name, dist, id, navigation }) => {
    return ( 
            <Card>
                <Card.Title style={{ fontSize: 20 }}>{name}</Card.Title>
                <Card.Divider></Card.Divider>
                <ListItem key={id}>
                    <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 23 }}>
                            {`${dist} miles`}
                        </Text>
                    </ListItem.Content>
                        <Avatar
                            size={50} 
                            rounded
                            icon={{ name: 'arrow-forward-outline', type: 'ionicon' }}
                            containerStyle={{ backgroundColor: '#4f7ba5' }}
                            onPress={navigation.navigate('resultDetails')}
                        />  
                </ListItem>   
            </Card>
    );
}
  
const SearchResultsView = ({route, navigation}) => {
    const { results } = route.params;
    console.log('searchResultsView,', results)

    const renderItem = ({ item, navigation }) => (
        <Item id={item.id} name={item.poi.name} dist={metersToMi(item.dist)} navigation={navigation} />
    )

    return (
        <>
            <Button
                type="solid"
                containerStyle={{ width: 100, marginLeft: 14, marginTop: 8 }}
                buttonStyle={{ borderRadius: 25 }}
                color='#4f7ba5'
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back-outline" type='ionicon' color="white" />
                Back
            </Button>

            <SafeAreaView style={{ flex: 1}}>
                <FlatList 
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </>
    );
}

export default SearchResultsView;