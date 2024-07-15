import {Schema,model,Document} from 'mongoose'

const eventSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true
    }
},{timestamps:true})

const Event=model<{title:string,description:string,price:number} & Document>('Event',eventSchema)

export { 
    Event,
    eventSchema
} 

