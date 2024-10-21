const {Schema, default: mongoose} =require("mongoose");

const connectionRequestSchema = new Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        uniqe:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        uniqe:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","intrested","rejected","accepted"],
            message:(props)=>`${props.value} is not a valid status`
        }
    }
},
{
    timestamps:true
})
connectionRequestSchema.pre("save",function(){
    const connectionRequest =this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot sent req to yourself");
        
    }

})

const ConnectionRequest = mongoose.model("connection_request",connectionRequestSchema);
module.exports ={ConnectionRequest}

