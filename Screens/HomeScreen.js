import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import db from '../config';

export default class HomeScreen extends React.Component{
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    };
  }

  componentDidMount = async() => {
    var class_ref = await db.ref('/').on('value', data => {
      var all_students =  []
      var class_a = data.val().class_a
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
      console.log(all_students);
    });
  };

  updateAttendence(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }


 

  
  goToSummary = ()=>{
      this.props.navigation.navigate('SummaryScreen')
    }


  render(){
    var all_students = this.state.all_students;
    return (
        <View>
            
          <View>
            {all_students.map((student, index) => (
              <View key = {index}>
                  <View style = {{marginLeft : 125, marginTop : 40}}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', marginRight: 10, marginLeft : -20}}>
                    {student.roll_no}. {student.name}
                  </Text>
                </View>
                <View style = {{marginLeft : 150, marginTop : 40, backgroundColor : "green", alignSelf : "center", borderWidth : 5, width : 100, height : 40, marginLeft : 13, marginTop : 30, alignItems : "center"}}>
                    <TouchableOpacity
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text style = {{fontSize : 20, fontWeight : "bold"}}>Present</Text>
                  </TouchableOpacity>
                </View>

                <View style = {{marginLeft : 150, marginTop : 40, backgroundColor : "red", alignSelf : "center", borderWidth : 5, width : 100, height : 40, marginLeft : 13, marginTop : 10, alignItems : "center"}}>
                  <TouchableOpacity
                    
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text style = {{fontSize : 20, fontWeight : "bold"}}>Absent</Text>
                  </TouchableOpacity>
                  </View>
                </View>
            ))}
            <View style = {{marginTop : 40, borderWidth : 10, width : 200, marginLeft : 75}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SummaryScreen');
              }}>
              <Text style = {{fontWeight : "bold", fontSize : 25, marginLeft : 50}}>Submit</Text>
            </TouchableOpacity>
          </View>
          </View>
                    
          </View>
      );
  }
}