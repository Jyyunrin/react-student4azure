import { useState, useEffect } from "react";
import { Student } from "../models/Student";
import Config from "../config";
import { Link } from "react-router-dom";
import List from "./List";

//Use config to get base url
//StudentInfo and SetStudentInfo << Setter
//useState and useEffect = React hooks that manage state and side effects in functional components
//useEffect() - used to perform side effects -> data fetching, subscription, changing of DOM
//Two arguments - first = getData() function that fetches student data (side effect code)
//second = array of dependencies, when value changes, effect is reran
//[] empty = runs only once

type Props = {
  exceptId?: number;
};

const StudentList = ({ exceptId = undefined }: Props) => {

  const [studentInfo, setStudentInfo] = useState([]);

  const getData = async () => {
    const response = await fetch(`${Config.API_BASE_URL}students/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const jsonData = await response.json();
    setStudentInfo(jsonData);
  };

  //Calling the getData() method
  useEffect(() => {
    getData();
  }, []);

  let filteredStudents = studentInfo;

  //Filter all the students except filter out the exceptId one
  if (exceptId !== undefined) {
    filteredStudents = studentInfo.filter(
      (p: Student) => p.StudentId !== +exceptId
    );
  }

  //map creates a new array and replaces the old array
  //Takes Student and puts an h6 element in its place with all the student properties
  return (
    <div>
        <List
            items={filteredStudents}
            render={(student: Student) => (
                <Link to={`/detail/${student.StudentId}`}>
                    <h6 className="text-muted">
                        {student.StudentId} {student.FirstName} {student.LastName}
                    </h6>
                </Link>
            )}
        />
    </div>

  );
};

export default StudentList;
