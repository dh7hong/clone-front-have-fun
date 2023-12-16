
let myArray = [{senderId: 461719767, receiverId: 709643529, status: 'pending'},
{senderId: 77527169, receiverId: 709643529, status: 'pending'}]

let myNumber = 461719767
let myNumber2 = 77527169

let myObject = myArray.find(obj => obj.senderId === myNumber)

let myObject2 = myArray.find(obj => obj.senderId === myNumber2)


console.log(myObject)
console.log(myObject2)

for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i])
    console.log(myArray[i].senderId)
}