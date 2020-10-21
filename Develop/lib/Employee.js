// TODO: Write code to define and export the Employee class
// * name
// * id
// * email
// * getName()
// * getId()
// * getEmail()
// * getRole() // Returns 'Employee'
class Employee{
    constructor(name, id, email){
        this.name=name;
        this.id=id;
        this.email=email;
        this.getName=()=>this.name;
        this.getId=()=>this.id;
        this.getEmail=()=>this.email;
        this.getRole=()=>"Employee";
    }
}
module.exports = Employee;