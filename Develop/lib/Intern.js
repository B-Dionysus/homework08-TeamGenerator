// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// * school 

// * getSchool()

// * getRole() // Overridden to return 'Intern'
const Employee=require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        this.school=school;
        this.getRole=()=>"Intern";
        this.getSchool=()=>this.school;
    }
}
module.exports = Intern;