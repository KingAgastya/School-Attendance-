import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import db from '../config';


class SummaryScreen extends React.Component{
 constructor() {
    super();
    this.state = {
      present_students: [],
      absent_students: [],
    };
  }

  getTodaysDate(){
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
    return today;
  }

  componentDidMount = async () => {
    var today = await this.getTodaysDate();

    var students_ref = db.ref('/').on('value',(data)=>{
      var class_a = data.val();
      var present_students = []
      var absent_students = []
      for(var i in class_a){
        if(class_a[i][today] === 'present'){
          present_students.push(class_a[i])
        }
        if(class_a[i][today] === 'absent'){
          absent_students.push(class_a[i])
        }
      }

      present_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });
  
      absent_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });

      this.setState({
        present_students : present_students,
        absent_students : absent_students
      })
    })
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
          <Text style = {{marginTop : 30, marginLeft : 100, fontWeight : "bold", fontSize : 20 ,borderWidth : 10, width : 120, backgroundColor : "green"}}>Present: {this.state.present_students.length}</Text>
          <Text style = {{marginTop : 30, marginLeft : 100, fontWeight : "bold", fontSize : 20, borderWidth : 10, width : 120, backgroundColor : "red"}}>Absent: {this.state.absent_students.length}</Text>
      </View>
    );
  }
}

export default SummaryScreen;