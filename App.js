import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, AsyncStorage} from 'react-native';

export default class App extends React.Component{
  state ={
    text:'',
    todos:[]
  }
  addToList = () =>{
    
      let { todos } = this.state 
      todos.push(this.state.text)
      this.setState({todos, text:''})
      const saveTodos = async todos =>{
        try {
          await AsyncStorage.setItem('todos',todos)
            } catch (error) {
              console.log(error.message)
            };
      } 
  }
  removeTodo(index){
    
     let { todos } = this.state 
     todos.splice(index, 1)
     this.setState({todos})

  }
  showTodos = () => (
    this.state.todos.map((todo, i)=>{
        let bgc;
        i % 2 !=0 ? bgc = "#ddd" : bgc = 'transparent'
      return <View 
        key={i} 
        style={{backgroundColor:bgc}}>
       <View style={styles.box}>
          <Text
            numberOfLines={1} 
            style={styles.text} >{todo}
          </Text>
            <Button
                onPress={( ) => this.removeTodo(i)}
                title="X"
                color="red"
                
            />
      </View>
                <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              width:300
            }}
          />
      </View>
    })
  )
  render(){
      return (
            
            <View style={styles.container}>

              <View>
                <Image
                style={styles.stretch}
                source={require('./assets/cesta.jpg')} /> 
            </View>

            <View style= {styles.box}>
              <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
              />
              <View style ={styles.button}>
                  <Button
                      onPress={this.addToList}
                      title="+"
                      color="green"
              />
                
              </View>
             
              </View>
                  { this.showTodos() }

                  
            </View>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    top:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    minHeight: 40, 
    borderColor: 'gray', 
    width:150,
    borderWidth: 1  
  },
  text:{
    fontSize:20,
    color:'green'
  },
  button:{
    borderColor:'black',
    borderWidth:5,
    height:40,
    width:150,

  },
  box:{
    flexDirection:'row',
    width:'80%',
    justifyContent:'center',
    alignItems:'center'
  },
  stretch:{
   width: 200  }


});
