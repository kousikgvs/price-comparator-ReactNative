import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-reanimated-table';
import products from './products/products';

const App = () => {
  const [tableHead] = useState(['Product ID', 'Product Name', 'Amazon Price', 'Flipkart Price', 'Actions']);

  const openUrl = (url) => {
    Linking.openURL(url);
  };

  const renderElement = (urls, aliases) => (
    <View style={styles.btnColumnContainer}>
      {urls.map((url, index) => (
        <TouchableOpacity key={index} onPress={() => openUrl(url)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{aliases[index]}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{ borderColor: '#CED0CE' }} style={{paddingBottom:30}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
        {products.map((product, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <Row
              style={[
                styles.row,
                rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
              data={[
                product.productId,
                <Text style={styles.productName}>{product.productName}</Text>,
                product.amazonPrice || 'N/A',
                product.flipkartPrice || 'N/A',
                renderElement([product.amazonUrl, product.flipkartUrl], ['Amazon', 'Flipkart']),
              ]}
              textStyle={styles.text}
            />
          </React.Fragment>
        ))}
        <Row style={styles.emptyRow} />
      </Table>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#F5FCFF', flexGrow: 1 },
  head: { height: 60, backgroundColor: '#4285F4' },
  headText: { margin: 6, color: '#FFFFFF', fontWeight: 'bold' },
  text: { margin: 6, color: '#333333' },
  productName: { margin: 6, color: '#1E88E5', fontWeight: 'bold' },
  evenRow: { flexDirection: 'row', backgroundColor: '#E3F2FD', borderBottomWidth: 1, borderBottomColor:'#BDBDBD', paddingHorizontal :20},
   oddRow:{ flexDirection:'row',backgroundColor:'#BBDEFB',borderBottomWidth :1,borderBottomColor :'#BDBDBD',paddingHorizontal :20},
   btn:{ width :58,height :18 ,backgroundColor :'#4CAF50',borderRadius :2 ,marginTop :10},
   btnText:{ textAlign :'center' ,color :'#FFFFFF'},
   btnColumnContainer:{ flexDirection:'column' ,alignItems :'center'},
   emptyRow:{ height :20 }, 
});

export default App;